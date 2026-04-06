import type { CSSResultGroup, PropertyValues } from "lit";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { mdiArrowLeft } from "@mdi/js";
import type { ClimateAttributes, HomeAssistant, HomeAssistantState } from "../types";

type MainControl = "temperature" | "humidity";
type MoreInfoPanel = "main" | "related";
type DropdownSelectEvent = CustomEvent<{ item?: { value?: string } }>;
type RelatedViewEvent = CustomEvent<{ entityId?: string }>;

interface MoreInfoHomeAssistant extends HomeAssistant {
  localize?(key: string): string;
  formatEntityAttributeName?(stateObj: HomeAssistantState, attribute: string): string;
  formatEntityAttributeValue?(stateObj: HomeAssistantState, attribute: string, value?: unknown): string;
  formatEntityState?(stateObj: HomeAssistantState, state?: string): string;
}

interface EntityRegistryEntry {
  entity_id?: string;
  device_id?: string | null;
  area_id?: string | null;
  config_entry_id?: string | null;
}

interface DeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  area_id?: string | null;
  config_entries?: string[];
}

interface AreaRegistryEntry {
  area_id: string;
  name: string;
}

interface ConfigEntry {
  entry_id: string;
  title?: string | null;
  domain?: string | null;
}

interface RelatedInfo {
  deviceName: string | null;
  integrations: string[];
  areaName: string | null;
}

type ClimateState = HomeAssistantState & {
  attributes: ClimateAttributes & {
    supported_features?: number;
    humidity?: number | string;
    hvac_modes?: unknown;
    preset_modes?: unknown;
    fan_modes?: unknown;
    swing_modes?: unknown;
    swing_horizontal_modes?: unknown;
  };
};

const FEATURE_TARGET_TEMPERATURE = 1;
const FEATURE_TARGET_TEMPERATURE_RANGE = 2;
const FEATURE_TARGET_HUMIDITY = 4;
const FEATURE_FAN_MODE = 8;
const FEATURE_PRESET_MODE = 16;
const FEATURE_SWING_MODE = 32;
const FEATURE_SWING_HORIZONTAL_MODE = 512;
const UNAVAILABLE = "unavailable";

const ATTRIBUTE_LABELS: Record<string, string> = {
  current_humidity: "Current humidity",
  current_temperature: "Current temperature",
  fan_mode: "Fan mode",
  preset_mode: "Mode",
  swing_horizontal_mode: "Horizontal swing mode",
  swing_mode: "Swing mode",
};

function titleCase(value: string): string {
  return value
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function supportsFeature(stateObj: ClimateState, feature: number): boolean {
  const supported = typeof stateObj.attributes.supported_features === "number" ? stateObj.attributes.supported_features : 0;
  return (supported & feature) !== 0;
}

function isUnavailable(stateObj: ClimateState): boolean {
  return String(stateObj.state).toLowerCase() === UNAVAILABLE;
}

function isSet(value: unknown): boolean {
  return value !== null && value !== undefined && value !== "";
}

function formatAttributeName(hass: MoreInfoHomeAssistant, stateObj: ClimateState, attribute: string): string {
  return hass.formatEntityAttributeName?.(stateObj, attribute) ?? ATTRIBUTE_LABELS[attribute] ?? titleCase(attribute);
}

function formatTemperature(value: unknown, unit: unknown): string {
  const parsed = Number(value);
  if (Number.isFinite(parsed)) {
    const suffix = typeof unit === "string" && unit ? ` ${unit}` : "";
    return `${parsed.toFixed(1)}${suffix}`;
  }
  return String(value);
}

function formatAttributeValue(
  hass: MoreInfoHomeAssistant,
  stateObj: ClimateState,
  attribute: string,
  value: unknown = stateObj.attributes[attribute],
): string {
  const formatted = hass.formatEntityAttributeValue?.(stateObj, attribute, value);
  if (formatted) {
    return formatted;
  }

  if (attribute === "current_temperature" || attribute === "temperature") {
    return formatTemperature(value, stateObj.attributes.temperature_unit);
  }

  if (attribute === "current_humidity" || attribute === "humidity") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? `${parsed.toFixed(0)} %` : String(value);
  }

  return String(value);
}

@customElement("atrea-more-info-climate")
export class AtreaMoreInfoClimate extends LitElement {
  @property({ attribute: false }) public hass!: MoreInfoHomeAssistant;

  @property({ attribute: false }) public stateObj?: ClimateState;

  @state() private _mainControl: MainControl = "temperature";

