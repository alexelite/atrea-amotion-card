import type {
  AlertNotification,
  AlertState,
  AtreaAmotionCardConfig,
  AtreaCardViewModel,
  ClimateAttributes,
  DamperState,
  FanState,
  FilterSeverity,
  FilterState,
  HomeAssistant,
  HomeAssistantState,
  ModeState,
  TemperaturePoint,
} from "./types";
import { clampPercent, titleCase } from "./utils/format";

const NON_AVAILABLE_STATES = new Set(["unknown", "unavailable", "none"]);
const OPEN_STATES = new Set(["on", "open", "opened", "true"]);
const CLOSED_STATES = new Set(["off", "closed", "close", "false"]);
const WARNING_STATES = new Set(["on", "dirty", "problem", "warning", "warn"]);
const CRITICAL_STATES = new Set(["fault", "critical", "replace", "alarm"]);

function getStateObject(hass: HomeAssistant, entityId?: string): HomeAssistantState | undefined {
  if (!entityId) {
    return undefined;
  }
  return hass.states[entityId];
}

function getClimateState(hass: HomeAssistant, config: AtreaAmotionCardConfig): HomeAssistantState | undefined {
  return getStateObject(hass, config.climate_entity);
}

function isAvailable(stateObj?: HomeAssistantState): boolean {
  return !!stateObj && !NON_AVAILABLE_STATES.has(String(stateObj.state).toLowerCase());
}

