import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./editor";
import { setClimateFanPercentage } from "./actions";
import { normalizeConfig } from "./config";
import { createViewModel } from "./ha-state";
import { renderMoreInfoDialog } from "./more-info/dialog";
import { renderCardSvg } from "./svg/layout";
import { cardStyles } from "./styles";
import type { AtreaAmotionCardConfig, AtreaCardViewModel, HomeAssistant, LovelaceCard } from "./types";

const FAN_POPUP_TIMEOUT_MS = 8000;
const ALERT_POPUP_TIMEOUT_MS = 8000;

declare global {
  interface HTMLElementTagNameMap {
    "atrea-amotion-card": AtreaAmotionCard;
    "atrea-amotion-card-editor": HTMLElement;
  }

  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

@customElement("atrea-amotion-card")
export class AtreaAmotionCard extends LitElement implements LovelaceCard {
  public static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private config?: AtreaAmotionCardConfig;
  @state() private errorMessage?: string;
  @state() private isMoreInfoOpen = false;
  @state() private isFanPopupOpen = false;
  @state() private isAlertPopupOpen = false;
  @state() private fanPopupValue: number | null = null;
  private fanPopupTimeoutId?: number;
  private alertPopupTimeoutId?: number;

  public setConfig(config: AtreaAmotionCardConfig): void {
    this.errorMessage = undefined;
    this.config = normalizeConfig(config);
  }

  public getCardSize(): number {
    return this.config?.layout?.compact ? 4 : 5;
  }

  protected render() {
    if (this.errorMessage) {
      return html`<ha-card class="type-custom-atrea-amotion-card"><div class="container">${this.errorMessage}</div></ha-card>`;
    }

    if (!this.config) {
      return html`<ha-card class="type-custom-atrea-amotion-card"><div class="container">Card is not configured.</div></ha-card>`;
    }

    if (!this.hass) {
      return html`<ha-card class="type-custom-atrea-amotion-card"><div class="container">Home Assistant state not available.</div></ha-card>`;
    }

    let model: AtreaCardViewModel;
    try {
      model = createViewModel(this.hass, this.config);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown rendering error";
      return html`<ha-card class="type-custom-atrea-amotion-card"><div class="container">${message}</div></ha-card>`;
    }

    const layout = this.config.layout ?? {};
    const theme = this.config.theme_variant ?? "auto";
    const cardClasses = ["type-custom-atrea-amotion-card", layout.compact ? "is-compact" : "", `theme-${theme}`].filter(Boolean).join(" ");
    const currentFanValue = Number.parseFloat(model.mode.fan.current ?? "");
    const fallbackFanValue = model.fans.supply.speedPercent ?? model.fans.extract.speedPercent;
    const resolvedFanValue = Number.isFinite(currentFanValue) ? currentFanValue : fallbackFanValue;

    return html`
      <ha-card class=${cardClasses}>
        ${renderCardSvg(this.hass, this.config, model, {
          alertPopupOpen: this.isAlertPopupOpen,
          fanPopupOpen: this.isFanPopupOpen,
          fanPopupValue: this.fanPopupValue ?? resolvedFanValue ?? 0,
          onCloseAlertPopup: () => this.closeAlertPopup(),
          onOpenAlertPopup: () => this.toggleAlertPopup(),
          onAlertPopupInteract: () => this.resetAlertPopupTimeout(),
          onCloseFanPopup: () => this.closeFanPopup(),
          onFanDecrease: async () => this.stepFanValue(model, -1),
          onFanIncrease: async () => this.stepFanValue(model, 1),
          onFanPopupInteract: () => this.resetFanPopupTimeout(),
          onFanPreviewChange: (value: number) => {
            this.fanPopupValue = value;
            this.resetFanPopupTimeout();
          },
          onFanValueCommit: async (value: number) => this.commitFanValue(model, value),
          onOpenMoreInfo: () => {
            this.isMoreInfoOpen = true;
            this.requestUpdate();
          },
          onToggleFanPopup: () => {
            if (!model.mode.fan.controllable) {
              return;
            }
            if (this.isFanPopupOpen) {
              this.closeFanPopup();
              return;
            }
            this.openFanPopup(resolvedFanValue ?? 0);
          },
        })}
        ${this.isMoreInfoOpen
          ? renderMoreInfoDialog(
              this.hass,
              this.config,
              () => {
                this.isMoreInfoOpen = false;
                this.requestUpdate();
              },
            )
          : html``}
      </ha-card>
    `;
  }

  public disconnectedCallback(): void {
    this.clearFanPopupTimeout();
    this.clearAlertPopupTimeout();
    super.disconnectedCallback();
  }

  private toggleAlertPopup(): void {
    if (this.isAlertPopupOpen) {
      this.closeAlertPopup();
      return;
    }
    this.isAlertPopupOpen = true;
    this.resetAlertPopupTimeout();
  }

  private closeAlertPopup(): void {
    this.isAlertPopupOpen = false;
    this.clearAlertPopupTimeout();
  }

  private clearAlertPopupTimeout(): void {
    if (this.alertPopupTimeoutId !== undefined) {
      window.clearTimeout(this.alertPopupTimeoutId);
      this.alertPopupTimeoutId = undefined;
    }
  }

  private resetAlertPopupTimeout(): void {
    if (!this.isAlertPopupOpen) {
      return;
    }

    this.clearAlertPopupTimeout();
    this.alertPopupTimeoutId = window.setTimeout(() => {
      this.closeAlertPopup();
      this.requestUpdate();
    }, ALERT_POPUP_TIMEOUT_MS);
  }

  private openFanPopup(value: number): void {
    this.fanPopupValue = value;
    this.isFanPopupOpen = true;
    this.resetFanPopupTimeout();
  }

  private closeFanPopup(): void {
    this.isFanPopupOpen = false;
    this.clearFanPopupTimeout();
  }

  private clearFanPopupTimeout(): void {
    if (this.fanPopupTimeoutId !== undefined) {
      window.clearTimeout(this.fanPopupTimeoutId);
      this.fanPopupTimeoutId = undefined;
    }
  }

  private resetFanPopupTimeout(): void {
    if (!this.isFanPopupOpen) {
      return;
    }

    this.clearFanPopupTimeout();
    this.fanPopupTimeoutId = window.setTimeout(() => {
      this.closeFanPopup();
      this.requestUpdate();
    }, FAN_POPUP_TIMEOUT_MS);
  }

  private getFanStepOptions(model: AtreaCardViewModel): number[] {
    const numericOptions = model.mode.fan.options
      .map((option) => Number.parseFloat(option))
      .filter((value) => Number.isFinite(value))
      .sort((left, right) => left - right);

    if (numericOptions.length > 0) {
      return numericOptions;
    }

    const fallback = model.fans.supply.speedPercent ?? model.fans.extract.speedPercent;
    return fallback === null ? [] : [fallback];
  }

  private getNearestFanOption(model: AtreaCardViewModel, value: number): number | null {
    const options = this.getFanStepOptions(model);
    if (options.length === 0) {
      return null;
    }

    const boundedValue = Math.max(0, Math.min(100, value));
    return options.reduce((best, current) => {
      return Math.abs(current - boundedValue) < Math.abs(best - boundedValue) ? current : best;
    });
  }

  private async commitFanValue(model: AtreaCardViewModel, value: number): Promise<void> {
    if (!this.hass || !model.mode.climateEntity || !model.mode.fan.controllable) {
      return;
    }

    this.resetFanPopupTimeout();
    const boundedValue = Math.round(Math.max(0, Math.min(100, value)));
    const snappedValue = this.getNearestFanOption(model, boundedValue) ?? boundedValue;
    this.fanPopupValue = snappedValue;
    await setClimateFanPercentage(this.hass, model.mode.climateEntity, snappedValue, model.mode.fan.options);
  }

  private async stepFanValue(model: AtreaCardViewModel, direction: -1 | 1): Promise<void> {
    const options = this.getFanStepOptions(model);
    if (options.length === 0) {
      return;
    }

    this.resetFanPopupTimeout();
    const currentValue = this.fanPopupValue ?? options[0]!;
    let target = direction < 0 ? options[0]! : options[options.length - 1]!;

    if (direction < 0) {
      for (let index = options.length - 1; index >= 0; index -= 1) {
        if (options[index]! < currentValue) {
          target = options[index]!;
          break;
        }
      }
    } else {
      for (const option of options) {
        if (option > currentValue) {
          target = option;
          break;
        }
      }
    }

    await this.commitFanValue(model, target);
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement("atrea-amotion-card-editor");
  }

  public static getStubConfig(): AtreaAmotionCardConfig {
    return {
      type: "custom:atrea-amotion-card",
      title: "Atrea aMotion",
      show_title: true,
      theme_variant: "auto",
      entities: {
        temperatures: {
          oda: "sensor.atrea_oda_temperature",
          eta: "sensor.atrea_eta_temperature",
          sup: "sensor.atrea_sup_temperature",
          eha: "sensor.atrea_eha_temperature",
        },
      },
      climate_entity: "climate.atrea_amotion",
    };
  }
}

if (!window.customCards) {
  window.customCards = [];
}

window.customCards.push({
  type: "atrea-amotion-card",
  name: "Atrea aMotion Card",
  description: "SVG Lovelace card for Atrea heat recovery ventilation units",
  preview: true,
});

export default AtreaAmotionCard;
