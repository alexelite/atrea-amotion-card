import { html, nothing } from "lit";
import type { TemplateResult } from "lit";
import { mdiDotsVertical } from "@mdi/js";
import type { AtreaAmotionCardConfig, HomeAssistant } from "../types";
import { fireMoreInfoView, navigateToPath, openPreferredHistory, resolveDeviceId } from "../actions";
import { resolveTitle } from "../title";
import "./climate";

const CLOSE_PATH = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
const HISTORY_PATH = "M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17M19 19H5V5H19V19.1M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z";
const SETTINGS_PATH = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z";
const DEVICE_INFO_PATH = "M3 6H21V4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H7V18H3V6M13 12H9V13.78C8.39 14.33 8 15.11 8 16C8 16.89 8.39 17.67 9 18.22V20H13V18.22C13.61 17.67 14 16.88 14 16S13.61 14.33 13 13.78V12M11 17.5C10.17 17.5 9.5 16.83 9.5 16S10.17 14.5 11 14.5 12.5 15.17 12.5 16 11.83 17.5 11 17.5M22 8H16C15.5 8 15 8.5 15 9V19C15 19.5 15.5 20 16 20H22C22.5 20 23 19.5 23 19V9C23 8.5 22.5 8 22 8M21 18H17V10H21V18Z";
const RELATED_PATH = "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";
const DETAILS_PATH = "M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9";

export function renderMoreInfoDialog(
  hass: HomeAssistant,
  config: AtreaAmotionCardConfig,
  onClose: () => void,
): TemplateResult {
  const stateObj = hass.states[config.climate_entity];
  const title = resolveTitle(config, stateObj);
  const openNativeView = (view: Parameters<typeof fireMoreInfoView>[2]): void => {
    onClose();
    window.requestAnimationFrame(() => {
      fireMoreInfoView(hass, config.climate_entity, view);
    });
  };
  const openHistory = async (): Promise<void> => {
    onClose();
    window.requestAnimationFrame(() => {
      void openPreferredHistory(hass, config);
    });
  };
  const showRelatedView = (): void => {
    window.dispatchEvent(
      new CustomEvent("atrea-more-info-related", {
        detail: { entityId: config.climate_entity },
      }),
    );
  };
  const openDeviceInfo = async (): Promise<void> => {
    const deviceId = await resolveDeviceId(hass, config.climate_entity);
    if (!deviceId) {
      openNativeView("info");
      return;
    }
    onClose();
    window.requestAnimationFrame(() => {
      navigateToPath(`/config/devices/device/${encodeURIComponent(deviceId)}`);
    });
  };

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
      ${title ? html`<div slot="headerTitle" class="more-info-dialog-title">${title}</div>` : nothing}
      <div slot="headerActionItems" class="more-info-header-actions">
        <ha-icon-button
          class="more-info-header-action"
          .label=${"History"}
          title="History"
          aria-label="History"
          @click=${openHistory}
        >
          <ha-svg-icon .path=${HISTORY_PATH}></ha-svg-icon>
        </ha-icon-button>
        <ha-icon-button
          class="more-info-header-action"
          .label=${"Settings"}
          title="Settings"
          aria-label="Settings"
          @click=${() => openNativeView("settings")}
        >
          <ha-svg-icon .path=${SETTINGS_PATH}></ha-svg-icon>
        </ha-icon-button>
        <ha-dropdown
          class="more-info-header-dropdown"
          placement="bottom-end"
          distance="4"
        >
          <ha-icon-button
            slot="trigger"
            class="more-info-header-action"
            .label=${"More actions"}
            title="More actions"
            aria-label="More actions"
          >
            <ha-svg-icon .path=${mdiDotsVertical}></ha-svg-icon>
          </ha-icon-button>
          <ha-dropdown-item class="more-info-dropdown-item" @click=${openDeviceInfo}>
            <ha-svg-icon slot="icon" .path=${DEVICE_INFO_PATH}></ha-svg-icon>
            Device info
          </ha-dropdown-item>
          <ha-dropdown-item class="more-info-dropdown-item" @click=${showRelatedView}>
            <ha-svg-icon slot="icon" .path=${RELATED_PATH}></ha-svg-icon>
            Related
          </ha-dropdown-item>
          <ha-dropdown-item class="more-info-dropdown-item" @click=${() => openNativeView("info")}>
            <ha-svg-icon slot="icon" .path=${DETAILS_PATH}></ha-svg-icon>
            Details
          </ha-dropdown-item>
        </ha-dropdown>
      </div>
      ${stateObj
        ? html`
            <atrea-more-info-climate .hass=${hass} .stateObj=${stateObj}></atrea-more-info-climate>
          `
        : nothing}
    </ha-dialog>
  `;
}
