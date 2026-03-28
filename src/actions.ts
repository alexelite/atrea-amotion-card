import type { HomeAssistant, TapActionType } from "./types";

export function fireMoreInfo(hass: HomeAssistant, entityId: string): void {
  hass.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
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
