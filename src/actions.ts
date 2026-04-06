import type { AtreaAmotionCardConfig, HomeAssistant } from "./types";
import type { TapActionType } from "./types";

export type MoreInfoView = "info" | "history" | "settings" | "related";

export function fireMoreInfo(hass: HomeAssistant, entityId: string): void {
  fireMoreInfoView(hass, entityId, "info");
}

export function fireMoreInfoView(hass: HomeAssistant, entityId: string, view: MoreInfoView): void {
  hass.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId, view },
    }),
  );
}

export function handleEntityTap(hass: HomeAssistant, action: TapActionType | undefined, entityId?: string): void {
  if (!entityId || action === "none") {
    return;
  }
  if (action === "history") {
    const nextPath = `/history?entity_id=${encodeURIComponent(entityId)}`;
    window.history.pushState(null, "", nextPath);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
    return;
  }
  fireMoreInfo(hass, entityId);
}

interface EntityRegistryEntry {
  entity_id?: string;
  device_id?: string | null;
}

export async function resolveDeviceId(hass: HomeAssistant, entityId: string): Promise<string | null> {
  if (!hass.callWS) {
    return null;
  }

  try {
    const entry = (await hass.callWS({
      type: "config/entity_registry/get",
      entity_id: entityId,
    })) as EntityRegistryEntry | null;
    return entry?.device_id ?? null;
  } catch {
    return null;
  }
}

export function navigateToPath(path: string): void {
  window.history.pushState(null, "", path);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
}

function buildHistoryPathForEntities(entityIds: string[]): string {
  return `/history?entity_id=${encodeURIComponent(entityIds.join(","))}`;
}

function getConfiguredTemperatureEntities(config: AtreaAmotionCardConfig): string[] {
  const temperatures = config.entities?.temperatures;
  if (!temperatures) {
    return [];
  }

  return [temperatures.oda, temperatures.eta, temperatures.sup, temperatures.eha].filter(
    (entityId): entityId is string => typeof entityId === "string" && entityId.length > 0,
  );
}

export async function openPreferredHistory(
  hass: HomeAssistant,
  config: AtreaAmotionCardConfig,
): Promise<void> {
  const temperatureEntities = getConfiguredTemperatureEntities(config);
  if (temperatureEntities.length > 0) {
    navigateToPath(buildHistoryPathForEntities(temperatureEntities));
    return;
  }

  const deviceId = await resolveDeviceId(hass, config.climate_entity);
  if (deviceId) {
    navigateToPath(`/history?device_id=${encodeURIComponent(deviceId)}`);
    return;
  }

  navigateToPath(buildHistoryPathForEntities([config.climate_entity]));
}

export async function selectMode(hass: HomeAssistant, entityId: string, kind: "hvac" | "preset" | "fan" | "select", option: string): Promise<void> {
  const [domain] = entityId.split(".");
  if (domain === "climate") {
    if (kind === "preset") {
      await hass.callService("climate", "set_preset_mode", {
        entity_id: entityId,
        preset_mode: option,
      });
      return;
    }

    if (kind === "fan") {
      await hass.callService("climate", "set_fan_mode", {
        entity_id: entityId,
        fan_mode: option,
      });
      return;
    }

    if (kind === "hvac") {
      await hass.callService("climate", "set_hvac_mode", {
        entity_id: entityId,
        hvac_mode: option,
      });
      return;
    }
  }

  await hass.callService("select", "select_option", {
    entity_id: entityId,
    option,
  });
}

export async function setClimateFanPercentage(hass: HomeAssistant, entityId: string, percentage: number, options: string[]): Promise<void> {
  const numericOptions = options
    .map((option) => ({ option, value: Number.parseFloat(option) }))
    .filter((entry) => Number.isFinite(entry.value));

  if (numericOptions.length === 0) {
    return;
  }

  const boundedPercentage = Math.max(0, Math.min(100, percentage));
  const nearest = numericOptions.reduce((best, current) => {
    return Math.abs(current.value - boundedPercentage) < Math.abs(best.value - boundedPercentage) ? current : best;
  });

  await selectMode(hass, entityId, "fan", nearest.option);
}

export async function setClimateTemperature(hass: HomeAssistant, entityId: string, temperature: number): Promise<void> {
  await hass.callService("climate", "set_temperature", {
    entity_id: entityId,
    temperature,
  });
}

export async function triggerEntityAction(hass: HomeAssistant, entityId: string): Promise<void> {
  const [domain] = entityId.split(".");

  if (domain === "button" || domain === "input_button") {
    await hass.callService(domain, "press", {
      entity_id: entityId,
    });
    return;
  }

  if (domain === "script") {
    await hass.callService("script", "turn_on", {
      entity_id: entityId,
    });
    return;
  }

  await hass.callService("homeassistant", "toggle", {
    entity_id: entityId,
  });
}