function parseNumericValue(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseBooleanValue(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  const raw = String(value ?? "").toLowerCase();
  return OPEN_STATES.has(raw);
}

function readClimateAttributes(climateState?: HomeAssistantState): ClimateAttributes {
  return (climateState?.attributes ?? {}) as ClimateAttributes;
}

function parseNumericState(stateObj?: HomeAssistantState): number | null {
  if (!isAvailable(stateObj)) {
    return null;
  }
  const parsed = Number(stateObj?.state);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseTemperature(entity?: string, stateObj?: HomeAssistantState): TemperaturePoint {
  return {
    entity,
    value: parseNumericState(stateObj),
    unit: typeof stateObj?.attributes.unit_of_measurement === "string" ? String(stateObj.attributes.unit_of_measurement) : null,
    available: isAvailable(stateObj),
  };
}

function parseTemperatureFromValue(entity: string | undefined, value: unknown, unit: string | null): TemperaturePoint {
  const parsed = parseNumericValue(value);
  return {
    entity,
    value: parsed,
    unit,
    available: parsed !== null,
  };
}

function parseFan(speedEntity: string | undefined, speedState: HomeAssistantState | undefined, airflowEntity?: string, airflowState?: HomeAssistantState, powerEntity?: string, powerState?: HomeAssistantState): FanState {
  return {
    speedEntity,
    speedPercent: clampPercent(parseNumericState(speedState)),
    airflowEntity,
    airflow: parseNumericState(airflowState),
    airflowUnit: typeof airflowState?.attributes.unit_of_measurement === "string" ? String(airflowState.attributes.unit_of_measurement) : null,
    powerEntity,
    power: parseNumericState(powerState),
    powerUnit: typeof powerState?.attributes.unit_of_measurement === "string" ? String(powerState.attributes.unit_of_measurement) : null,
    available: isAvailable(speedState),
  };
}

function parseFanFromValues(
  speedEntity: string | undefined,
  speedValue: unknown,
  airflowEntity: string | undefined,
  airflowValue: unknown,
  airflowUnit: string | null,
  powerEntity: string | undefined,
  powerValue: unknown,
  powerUnit: string | null,
): FanState {
  const speedPercent = clampPercent(parseNumericValue(speedValue));
  return {
    speedEntity,
    speedPercent,
    airflowEntity,
    airflow: parseNumericValue(airflowValue),
    airflowUnit,
    powerEntity,
    power: parseNumericValue(powerValue),
    powerUnit,
    available: speedPercent !== null,
  };
}

function inferDamperState(percent: number | null): DamperState["state"] {
  if (percent === null) {
    return "unknown";
  }
  if (percent <= 0) {
    return "closed";
  }
  if (percent >= 100) {
    return "open";
  }
  return "partial";
}

function parseDamper(entity?: string, stateObj?: HomeAssistantState): DamperState {
  if (!entity) {
    return {
      entity,
      percentOpen: null,
      state: "unavailable",
      available: false,
    };
  }

  if (!isAvailable(stateObj)) {
    return {
      entity,
      percentOpen: null,
      state: "unavailable",
      available: false,
    };
  }

  const numeric = clampPercent(parseNumericState(stateObj));
  let percent = numeric;
  if (percent === null) {
    const raw = String(stateObj?.state ?? "").toLowerCase();
    if (OPEN_STATES.has(raw)) {
      percent = 100;
    } else if (CLOSED_STATES.has(raw)) {
      percent = 0;
    }
  }

  return {
    entity,
    percentOpen: percent,
    state: inferDamperState(percent),
    available: true,
  };
}

function parseDamperFromValue(entity: string | undefined, value: unknown): DamperState {
  const numeric = clampPercent(parseNumericValue(value));
  let percent = numeric;
  if (percent === null) {
    const raw = String(value ?? "").toLowerCase();
    if (OPEN_STATES.has(raw)) {
      percent = 100;
    } else if (CLOSED_STATES.has(raw)) {
      percent = 0;
    }
  }

  return {
    entity,
    percentOpen: percent,
    state: percent === null ? "unavailable" : inferDamperState(percent),
    available: percent !== null,
  };
}

function lifeSeverity(lifePercent: number | null): FilterSeverity {
  if (lifePercent === null) {
    return "unknown";
  }
  if (lifePercent <= 15) {
    return "critical";
  }
  if (lifePercent <= 30) {
    return "warning";
  }
  return "normal";
}

function parseFilter(label: string, statusEntity?: string, statusState?: HomeAssistantState, lifeEntity?: string, lifeState?: HomeAssistantState): FilterState {
  const available = !!statusEntity || !!lifeEntity;
  const rawStatus = String(statusState?.state ?? "").toLowerCase();
  const lifePercent = clampPercent(parseNumericState(lifeState));
  let severity: FilterSeverity = "unknown";

  if (CRITICAL_STATES.has(rawStatus)) {
    severity = "critical";
  } else if (WARNING_STATES.has(rawStatus)) {
    severity = lifePercent !== null && lifePercent <= 15 ? "critical" : "warning";
  } else if (lifePercent !== null) {
    severity = lifeSeverity(lifePercent);
  } else if (available) {
    severity = "normal";
  }

  return {
    statusEntity,
    lifeEntity,
    severity,
    lifePercent,
    label,
    available,
  };
}

function parseFilterFromDays(label: string, daysEntity: string | undefined, daysValue: unknown): FilterState {
  const days = parseNumericValue(daysValue);
  let severity: FilterSeverity = "unknown";
  if (days !== null) {
    if (days < 15) {
      severity = "critical";
    } else if (days <= 30) {
      severity = "warning";
    } else {
      severity = "normal";
    }
  }

  return {
    statusEntity: undefined,
    lifeEntity: daysEntity,
    severity,
    lifePercent: days,
    label,
    available: days !== null,
  };
}

function parseMode(currentEntity: string | undefined, currentState: HomeAssistantState | undefined, selectEntity: string | undefined, selectState: HomeAssistantState | undefined): ModeState {
  const source = selectState ?? currentState;
  const options = Array.isArray(source?.attributes.options)
    ? source?.attributes.options.filter((option): option is string => typeof option === "string")
    : [];
  const currentLabel = isAvailable(currentState) ? titleCase(currentState?.state ?? "") : isAvailable(selectState) ? titleCase(selectState?.state ?? "") : null;

  return {
    climateEntity: undefined,
    currentLabel,
    hvac: { current: null, options: [], controllable: false },
    preset: { current: null, options: [], controllable: false },
    fan: { current: null, options: [], controllable: false },
    fallbackEntity: selectEntity,
    fallbackOptions: options,
    fallbackControllable: !!selectEntity && options.length > 0,
  };
}

function parseModeFromClimate(climateEntity: string, climateState: HomeAssistantState | undefined, currentLabel: unknown): ModeState {
  const attributes = readClimateAttributes(climateState);
  const presetModes = Array.isArray(attributes.preset_modes) ? attributes.preset_modes.map((option) => String(option)) : [];
  const fanModes = Array.isArray(attributes.fan_modes) ? attributes.fan_modes.map((option) => String(option)) : [];
  const hvacModes = Array.isArray(attributes.hvac_modes) ? attributes.hvac_modes.map((option) => String(option)) : [];
  const presetCurrent =
    typeof climateState?.attributes.preset_mode === "string"
      ? climateState.attributes.preset_mode
      : typeof attributes.preset_mode === "string"
        ? attributes.preset_mode
        : null;
  const fanCurrent =
    climateState?.attributes.fan_mode !== undefined
      ? String(climateState.attributes.fan_mode)
      : attributes.fan_mode !== undefined
        ? String(attributes.fan_mode)
        : climateState?.attributes.fan_power_req_sup !== undefined
          ? String(climateState.attributes.fan_power_req_sup)
          : null;
  const hvacCurrent = typeof climateState?.state === "string" ? climateState.state : null;
  const sourceLabel =
    presetCurrent !== null
      ? presetCurrent
        : typeof currentLabel === "string"
          ? currentLabel
          : fanCurrent !== null
            ? fanCurrent
            : hvacCurrent !== null
              ? hvacCurrent
                : null;

  return {
    climateEntity,
    currentLabel: sourceLabel ? titleCase(sourceLabel) : null,
    hvac: {
      current: hvacCurrent,
      options: hvacCurrent && !hvacModes.includes(hvacCurrent) ? [hvacCurrent, ...hvacModes] : hvacModes,
      controllable: hvacModes.length > 0,
    },
    preset: {
      current: presetCurrent,
      options: presetCurrent && !presetModes.includes(presetCurrent) ? [presetCurrent, ...presetModes] : presetModes,
      controllable: presetModes.length > 0,
    },
    fan: {
      current: fanCurrent,
      options: fanCurrent && !fanModes.includes(fanCurrent) ? [fanCurrent, ...fanModes] : fanModes,
      controllable: fanModes.length > 0,
    },
    fallbackEntity: undefined,
    fallbackOptions: [],
    fallbackControllable: false,
  };
}

function isBinaryOn(stateObj?: HomeAssistantState): boolean {
  if (!isAvailable(stateObj)) {
    return false;
  }
  return OPEN_STATES.has(String(stateObj?.state ?? "").toLowerCase());
}

function buildAlertDetail(label: string, stateObj?: HomeAssistantState): string {
  const detailKeys = ["message", "description", "details", "detail", "reason"] as const;
  const fallbackMessage =
    label === "Fault"
      ? "The unit reports an active fault. Open more info or inspect the configured alert entity for the exact cause."
      : "The unit reports an active warning. Open more info or inspect the configured alert entity for the exact cause.";

  if (!stateObj) {
    return fallbackMessage;
  }

  for (const key of detailKeys) {
    const value = stateObj.attributes?.[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  const name =
    typeof stateObj.attributes?.friendly_name === "string" && stateObj.attributes.friendly_name.trim().length > 0
      ? stateObj.attributes.friendly_name.trim()
      : stateObj.entity_id;
  const stateValue = String(stateObj.state ?? "").trim().toLowerCase();

  if (stateValue && !["on", "off", "true", "false", "unknown", "unavailable"].includes(stateValue)) {
    return `${name}: ${stateObj.state}`;
  }

  return `${name} is active.`;
}

function parseAlerts(warningState?: HomeAssistantState, faultState?: HomeAssistantState): AlertState {
  const warning = isBinaryOn(warningState);
  const fault = isBinaryOn(faultState);
  const labels: string[] = [];
  const details: string[] = [];
  const notifications: AlertNotification[] = [];
  if (warning) {
    labels.push("Warning");
    const detail = buildAlertDetail("Warning", warningState);
    details.push(detail);
    notifications.push({
      id: warningState?.entity_id ?? null,
      code: null,
      purpose: "warning",
      severity: null,
      kind: "warning",
      prefix: "S",
      translationKey: null,
      message: detail,
      messageCode: "S",
      fullMessage: detail,
      active: true,
    });
  }
  if (fault) {
    labels.push("Fault");
    const detail = buildAlertDetail("Fault", faultState);
    details.push(detail);
    notifications.push({
      id: faultState?.entity_id ?? null,
      code: null,
      purpose: "alarm",
      severity: null,
      kind: "fault",
      prefix: "E",
      translationKey: null,
      message: detail,
      messageCode: "E",
      fullMessage: detail,
      active: true,
    });
  }
  return {
    warning,
    fault,
    warningCount: warning ? 1 : 0,
    faultCount: fault ? 1 : 0,
    highestSeverity: fault ? 5 : warning ? 3 : null,
    primaryMessage: notifications[0]?.fullMessage ?? null,
    labels,
    details,
    notifications,
  };
}

function parseNotification(value: unknown): AlertNotification | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;
  const kind = item.kind === "fault" ? "fault" : "warning";
  const message =
    typeof item.message === "string" && item.message.trim().length > 0
      ? item.message.trim()
      : typeof item.full_message === "string" && item.full_message.trim().length > 0
        ? item.full_message.trim()
        : typeof item.code === "string" && item.code.trim().length > 0
          ? item.code.trim()
          : "Unknown alert";
  const messageCode =
    typeof item.message_code === "string" && item.message_code.trim().length > 0
      ? item.message_code.trim()
      : kind === "fault"
        ? "E"
        : "S";
  const fullMessage =
    typeof item.full_message === "string" && item.full_message.trim().length > 0
      ? item.full_message.trim()
      : messageCode && message
        ? `${messageCode} - ${message}`
        : message;

  return {
    id: typeof item.id === "number" || typeof item.id === "string" ? item.id : null,
    code: typeof item.code === "string" ? item.code : null,
    purpose: typeof item.purpose === "string" ? item.purpose : null,
    severity: typeof item.severity === "number" ? item.severity : null,
    kind,
    prefix: typeof item.prefix === "string" && item.prefix ? item.prefix : kind === "fault" ? "E" : "S",
    translationKey: typeof item.translation_key === "string" ? item.translation_key : null,
    message,
    messageCode,
    fullMessage,
    active: item.active !== false,
  };
}

function parseClimateAlerts(climateAttributes: ClimateAttributes): AlertState | null {
  if (!Array.isArray(climateAttributes.notifications)) {
    return null;
  }

  const notifications = climateAttributes.notifications
    .map((item) => parseNotification(item))
    .filter((item): item is AlertNotification => !!item && item.active);

  if (notifications.length === 0) {
    return {
      warning: parseBooleanValue(climateAttributes.warning ?? climateAttributes.has_warning),
      fault: parseBooleanValue(climateAttributes.fault ?? climateAttributes.has_fault),
      warningCount: parseNumericValue(climateAttributes.warning_count) ?? 0,
      faultCount: parseNumericValue(climateAttributes.fault_count) ?? 0,
      highestSeverity: parseNumericValue(climateAttributes.highest_severity),
      primaryMessage: typeof climateAttributes.primary_message === "string" ? climateAttributes.primary_message : null,
      labels: [],
      details: [],
      notifications: [],
    };
  }

  const warningCount =
    parseNumericValue(climateAttributes.warning_count) ??
    notifications.filter((item) => item.kind === "warning").length;
  const faultCount =
    parseNumericValue(climateAttributes.fault_count) ??
    notifications.filter((item) => item.kind === "fault").length;
  const highestSeverity =
    parseNumericValue(climateAttributes.highest_severity) ??
    notifications.reduce<number | null>((best, item) => {
      if (item.severity === null) {
        return best;
      }
      return best === null ? item.severity : Math.max(best, item.severity);
    }, null);
  const primaryMessage =
    (typeof climateAttributes.primary_message === "string" && climateAttributes.primary_message) ||
    notifications[0]?.fullMessage ||
    null;

  return {
    warning: parseBooleanValue(climateAttributes.has_warning ?? climateAttributes.warning ?? warningCount > 0),
    fault: parseBooleanValue(climateAttributes.has_fault ?? climateAttributes.fault ?? faultCount > 0),
    warningCount,
    faultCount,
    highestSeverity,
    primaryMessage,
    labels: notifications.map((item) => item.kind === "fault" ? "Fault" : "Warning"),
    details: notifications.map((item) => item.fullMessage),
    notifications,
  };
}

function resolveAvailability(model: Omit<AtreaCardViewModel, "availability">): AtreaCardViewModel["availability"] {
  const requiredAvailable = [
    model.temperatures.oda.available,
    model.temperatures.eta.available,
    model.temperatures.sup.available,
    model.temperatures.eha.available,
    model.fans.supply.available,
    model.fans.extract.available,
    model.dampers.bypass.available,
  ];

  const count = requiredAvailable.filter(Boolean).length;
  if (count === requiredAvailable.length) {
    return "full";
  }
  if (count >= 4) {
    return "partial";
  }
  return "minimal";
}

export function createViewModel(hass: HomeAssistant, config: AtreaAmotionCardConfig): AtreaCardViewModel {
  const entities = config.entities;
  const climateState = getClimateState(hass, config);
  const climateAttributes = readClimateAttributes(climateState);
  const temperatureUnit = typeof climateAttributes.temperature_unit === "string" ? climateAttributes.temperature_unit : "°C";
  const airflowUnit = typeof climateAttributes.airflow_unit === "string" ? climateAttributes.airflow_unit : null;
  const powerUnit = typeof climateAttributes.power_unit === "string" ? climateAttributes.power_unit : null;

  const odaTemperatureState = getStateObject(hass, entities?.temperatures?.oda);
  const etaTemperatureState = getStateObject(hass, entities?.temperatures?.eta);
  const supTemperatureState = getStateObject(hass, entities?.temperatures?.sup);
  const ehaTemperatureState = getStateObject(hass, entities?.temperatures?.eha);

  const supplySpeedState = getStateObject(hass, entities?.fans?.supply_speed);
  const extractSpeedState = getStateObject(hass, entities?.fans?.extract_speed);
  const supplyAirflowState = getStateObject(hass, entities?.fans?.supply_airflow);
  const extractAirflowState = getStateObject(hass, entities?.fans?.extract_airflow);
  const supplyPowerState = getStateObject(hass, entities?.fans?.supply_power);
  const extractPowerState = getStateObject(hass, entities?.fans?.extract_power);

  const bypassState = getStateObject(hass, entities?.dampers?.bypass);
  const odaDamperState = getStateObject(hass, entities?.dampers?.oda);
  const etaDamperState = getStateObject(hass, entities?.dampers?.eta);

  const odaFilterState = getStateObject(hass, entities?.filters?.oda);
  const etaFilterState = getStateObject(hass, entities?.filters?.eta);
  const odaFilterLifeState = getStateObject(hass, entities?.filters?.oda_life);
  const etaFilterLifeState = getStateObject(hass, entities?.filters?.eta_life);

  const currentModeState = getStateObject(hass, entities?.mode?.current);
  const selectModeState = getStateObject(hass, entities?.mode?.select);

  const warningState = getStateObject(hass, entities?.alerts?.warning);
  const faultState = getStateObject(hass, entities?.alerts?.fault);

  const modelWithoutAvailability = {
    temperatures: {
      oda:
        parseTemperatureFromValue(entities?.temperatures?.oda ?? config.climate_entity, climateAttributes.outside_air_temperature, temperatureUnit).available
          ? parseTemperatureFromValue(entities?.temperatures?.oda ?? config.climate_entity, climateAttributes.outside_air_temperature, temperatureUnit)
          : parseTemperature(entities?.temperatures?.oda, odaTemperatureState),
      eta:
        parseTemperatureFromValue(entities?.temperatures?.eta ?? config.climate_entity, climateAttributes.extract_air_temperature, temperatureUnit).available
          ? parseTemperatureFromValue(entities?.temperatures?.eta ?? config.climate_entity, climateAttributes.extract_air_temperature, temperatureUnit)
          : parseTemperature(entities?.temperatures?.eta, etaTemperatureState),
      sup:
        parseTemperatureFromValue(entities?.temperatures?.sup ?? config.climate_entity, climateAttributes.supply_air_temperature, temperatureUnit).available
          ? parseTemperatureFromValue(entities?.temperatures?.sup ?? config.climate_entity, climateAttributes.supply_air_temperature, temperatureUnit)
          : parseTemperature(entities?.temperatures?.sup, supTemperatureState),
      eha:
        parseTemperatureFromValue(entities?.temperatures?.eha ?? config.climate_entity, climateAttributes.exhaust_air_temperature, temperatureUnit).available
          ? parseTemperatureFromValue(entities?.temperatures?.eha ?? config.climate_entity, climateAttributes.exhaust_air_temperature, temperatureUnit)
          : parseTemperature(entities?.temperatures?.eha, ehaTemperatureState),
    },
    fans: {
      supply:
        parseFanFromValues(entities?.fans?.supply_speed ?? config.climate_entity, climateAttributes.supply_fan_speed_percent, entities?.fans?.supply_airflow, climateAttributes.supply_airflow, airflowUnit, entities?.fans?.supply_power, climateAttributes.supply_power, powerUnit).available
          ? parseFanFromValues(entities?.fans?.supply_speed ?? config.climate_entity, climateAttributes.supply_fan_speed_percent, entities?.fans?.supply_airflow, climateAttributes.supply_airflow, airflowUnit, entities?.fans?.supply_power, climateAttributes.supply_power, powerUnit)
          : parseFan(entities?.fans?.supply_speed, supplySpeedState, entities?.fans?.supply_airflow, supplyAirflowState, entities?.fans?.supply_power, supplyPowerState),
      extract:
        parseFanFromValues(entities?.fans?.extract_speed ?? config.climate_entity, climateAttributes.extract_fan_speed_percent, entities?.fans?.extract_airflow, climateAttributes.extract_airflow, airflowUnit, entities?.fans?.extract_power, climateAttributes.extract_power, powerUnit).available
          ? parseFanFromValues(entities?.fans?.extract_speed ?? config.climate_entity, climateAttributes.extract_fan_speed_percent, entities?.fans?.extract_airflow, climateAttributes.extract_airflow, airflowUnit, entities?.fans?.extract_power, climateAttributes.extract_power, powerUnit)
          : parseFan(entities?.fans?.extract_speed, extractSpeedState, entities?.fans?.extract_airflow, extractAirflowState, entities?.fans?.extract_power, extractPowerState),
    },
    dampers: {
      bypass:
        parseDamperFromValue(entities?.dampers?.bypass ?? config.climate_entity, climateAttributes.bypass_position_percent).available
          ? parseDamperFromValue(entities?.dampers?.bypass ?? config.climate_entity, climateAttributes.bypass_position_percent)
          : parseDamper(entities?.dampers?.bypass, bypassState),
      oda:
        parseDamperFromValue(entities?.dampers?.oda ?? config.climate_entity, climateAttributes.oda_damper_percent).available
          ? parseDamperFromValue(entities?.dampers?.oda ?? config.climate_entity, climateAttributes.oda_damper_percent)
          : parseDamper(entities?.dampers?.oda, odaDamperState),
      eta:
        parseDamperFromValue(entities?.dampers?.eta ?? config.climate_entity, climateAttributes.eta_damper_percent).available
          ? parseDamperFromValue(entities?.dampers?.eta ?? config.climate_entity, climateAttributes.eta_damper_percent)
          : parseDamper(entities?.dampers?.eta, etaDamperState),
    },
    filters: {
      oda:
        parseFilterFromDays("ODA filter", entities?.filters?.oda_life ?? config.climate_entity, climateAttributes.filter_days_remaining).available
          ? parseFilterFromDays("ODA filter", entities?.filters?.oda_life ?? config.climate_entity, climateAttributes.filter_days_remaining)
          : parseFilter("ODA filter", entities?.filters?.oda, odaFilterState, entities?.filters?.oda_life, odaFilterLifeState),
      eta:
        parseFilterFromDays("ETA filter", entities?.filters?.eta_life ?? config.climate_entity, climateAttributes.filter_days_remaining).available
          ? parseFilterFromDays("ETA filter", entities?.filters?.eta_life ?? config.climate_entity, climateAttributes.filter_days_remaining)
          : parseFilter("ETA filter", entities?.filters?.eta, etaFilterState, entities?.filters?.eta_life, etaFilterLifeState),
    },
    mode: (() => {
      const climateMode = parseModeFromClimate(config.climate_entity, climateState, climateAttributes.current_mode);
      if (climateMode.hvac.controllable || climateMode.preset.controllable || climateMode.fan.controllable || climateMode.currentLabel) {
        return climateMode;
      }
      return parseMode(entities?.mode?.current, currentModeState, entities?.mode?.select, selectModeState);
    })(),
    alerts:
      parseClimateAlerts(climateAttributes) ??
      (climateAttributes.warning !== undefined || climateAttributes.fault !== undefined
        ? (() => {
            const warning = parseBooleanValue(climateAttributes.warning);
            const fault = parseBooleanValue(climateAttributes.fault);
            const warningMessage =
              "The unit reports an active warning. Open more info or inspect the configured alert entity for the exact cause.";
            const faultMessage =
              "The unit reports an active fault. Open more info or inspect the configured alert entity for the exact cause.";
            const notifications: AlertNotification[] = [];

            if (warning) {
              notifications.push({
                id: null,
                code: null,
                purpose: "warning",
                severity: 3,
                kind: "warning",
                prefix: "S",
                translationKey: null,
                message: warningMessage,
                messageCode: "S",
                fullMessage: warningMessage,
                active: true,
              });
            }

            if (fault) {
              notifications.push({
                id: null,
                code: null,
                purpose: "alarm",
                severity: 5,
                kind: "fault",
                prefix: "E",
                translationKey: null,
                message: faultMessage,
                messageCode: "E",
                fullMessage: faultMessage,
                active: true,
              });
            }

            return {
              warning,
              fault,
              warningCount: warning ? 1 : 0,
              faultCount: fault ? 1 : 0,
              highestSeverity: fault ? 5 : warning ? 3 : null,
              primaryMessage: fault ? faultMessage : warning ? warningMessage : null,
              labels: [warning ? "Warning" : null, fault ? "Fault" : null].filter((value): value is string => !!value),
              details: [warning ? warningMessage : null, fault ? faultMessage : null].filter((value): value is string => !!value),
              notifications,
            };
          })()
        : parseAlerts(warningState, faultState)),
  };

  return {
    ...modelWithoutAvailability,
    availability: resolveAvailability(modelWithoutAvailability),
  };
}
