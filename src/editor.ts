import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { AtreaAmotionCardConfig, LovelaceCardEditor } from "./types";

@customElement("atrea-amotion-card-editor")
export class AtreaAmotionCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public config?: AtreaAmotionCardConfig;

  public setConfig(config: AtreaAmotionCardConfig): void {
    this.config = config;
  }

  protected render() {
    return html`
      <ha-alert alert-type="info">
        Configure entity IDs in YAML. Visual editor support can be expanded later.
      </ha-alert>
    `;
  }
}
