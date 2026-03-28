export type EntityId = string;
export type ThemeVariant = "auto" | "light" | "dark";
export type TapActionType = "more-info" | "history" | "none";
export type AvailabilityState = "full" | "partial" | "minimal";
export type DamperVisualState = "open" | "closed" | "partial" | "unknown" | "unavailable";
export type FilterSeverity = "normal" | "warning" | "critical" | "unknown";

export interface HomeAssistantState<TAttributes = Record<string, unknown>> {
  entity_id: EntityId;
  state: string;
  attributes: TAttributes;
}

export interface HomeAssistant {
  states: Record<string, HomeAssistantState>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>
  ): Promise<unknown>;  
  dispatchEvent(event: Event): boolean;
}

export interface LovelaceCardEditor {
  setConfig(config: AtreaAmotionCardConfig): void;
  config?: AtreaAmotionCardConfig;
}

export interface LovelaceCard {
  hass?: HomeAssistant;
  setConfig(config: AtreaAmotionCardConfig): void;
  getCardSize?(): number;
}

export interface EntityTemperatureConfig {
  oda: EntityId;
  eta: EntityId;
  sup: EntityId;
  eha: EntityId;
}

export interface EntityFanConfig {
  supply_speed: EntityId;
  extract_speed: EntityId;
  supply_airflow?: EntityId;
  extract_airflow?: EntityId;
  supply_power?: EntityId;
  extract_power?: EntityId;
}

export interface EntityDamperConfig {
  bypass: EntityId;
  oda?: EntityId;
  eta?: EntityId;
}

export interface EntityFilterConfig {
  oda?: EntityId;
  eta?: EntityId;
  oda_life?: EntityId;
  eta_life?: EntityId;
}

export interface EntityModeConfig {
  current?: EntityId;
  select?: EntityId;
}

export interface EntityAlertConfig {
  warning?: EntityId;
  fault?: EntityId;
}

export interface EntityConfig {
  temperatures?: EntityTemperatureConfig;
  fans?: EntityFanConfig;
  dampers?: EntityDamperConfig;
  filters?: EntityFilterConfig;
  mode?: EntityModeConfig;
  alerts?: EntityAlertConfig;
}

export interface LayoutConfig {
  compact?: boolean;
  show_airflow?: boolean;
  show_power?: boolean;
  show_filter_details?: boolean;
  fan_animation_max_rpm?: number;
}

export interface TapActionConfig {
  [key: string]: TapActionType | undefined;
  oda_temperature?: TapActionType;
  eta_temperature?: TapActionType;
  sup_temperature?: TapActionType;
  eha_temperature?: TapActionType;
  supply_fan?: TapActionType;
  extract_fan?: TapActionType;
  bypass?: TapActionType;
  oda_damper?: TapActionType;
  eta_damper?: TapActionType;
  oda_filter?: TapActionType;
  eta_filter?: TapActionType;
  mode?: TapActionType;
}

export interface AtreaAmotionCardConfig {
  type: "custom:atrea-amotion-card";
  title?: string;
  show_title?: boolean;
  theme_variant?: ThemeVariant;
  climate_entity: EntityId;
  bypass_select?: EntityId;
  filter_reset_button?: EntityId;
  entities?: EntityConfig;
  layout?: LayoutConfig;
  tap_actions?: TapActionConfig;
}

export interface ClimateAttributes {
  current_temperature?: number | string;
  current_humidity?: number | string;
  humidity?: number | string;
  co2?: number | string;
  carbon_dioxide?: number | string;
  temperature?: number | string;
  target_temp_step?: number | string;
  min_temp?: number | string;
  max_temp?: number | string;
  outside_air_temperature?: number | string;
  extract_air_temperature?: number | string;
  supply_air_temperature?: number | string;
  exhaust_air_temperature?: number | string;
  supply_fan_speed_percent?: number | string;
  extract_fan_speed_percent?: number | string;
  bypass_position_percent?: number | string;
  oda_damper_percent?: number | string;
  eta_damper_percent?: number | string;
  current_mode?: string;
  preset_mode?: string;
  fan_mode?: string;
  filter_days_remaining?: number | string;
  warning?: boolean | string;
  fault?: boolean | string;
  supply_airflow?: number | string;
  extract_airflow?: number | string;
  supply_power?: number | string;
  extract_power?: number | string;
  temperature_unit?: string;
  airflow_unit?: string;
  power_unit?: string;
  fan_modes?: string[];
  hvac_modes?: string[];
  preset_modes?: string[];
  [key: string]: unknown;
}

export interface TemperaturePoint {
  entity?: string;
  value: number | null;
  unit: string | null;
  available: boolean;
}

export interface FanState {
  speedEntity?: string;
  speedPercent: number | null;
  airflowEntity?: string;
  airflow: number | null;
  airflowUnit: string | null;
  powerEntity?: string;
  power: number | null;
  powerUnit: string | null;
  available: boolean;
}

export interface DamperState {
  entity?: string;
  percentOpen: number | null;
  state: DamperVisualState;
  available: boolean;
}

export interface FilterState {
  statusEntity?: string;
  lifeEntity?: string;
  severity: FilterSeverity;
  lifePercent: number | null;
  label: string;
  available: boolean;
}

export interface ModeOptionGroup {
  current: string | null;
  options: string[];
  controllable: boolean;
}

export interface ModeState {
  climateEntity?: string;
  currentLabel: string | null;
  hvac: ModeOptionGroup;
  preset: ModeOptionGroup;
  fan: ModeOptionGroup;
  fallbackEntity?: string;
  fallbackOptions: string[];
  fallbackControllable: boolean;
}

export interface AlertState {
  warning: boolean;
  fault: boolean;
  labels: string[];
}

export interface AtreaCardViewModel {
  temperatures: {
    oda: TemperaturePoint;
    eta: TemperaturePoint;
    sup: TemperaturePoint;
    eha: TemperaturePoint;
  };
  fans: {
    supply: FanState;
    extract: FanState;
  };
  dampers: {
    bypass: DamperState;
    oda: DamperState;
    eta: DamperState;
  };
  filters: {
    oda: FilterState;
    eta: FilterState;
  };
  mode: ModeState;
  alerts: AlertState;
  availability: AvailabilityState;
}

export interface HomeAssistantThemeInfo {
  darkMode?: boolean;
  theme?: string;
  themes?: Record<string, unknown>;
}

export interface HomeAssistantConfig {
  language?: string;
  time_zone?: string;
  currency?: string;
  unit_system?: {
    temperature?: string;
    length?: string;
    accumulated_precipitation?: string;
    mass?: string;
    pressure?: string;
    precipitation?: string;
    volume?: string;
    wind_speed?: string;
  };
}

export interface HomeAssistantUser {
  id?: string;
  name?: string | null;
  is_admin?: boolean;
  is_owner?: boolean;
}

export interface HomeAssistant {
  states: Record<string, HomeAssistantState>;

  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>
  ): Promise<unknown>;

  dispatchEvent(event: Event): boolean;

  localize?: (key: string, ...args: unknown[]) => string;

  themes?: HomeAssistantThemeInfo;
  config?: HomeAssistantConfig;
  user?: HomeAssistantUser;

  locale?: {
    language?: string;
    number_format?: string;
    time_format?: string;
    date_format?: string;
    first_weekday?: number;
  };

  selectedLanguage?: string;
}