  @state() private _panel: MoreInfoPanel = "main";

  @state() private _relatedInfo?: RelatedInfo;

  @state() private _relatedLoading = false;

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("atrea-more-info-related", this._handleRelatedRequested as EventListener);
  }

  public disconnectedCallback(): void {
    window.removeEventListener("atrea-more-info-related", this._handleRelatedRequested as EventListener);
    super.disconnectedCallback();
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (
      changedProps.has("stateObj") &&
      this.stateObj &&
      this._mainControl === "humidity" &&
      !supportsFeature(this.stateObj, FEATURE_TARGET_HUMIDITY)
    ) {
      this._mainControl = "temperature";
    }
    if (changedProps.has("stateObj")) {
      this._panel = "main";
      this._relatedInfo = undefined;
      this._relatedLoading = false;
    }
  }

  protected render() {
    if (!this.stateObj) {
      return nothing;
    }

    if (this._panel === "related") {
      return this._renderRelated();
    }

    return this._renderMain();
  }

  private _renderMain() {
    if (!this.stateObj) {
      return nothing;
    }

    const stateObj = this.stateObj;
    const attrs = stateObj.attributes;
    const supportTargetHumidity = supportsFeature(stateObj, FEATURE_TARGET_HUMIDITY) && isSet(attrs.humidity);
    const supportTemperature =
      supportsFeature(stateObj, FEATURE_TARGET_TEMPERATURE) ||
      supportsFeature(stateObj, FEATURE_TARGET_TEMPERATURE_RANGE) ||
      isSet(attrs.temperature);
    const presetModes = asStringArray(attrs.preset_modes);
    const fanModes = asStringArray(attrs.fan_modes);
    const currentTemperature = attrs.current_temperature;
    const currentHumidity = attrs.current_humidity ?? attrs.humidity;

    return html`
      <div class="current">
        ${isSet(currentTemperature)
          ? html`
              <div>
                <p class="label">${formatAttributeName(this.hass, stateObj, "current_temperature")}</p>
                <p class="value">${formatAttributeValue(this.hass, stateObj, "current_temperature", currentTemperature)}</p>
              </div>
            `
          : nothing}
        ${isSet(currentHumidity)
          ? html`
              <div>
                <p class="label">${formatAttributeName(this.hass, stateObj, "current_humidity")}</p>
                <p class="value">${formatAttributeValue(this.hass, stateObj, "current_humidity", currentHumidity)}</p>
              </div>
            `
          : nothing}
      </div>

      <div class="thermostat-block">
        <div class="controls">
          ${supportTemperature && this._mainControl === "temperature"
            ? html`
                <ha-state-control-climate-temperature
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                ></ha-state-control-climate-temperature>
              `
            : nothing}
          ${supportTargetHumidity && this._mainControl === "humidity"
            ? html`
                <ha-state-control-climate-humidity
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                ></ha-state-control-climate-humidity>
              `
            : nothing}
          ${supportTargetHumidity && supportTemperature
            ? html`
                <ha-icon-button-group>
                  <ha-icon-button-toggle
                    .selected=${this._mainControl === "temperature"}
                    .disabled=${isUnavailable(stateObj)}
                    .label=${this.hass.localize?.("ui.dialogs.more_info_control.climate.temperature") ?? "Temperature"}
                    .control=${"temperature"}
                    @click=${this._setMainControl}
                  >
                    T
                  </ha-icon-button-toggle>
                  <ha-icon-button-toggle
                    .selected=${this._mainControl === "humidity"}
                    .disabled=${isUnavailable(stateObj)}
                    .label=${this.hass.localize?.("ui.dialogs.more_info_control.climate.humidity") ?? "Humidity"}
                    .control=${"humidity"}
                    @click=${this._setMainControl}
                  >
                    H
                  </ha-icon-button-toggle>
                </ha-icon-button-group>
              `
            : nothing}
        </div>

        <div class="selects">
        ${(supportsFeature(stateObj, FEATURE_PRESET_MODE) || presetModes.length > 0) && presetModes.length > 0
          ? this._renderTile(
              this.hass.localize?.("ui.card.climate.mode") ?? "Mode",
              typeof attrs.preset_mode === "string" ? attrs.preset_mode : "",
              presetModes,
              this._handlePresetModeChanged,
              (mode) => formatAttributeValue(this.hass, stateObj, "preset_mode", mode),
            )
          : nothing}
        ${(supportsFeature(stateObj, FEATURE_FAN_MODE) || fanModes.length > 0) && fanModes.length > 0
          ? this._renderTile(
              formatAttributeName(this.hass, stateObj, "fan_mode"),
              attrs.fan_mode !== undefined ? String(attrs.fan_mode) : "",
              fanModes,
              this._handleFanModeChanged,
              (mode) => formatAttributeValue(this.hass, stateObj, "fan_mode", mode),
            )
          : nothing}
        </div>
      </div>
    `;
  }

  private _renderRelated() {
    const info = this._relatedInfo;
    const integrationText = info?.integrations.length ? info.integrations.join(", ") : null;

    return html`
      <div class="related-view">
        <div class="related-header">
          <ha-icon-button
            class="related-back"
            .label=${"Back"}
            title="Back"
            aria-label="Back"
            @click=${this._showMainPanel}
          >
            <ha-svg-icon .path=${mdiArrowLeft}></ha-svg-icon>
          </ha-icon-button>
          <div class="related-title">Related</div>
        </div>

        ${this._relatedLoading
          ? html`<div class="related-empty">Loading related items...</div>`
          : html`
              <div class="related-list">
                ${info?.deviceName
                  ? html`
                      <div class="related-item">
                        <div class="related-label">Device</div>
                        <div class="related-value">${info.deviceName}</div>
                      </div>
                    `
                  : nothing}
                ${integrationText
                  ? html`
                      <div class="related-item">
                        <div class="related-label">Integration</div>
                        <div class="related-value">${integrationText}</div>
                      </div>
                    `
                  : nothing}
                ${info?.areaName
                  ? html`
                      <div class="related-item">
                        <div class="related-label">Area</div>
                        <div class="related-value">${info.areaName}</div>
                      </div>
                    `
                  : nothing}
                ${!info?.deviceName && !integrationText && !info?.areaName
                  ? html`<div class="related-empty">No related device, integration, or area found.</div>`
                  : nothing}
              </div>
            `}
      </div>
    `;
  }

  private _renderTile(
    label: string,
    value: string,
    options: string[],
    handler: (ev: DropdownSelectEvent) => void,
    formatLabel: (value: string) => string,
  ) {
    return html`
      <div class="select-tile">
        <ha-control-select-menu
          .hass=${this.hass}
          .label=${label}
          .value=${value}
          .disabled=${!this.stateObj || isUnavailable(this.stateObj)}
          .options=${options.map((option) => ({
            value: option,
            label: formatLabel(option),
          }))}
          @wa-select=${handler}
        ></ha-control-select-menu>
      </div>
    `;
  }

  private _setMainControl(ev: Event) {
    ev.stopPropagation();
    const control = (ev.currentTarget as { control?: MainControl }).control;
    if (control) {
      this._mainControl = control;
    }
  }

  private _handleRelatedRequested = (ev: RelatedViewEvent) => {
    if (!this.stateObj || ev.detail.entityId !== this.stateObj.entity_id) {
      return;
    }
    void this._showRelatedPanel();
  };

  private _showMainPanel = () => {
    this._panel = "main";
  };

  private async _showRelatedPanel(): Promise<void> {
    this._panel = "related";
    if (this._relatedInfo || !this.hass.callWS || !this.stateObj) {
      return;
    }

    this._relatedLoading = true;
    try {
      const entityEntry = (await this.hass.callWS({
        type: "config/entity_registry/get",
        entity_id: this.stateObj.entity_id,
      })) as EntityRegistryEntry | null;

      const [devices, areas, configEntries] = await Promise.all([
        this.hass.callWS({ type: "config/device_registry/list" }) as Promise<DeviceRegistryEntry[]>,
        this.hass.callWS({ type: "config/area_registry/list" }) as Promise<AreaRegistryEntry[]>,
        this.hass.callWS({ type: "config/config_entries/index" }) as Promise<ConfigEntry[]>,
      ]);

      const device = entityEntry?.device_id ? devices.find((entry) => entry.id === entityEntry.device_id) ?? null : null;
      const areaId = entityEntry?.area_id ?? device?.area_id ?? null;
      const areaName = areaId ? areas.find((entry) => entry.area_id === areaId)?.name ?? null : null;
      const relatedEntryIds = [
        ...(entityEntry?.config_entry_id ? [entityEntry.config_entry_id] : []),
        ...(device?.config_entries ?? []),
      ];
      const integrations = Array.from(
        new Set(
          relatedEntryIds
            .map((entryId) => configEntries.find((entry) => entry.entry_id === entryId))
            .filter((entry): entry is ConfigEntry => Boolean(entry))
            .map((entry) => entry.title || entry.domain || entry.entry_id),
        ),
      );

      this._relatedInfo = {
        deviceName: device?.name_by_user || device?.name || null,
        integrations,
        areaName,
      };
    } catch {
      this._relatedInfo = {
        deviceName: null,
        integrations: [],
        areaName: null,
      };
    } finally {
      this._relatedLoading = false;
    }
  }

  private _handleFanModeChanged = (ev: DropdownSelectEvent) => {
    const newVal = ev.detail.item?.value;
    if (!newVal || !this.stateObj) {
      return;
    }
    this._callServiceHelper(this.stateObj.attributes.fan_mode, newVal, "set_fan_mode", {
      fan_mode: newVal,
    });
  };

  private _handlePresetModeChanged = (ev: DropdownSelectEvent) => {
    const newVal = ev.detail.item?.value;
    if (!newVal || !this.stateObj) {
      return;
    }
    this._callServiceHelper(this.stateObj.attributes.preset_mode, newVal, "set_preset_mode", {
      preset_mode: newVal,
    });
  };

  private async _callServiceHelper(
    oldVal: unknown,
    newVal: unknown,
    service: string,
    data: {
      entity_id?: string;
      [key: string]: unknown;
    },
  ) {
    if (!this.stateObj || oldVal === newVal) {
      return;
    }

    data.entity_id = this.stateObj.entity_id;
    const currentState = this.stateObj;

    await this.hass.callService("climate", service, data);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 2000);
    });

    if (this.stateObj !== currentState) {
      return;
    }

    this.stateObj = undefined;
    await this.updateComplete;
    if (this.stateObj === undefined) {
      this.stateObj = currentState;
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        color: var(--primary-text-color);
        display: block;
      }

      .current {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-bottom: var(--ha-space-10, 10px);
        max-width: 420px;
        margin-inline: auto;
      }

      .current div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex: 1;
      }

      .current p {
        margin: 0;
        text-align: center;
        color: var(--primary-text-color);
      }

      .current .label {
        opacity: 0.8;
        font-size: var(--ha-font-size-m, 1rem);
        line-height: var(--ha-line-height-condensed, 1.2);
        letter-spacing: 0.4px;
        margin-bottom: var(--ha-space-1, 2px);
      }

      .current .value {
        font-size: var(--ha-font-size-xl, 1.5rem);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: var(--ha-line-height-condensed, 1.2);
        direction: ltr;
      }

      .thermostat-block {
        display: grid;
        justify-items: center;
        align-content: start;
        gap: var(--ha-space-3, 12px);
        width: 100%;
        max-width: 420px;
        margin: 0 auto;
      }

      .controls {
        display: grid;
        gap: var(--ha-space-2, 8px);
        width: 100%;
        justify-items: center;
      }

      .selects {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 180px));
        gap: var(--ha-space-2, 8px);
        justify-content: center;
        width: 100%;
      }

      .select-tile {
        width: 100%;
        max-width: 180px;
        border-radius: 18px;
        padding: 2px;
        background: color-mix(in srgb, var(--card-background-color, #fff) 90%, var(--primary-text-color) 10%);
      }

      .select-tile ha-control-select-menu {
        width: 100%;
      }

      .related-view {
        display: grid;
        gap: var(--ha-space-3, 12px);
        width: 100%;
        max-width: 420px;
        margin: 0 auto;
      }

      .related-header {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: var(--ha-space-2, 8px);
      }

      .related-title {
        font-size: var(--ha-font-size-xl, 1.5rem);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: 1.2;
      }

      .related-list {
        display: grid;
        gap: var(--ha-space-2, 8px);
      }

      .related-item {
        display: grid;
        gap: 4px;
        padding: 14px 16px;
        border-radius: 18px;
        background: color-mix(in srgb, var(--card-background-color, #fff) 92%, var(--primary-text-color) 8%);
      }

      .related-label {
        color: var(--secondary-text-color);
        font-size: var(--ha-font-size-s, 0.875rem);
        line-height: 1.2;
      }

      .related-value {
        color: var(--primary-text-color);
        font-size: var(--ha-font-size-m, 1rem);
        line-height: 1.35;
        word-break: break-word;
      }

      .related-empty {
        color: var(--secondary-text-color);
        font-size: var(--ha-font-size-m, 1rem);
        line-height: 1.4;
        padding: 10px 2px 0;
      }

      @media (max-width: 520px) {
        .selects {
          grid-template-columns: minmax(0, 180px);
        }
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "atrea-more-info-climate": AtreaMoreInfoClimate;
  }
}
