import { html, nothing } from "lit";
import type { TemplateResult } from "lit";
import type { AtreaAmotionCardConfig, HomeAssistant,ClimateAttributes, HomeAssistantState } from "../types";
import "./climate";

const CLOSE_PATH = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";

function resolveTitle(config: AtreaAmotionCardConfig, stateObj?: HomeAssistantState): string {
  const unitName = typeof stateObj?.attributes.unit_name === "string" ? stateObj.attributes.unit_name : undefined;
  const friendlyName = typeof stateObj?.attributes.friendly_name === "string" ? stateObj.attributes.friendly_name : undefined;
  return unitName ?? friendlyName ?? "Ventilation unit";
}

export function renderMoreInfoDialog(
  hass: HomeAssistant,
  config: AtreaAmotionCardConfig,
  onClose: () => void,
): TemplateResult {
  const stateObj = hass.states[config.climate_entity];
  const climate = stateObj as HomeAssistantState<ClimateAttributes> | undefined;
  return html`
    <ha-dialog open @closed=${onClose} .heading=${false}>
      <ha-icon-button
        slot="headerNavigationIcon"
        class="more-info-close"
        @click=${onClose}
        .label=${"Close dialog"}
        title="Close dialog"
        aria-label="Close dialog"
      >
        <ha-svg-icon .path=${CLOSE_PATH}></ha-svg-icon>
      </ha-icon-button>
      <div slot="headerTitle" class="more-info-dialog-title">${resolveTitle(config, stateObj)}</div>
      ${stateObj
        ? html`
            <atrea-more-info-climate .hass=${hass} .stateObj=${stateObj}></atrea-more-info-climate>
          `
        : nothing}
    </ha-dialog>
  `;
}
