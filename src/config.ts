import type {
  AtreaAmotionCardConfig,
  LayoutConfig,
  TapActionConfig,
  ThemeVariant,
  TitleDisplayMode,
} from "./types";

const DEFAULT_LAYOUT: Required<LayoutConfig> = {
  compact: false,
  show_airflow: true,
  show_speed: false,
  show_temp: true,
  show_filter_details: true,
  fan_animation_max_rpm: 1800,
};

const DEFAULT_TAP_ACTIONS: Required<TapActionConfig> = {
  oda_temperature: "history",
  eta_temperature: "history",
  sup_temperature: "history",
  eha_temperature: "history",
  supply_fan: "more-info",
  extract_fan: "more-info",
  bypass: "more-info",
  oda_damper: "more-info",
  eta_damper: "more-info",
  oda_filter: "more-info",
  eta_filter: "more-info",
  mode: "more-info",
};

function hasString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeTitleDisplayMode(value: unknown, hasCustomTitle: boolean): TitleDisplayMode {
  if (value === "unit_name" || value === "custom" || value === "none") {
    return value;
  }

  if (value === false) {
    return "none";
  }

  if (value === true) {
    return hasCustomTitle ? "custom" : "unit_name";
  }

  return hasCustomTitle ? "custom" : "unit_name";
}

function validateConfig(rawConfig: AtreaAmotionCardConfig): void {
  if (!hasString(rawConfig.climate_entity)) {
    throw new Error("Missing required configuration: climate_entity");
  }
}

export function getDefaultLayout(): Required<LayoutConfig> {
  return { ...DEFAULT_LAYOUT };
}

export function getDefaultTapActions(): Required<TapActionConfig> {
  return { ...DEFAULT_TAP_ACTIONS };
}

export function normalizeThemeVariant(value: unknown): ThemeVariant {
  if (value === "light" || value === "dark") {
    return value;
  }
  return "auto";
}

export function normalizeConfig(rawConfig: AtreaAmotionCardConfig): AtreaAmotionCardConfig {
  if (!rawConfig || rawConfig.type !== "custom:atrea-amotion-card") {
    throw new Error("Card type must be custom:atrea-amotion-card");
  }

  validateConfig(rawConfig);

  return {
    ...rawConfig,
    title: rawConfig.title ?? "Atrea aMotion",
    show_title: normalizeTitleDisplayMode(rawConfig.show_title, hasString(rawConfig.title)),
    theme_variant: normalizeThemeVariant(rawConfig.theme_variant),
    entities: rawConfig.entities,
    layout: {
      ...DEFAULT_LAYOUT,
      ...rawConfig.layout,
    },
    tap_actions: {
      ...DEFAULT_TAP_ACTIONS,
      ...rawConfig.tap_actions,
    },
  };
}
