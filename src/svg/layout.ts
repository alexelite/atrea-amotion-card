import { html, nothing, svg, type TemplateResult } from "lit";
import { mdiAlertCircleOutline, mdiDotsVertical, mdiFan, mdiFanAuto, mdiPower, mdiWeatherNight } from "@mdi/js";
import type { AtreaAmotionCardConfig, AtreaCardViewModel, DamperState, FanState, FilterState, HomeAssistant, TemperaturePoint } from "../types";
import { handleEntityTap, selectMode } from "../actions";
import { fanAnimationDuration, flowAnimationDuration } from "./animations";
import { damperAnchors, fanCenters, flowPaths, SVG_VIEW_BOX, temperatureAnchors } from "./paths";
import { formatNumber, formatValueWithUnit } from "../utils/format";

function badgeClass(available: boolean, extra?: string): string {
  return ["badge", available ? "" : "is-muted", extra ?? ""].filter(Boolean).join(" ");
}

function renderTemperatureBadge(label: string, point: TemperaturePoint, x: number, y: number, onClick?: () => void): TemplateResult {
  return svg`
    <g class=${badgeClass(point.available, "temp-badge")} transform="translate(${x}, ${y})" @click=${onClick}>
      <rect x="-56" y="-24" width="112" height="48" rx="14"></rect>
      <text x="0" y="5" class="badge-value temperature-only">${formatValueWithUnit(point.value, point.unit, 1)}</text>
    </g>
  `;
}

function renderFan(label: string, fan: FanState, x: number, y: number, onClick?: () => void): TemplateResult {
  const duration = fanAnimationDuration(fan.speedPercent);
  return svg`
    <g class="fan-group" transform="translate(${x}, ${y})" @click=${onClick}>
      <circle class="fan-shell" r="44"></circle>
      <g class="fan-rotor">
        <path d="M 0 -32 C 18 -32 27 -13 11 -4 C 7 0 0 -4 0 -10 Z"></path>
        <path d="M 32 0 C 32 18 13 27 4 11 C 0 7 4 0 10 0 Z"></path>
        <path d="M 0 32 C -18 32 -27 13 -11 4 C -7 0 0 4 0 10 Z"></path>
        <path d="M -32 0 C -32 -18 -13 -27 -4 -11 C 0 -7 -4 0 -10 0 Z"></path>
        ${fan.speedPercent && fan.speedPercent > 0
          ? svg`<animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur=${duration} repeatCount="indefinite"></animateTransform>`
          : nothing}
      </g>
      <circle class="fan-core" r="9"></circle>
    </g>
  `;
}

function damperRotation(damper: DamperState): number {
  const percent = damper.percentOpen ?? 0;
  return (percent / 100) * 90;
}

function renderDamper(_label: string, damper: DamperState, x: number, y: number, vertical: boolean, onClick?: () => void): TemplateResult {
  const rotation = damperRotation(damper);
  const visualRotation = 90 - rotation;
  return svg`
    <g class=${["damper", damper.available ? "" : "is-muted"].filter(Boolean).join(" ")} transform="translate(${x}, ${y})" @click=${onClick}>
      <circle r="20" class="damper-ring"></circle>
      <g transform=${vertical ? `rotate(${visualRotation})` : `rotate(${-visualRotation})`}>
        <rect x="-18" y="-2.5" width="36" height="5" rx="2.5" class="damper-blade"></rect>
      </g>
    </g>
  `;
}

function interpolateChannel(start: number, end: number, ratio: number): number {
  return Math.round(start + (end - start) * ratio);
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function interpolateColor(stops: Array<{ at: number; color: string }>, value: number): string {
  const bounded = Math.max(stops[0]!.at, Math.min(stops[stops.length - 1]!.at, value));
  for (let index = 0; index < stops.length - 1; index += 1) {
    const current = stops[index]!;
    const next = stops[index + 1]!;
    if (bounded >= current.at && bounded <= next.at) {
      const ratio = (bounded - current.at) / (next.at - current.at || 1);
      const currentRgb = hexToRgb(current.color);
      const nextRgb = hexToRgb(next.color);
      return `rgb(${interpolateChannel(currentRgb[0], nextRgb[0], ratio)} ${interpolateChannel(currentRgb[1], nextRgb[1], ratio)} ${interpolateChannel(currentRgb[2], nextRgb[2], ratio)})`;
    }
  }
  return stops[stops.length - 1]!.color;
}

function filterVisuals(filter: FilterState): { color: string; opacity: number; text: string; critical: boolean } {
  if (filter.lifePercent === null) {
    return {
      color: "rgb(139 160 181)",
      opacity: filter.available ? 0.72 : 0.35,
      text: filter.available ? "service" : "N/C",
      critical: false,
    };
  }

  const days = Math.max(0, Math.min(60, filter.lifePercent));
  const color = interpolateColor(
    [
      { at: 0, color: "#d93c3c" },
      { at: 15, color: "#e06a3a" },
      { at: 30, color: "#d6bf47" },
      { at: 60, color: "#8ba0b5" },
    ],
    days,
  );
  const opacity = 0.58 + (1 - days / 60) * 0.34;

  return {
    color,
    opacity,
    text: `${formatNumber(filter.lifePercent, 0)} d`,
    critical: days < 15,
  };
}

function renderFilter(filter: FilterState, bodyPath: string, slats: string[], onClick?: () => void): TemplateResult {
  const visuals = filterVisuals(filter);
  return svg`
    <g
      class=${["filter", `is-${filter.severity}`, filter.available ? "" : "is-muted", visuals.critical ? "is-critical-pulse" : ""].filter(Boolean).join(" ")}
      @click=${onClick}
      style=${`--filter-color:${visuals.color}; --filter-opacity:${visuals.opacity};`}
    >
      <path class="filter-body" d=${bodyPath}></path>
      ${slats.map((slat) => svg`<path class="filter-slat" d=${slat}></path>`)}
    </g>
  `;
}

interface VisualSelectOption {
  action?: () => Promise<void> | void;
  disabled?: boolean;
  icon: TemplateResult;
  id: string;
  label: string;
  selected?: boolean;
}

interface CardRenderHandlers {
  alertPopupOpen: boolean;
  onAlertPopupInteract: () => void;
  onCloseAlertPopup: () => void;
  onOpenAlertPopup: () => void;
  onCloseFanPopup: () => void;
  fanPopupOpen: boolean;
  fanPopupValue: number;
  onFanDecrease: () => Promise<void> | void;
  onFanIncrease: () => Promise<void> | void;
  onFanPopupInteract: () => void;
  onFanPreviewChange: (value: number) => void;
  onFanValueCommit: (value: number) => Promise<void> | void;
  onOpenMoreInfo: () => void;
  onToggleFanPopup: () => void;
}

function renderMdiIcon(path: string): TemplateResult {
  return html`<ha-svg-icon .path=${path}></ha-svg-icon>`;
}

function renderFanAdjustIcon(): TemplateResult {
  return svg`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d=${mdiFan}></path>
      <path d="M 21.703253 4.7618552 L 19.958952 2.8872845 L 18.214651 4.7618552" fill="none" stroke="currentColor" stroke-width="1.8114" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M 18.195176 19.581143 L 19.939477 21.455714 L 21.683778 19.581143" fill="none" stroke="currentColor" stroke-width="1.8114" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}

function renderFanDisbalanceIcon(): TemplateResult {
  return svg`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d=${mdiFan}></path>
      <path d="M 3.2824585 1.8140332 L 1.6824585 3.6140332 L 3.2824585 5.4140332" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M 6.0640189 1.8140332 L 4.4640189 3.6140332 L 6.0640189 5.4140332" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M 17.378952 17.6 L 19.378952 20 L 17.378952 22.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M 20.32722 17.564032 L 22.32722 19.964032 L 20.32722 22.364032" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}

const PRESET_ACTIONS = [
  { id: "standby", label: "Standby", icon: renderMdiIcon(mdiPower), matches: ["standby", "stand-by", "off"] },
  { id: "interval", label: "Interval", icon: renderMdiIcon(mdiFanAuto), matches: ["interval", "intervals", "auto"] },
  { id: "ventilation", label: "Ventilation only", icon: renderMdiIcon(mdiFan), matches: ["ventilation", "ventilation only"] },
  { id: "night-cooling", label: "Night cooling", icon: renderMdiIcon(mdiWeatherNight), matches: ["night cooling", "night_cooling", "cooling"] },
  { id: "disbalance", label: "Disbalance", icon: renderFanDisbalanceIcon(), matches: ["disbalance", "imbalance"] },
  { id: "fan", label: "Fan", icon: renderFanAdjustIcon(), matches: [] },
] as const;

function pickPresetOption(options: string[], needles: string[]): string | null {
  const normalized = options.map((option) => ({ option, lower: option.toLowerCase() }));
  for (const needle of needles) {
    const match = normalized.find(({ lower }) => lower === needle || lower.includes(needle));
    if (match) {
      return match.option;
    }
  }
  return null;
}

function renderActionFeatures(options: VisualSelectOption[]): TemplateResult {
  if (options.length === 0) {
    return html``;
  }

  return html`
    <div
      class="official-card-features"
      style="--feature-color:var(--state-climate-off-color, var(--state-climate-inactive-color, var(--state-inactive-color)));"
    >
      <div class="official-card-feature">
        <div
          class="official-control-select"
          role="radiogroup"
          aria-label="Presets"
          style="--control-select-color:var(--state-climate-off-color, var(--state-climate-inactive-color, var(--state-inactive-color)));"
        >
          ${options.map(
            (option) => html`
              <div
                role="radio"
                id=${option.id}
                class=${["official-option", option.selected ? "selected" : "", option.disabled ? "disabled" : ""].filter(Boolean).join(" ")}
                tabindex="-1"
                aria-checked=${option.selected ? "true" : "false"}
                aria-label=${option.label}
                title=${option.label}
                @click=${option.action}
              >
                <div class="official-option-content">${option.icon}</div>
              </div>
            `,
          )}
        </div>
      </div>
    </div>
  `;
}

function renderCardFeatures(
  hass: HomeAssistant,
  model: AtreaCardViewModel,
  handlers: CardRenderHandlers,
): TemplateResult {
  const presetOptions = model.mode.preset.options;
  const currentPreset = model.mode.preset.current?.toLowerCase() ?? "";

  return renderActionFeatures(
    PRESET_ACTIONS.map((presetAction) => {
      if (presetAction.id === "fan") {
        return {
          action: handlers.onToggleFanPopup,
          disabled: !model.mode.fan.controllable,
          icon: presetAction.icon,
          id: `action-${presetAction.id}`,
          label: presetAction.label,
          selected: handlers.fanPopupOpen,
        };
      }

      const matchedPreset = pickPresetOption(presetOptions, [...presetAction.matches]);
      return {
        action:
          matchedPreset && model.mode.climateEntity
            ? () => selectMode(hass, model.mode.climateEntity!, "preset", matchedPreset)
            : undefined,
        disabled: !matchedPreset || !model.mode.climateEntity,
        icon: presetAction.icon,
        id: `action-${presetAction.id}`,
        label: presetAction.label,
        selected: !!matchedPreset && currentPreset === matchedPreset.toLowerCase(),
      };
    }),
  );
}

function renderFanPopup(model: AtreaCardViewModel, handlers: CardRenderHandlers): TemplateResult {
  if (!handlers.fanPopupOpen || !model.mode.fan.controllable) {
    return html``;
  }

  const displayValue = Math.round(Math.max(0, Math.min(100, handlers.fanPopupValue)));

  return html`
    <div class="fan-popup-shell" @click=${handlers.onCloseFanPopup}>
      <div class="fan-popup-backdrop"></div>
      <div
        class="fan-popup official-card-feature"
        @click=${(event: Event) => {
          event.stopPropagation();
          handlers.onFanPopupInteract();
        }}
      >
        <div class="fan-popup-header">
          <span class="fan-popup-title">Fan speed</span>
          <span class="fan-popup-value">${displayValue}%</span>
        </div>
        <div class="fan-popup-controls">
          <button class="fan-step-button" type="button" aria-label="Decrease fan speed" @click=${handlers.onFanDecrease}>-</button>
          <div class="fan-slider-wrap">
            <input
              class="fan-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              .value=${String(displayValue)}
              aria-label="Fan speed percentage"
              @input=${(event: Event) => {
                const target = event.currentTarget as HTMLInputElement;
                handlers.onFanPreviewChange(Number.parseInt(target.value, 10));
              }}
              @change=${(event: Event) => {
                const target = event.currentTarget as HTMLInputElement;
                handlers.onFanValueCommit(Number.parseInt(target.value, 10));
              }}
            />
          </div>
          <button class="fan-step-button" type="button" aria-label="Increase fan speed" @click=${handlers.onFanIncrease}>+</button>
        </div>
      </div>
    </div>
  `;
}

function renderAlertButton(model: AtreaCardViewModel, handlers: CardRenderHandlers): TemplateResult {
  if (!model.alerts.warning && !model.alerts.fault) {
    return html``;
  }

  const label = model.alerts.fault ? "Fault details" : "Warning details";
  return html`
    <ha-icon-button
      class="alert-info ${model.alerts.fault ? "is-fault" : "is-warning"}"
      .label=${label}
      .title=${label}
      @click=${handlers.onOpenAlertPopup}
    >
      <ha-svg-icon .path=${mdiAlertCircleOutline}></ha-svg-icon>
    </ha-icon-button>
  `;
}

function renderAlertPopup(model: AtreaCardViewModel, handlers: CardRenderHandlers): TemplateResult {
  if (!handlers.alertPopupOpen || (!model.alerts.warning && !model.alerts.fault)) {
    return html``;
  }

  const title = model.alerts.fault ? "Fault active" : "Warning active";

  return html`
    <div class="alert-popup-shell" @click=${handlers.onCloseAlertPopup}>
      <div class="alert-popup-backdrop"></div>
      <div
        class="alert-popup official-card-feature ${model.alerts.fault ? "is-fault" : "is-warning"}"
        @click=${(event: Event) => {
          event.stopPropagation();
          handlers.onAlertPopupInteract();
        }}
      >
        <div class="alert-popup-header">
          <span class="alert-popup-title">${title}</span>
        </div>
        <div class="alert-popup-body">
          ${model.alerts.details.map((detail) => html`<p class="alert-popup-text">${detail}</p>`)}
        </div>
      </div>
    </div>
  `;
}

export function renderCardSvg(
  hass: HomeAssistant,
  config: AtreaAmotionCardConfig,
  model: AtreaCardViewModel,
  handlers: CardRenderHandlers,
): TemplateResult {
  const layout = config.layout!;
  const bypassOpen = model.dampers.bypass.percentOpen ?? 0;
  const bypassClosed = bypassOpen <= 0;
  const mainOpacity = bypassOpen >= 100 ? 0.3 : bypassOpen > 0 ? 0.65 : 1;
  const bypassOpacity = bypassOpen <= 0 ? 0 : bypassOpen >= 100 ? 1 : 0.35 + bypassOpen / 150;
  const tap = config.tap_actions!;
  const moreInfoLabel =
    hass.localize?.("ui.panel.lovelace.cards.show_more_info") ??
    "Show more information";

  return html`
    ${renderAlertButton(model, handlers)}
    ${renderAlertPopup(model, handlers)}
    ${config.show_title ? html`<p class="title">${config.title}</p>` : nothing}

    <div class="container">
      ${renderFanPopup(model, handlers)}

      <div class="main-stage">
        <div class="canvas-wrap">
          <svg class="unit-svg" viewBox=${SVG_VIEW_BOX} role="img" aria-label="Atrea aMotion ventilation scheme">
                <g class="background-layer">
                  <rect class="unit-frame" x="40" y="60" width="920" height="480" rx="18"></rect>
                  <g class="side-decor outside" transform="translate(50 240) scale(0.4)">
                    <path d="M200 176c3 28-28 26-47 24-16-1.9-28-14-40-24-13 19-41 23-61 13-34-30-11-42-15-55-15-12-31-24-33-41 1.7-17 20-25 34-27-3.7-10-4.1-22 2.6-31 15-21 50-11 67-3.4 2.5.27 6.9 5.5 7.8 3.2 2.4-13 15-20 27-24 25-6.9 71-1.5 68 28-1.2 12-9.4 23-20 28 17-.98 54 10 49 29-3.8 18-21 15-33 19 17 17 34 33 19 55-6.6 7.5-18 6.4-27 7z"></path>
                    <path d="M122 64v.1c-17 .93-31 5.1-43 17l.005.005c-5 6.6-9.2 13-9.2 22l-.1.1c.92 9.2 6.7 14 13 21l5.2-4.6c-4.2-4.9-9.9-8.7-11-15-.58-7.4 3.2-14 7.3-19l-.001-.002c11-13 23-14 38-15zm44 43-4.3 5.5-.1.5c9.2 6.3 14 14 15 25 1.2 13-3.8 21-14 25l2 6.7c5.3-1.5 10-5 13-8.4 5.3-6.9 6-16 5.5-23-.19-2-.6-4-1-5.9h-.001c-2.4-10-8.6-19-16-24zm-60 70v14c6.1 5.5 9.3 12 10 20 1.5 11 6 16 12 26 2.4-7.3 4.4-15 6.5-22h.001v-.001c1.7-7.2 5.7-12 9.3-17l-11-8.6-.1.1c-2.1 2.8-4.5 4.9-6.4 7.2-2.6-5.6-5.9-12-9.6-15-3.5-3-6.2-4.7-11-4.7z"></path>
                    <path d="m87 189-8.1 11c13 13 21 22 21 39-6.3 38-25 76-42 102 12-3.6 21-6.6 31-7.5 2.2-.011 2.4.81 3.5 2.5 1.8 4.8 2.4 10 3.4 15 5.9-5.3 12-9.8 18-15 5.4-4.1 9.7-5 16-5v-.001c12 2.9 23 7.2 35 11-7.3-18-15-38-16-56 .52-14 .91-26 2.3-40 1.6-7.8 8.3-36 17-38l1.1-14c-3.5-.37-7.3.73-9.9 2-9.5 5.9-12 17-16 25l.011.005c-3.2 7.3-5.2 16-6.1 22-1.1 12-2 24-2.5 35 .7 14 2.7 29 6.7 40-7.5-2.6-17-2.9-24-1.1-5.2 1.8-9.2 4.7-14 7.9-1.3-2.3-3-4.4-5.3-5.8-3.5-1.4-7.4-1.7-11-1.1 4.6-9 8.7-18 12-28 4.8-13 9-26 12-40l.17.039c5.6-27-2.4-46-25-63z"></path>
                    <path d="M170 0c-10 .055-20 1.5-30 4-11 3.8-22 11-27 21-15-5.3-25-9.4-40-9.9-2-.1-4-.1-6-.1-13-.35-25 5.7-31 16-5.7 9.5-6.8 19-4.7 29-14 4.3-26 12-31 25-2 21 11 39 27 49-2.6 3.6-3.9 7.3-4.3 12-1 18 11 38 23 46 11 6.7 22 9.6 34 9.1v-.003c13-1.7 26-5.5 35-16l4.2 3.9c17 15 38 20 61 18 14-2.1 26-7.3 28-22 .1-.99.1-2 .1-3 13-.86 23-3.9 29-16 5.1-11 5.2-18 .8-28-3.9-7.3-10-14-15-19 15-2.6 26-15 26-24 .12-1.6.14-3.5.004-5-6.3-15-24-25-39-29 5.6-7.2 8.7-14 9.2-23h.1c.04-1.2-.034-2.4-.1-3.6-.59-7.2-3-12-7.3-17-8.3-9.9-20-14-32-15-3.5-.29-6.9-.43-10-.41zm-1.5 14c2.1-.01 4.2.041 6.3.14 13 .19 29 6.4 31 20 .059.73.1 1.3-.005 2.1h.001c-3.4 24-30 30-50 39l-12 5.8 18-3.1c24-4.4 41-9.4 62 1.5 6.8 4.2 13 8.6 10 17-7.7 9-28 11-40 14 9 8.2 19 17 26 26 7.5 8.4 6.9 21 1.2 29-9.4 5.3-20 4.1-30 4.1 2.1 8.2 3.7 18-3.8 23-23 8.3-43 1.2-60-13-5-4.1-9.7-8.2-15-12-7.4 12-20 20-34 22v.006c-8.7.62-16-1.4-24-5.6-12-7.1-19-22-19-34 .29-3.7 3.7-6.9 6.2-7.8l27-7.3-27-6.2-.006.02-.094-.02c-10-4.4-21-12-26-22-12-22 11-30 32-33-2.2-8.2-6-18-4.2-26 3-11 8.5-16 20-17 23-1.3 40 5.6 57 19 1.3-7.2.89-14 5.7-20l1.1-1.3c11-9.1 25-12 40-12z"></path>
                  </g>
                  <path class="side-decor inside" d="M95 24 62 3 9 38h8v55.5h90V38h9.5l-20-13V6h-1.3z" transform="translate(835 255)"></path>
                  <path class="unit-outline" d=${flowPaths.unitOutline}></path>
                  <path class="exchanger-outline" d=${flowPaths.exchangerOutline}></path>
                </g>

                <g class="duct-layer">
                  <path class="duct supply" d=${flowPaths.supplyMain}></path>
                  <path class="duct extract" d=${flowPaths.extractMain}></path>
                  <path class=${bypassClosed ? "duct bypass is-closed" : "duct bypass"} d=${flowPaths.bypassInner}></path>
                </g>

                <g class="flow-layer">
                  <path class="flow supply" style=${`opacity:${mainOpacity}; --flow-duration:${flowAnimationDuration(model.fans.supply.speedPercent)};`} d=${flowPaths.supplyMain}></path>
                  <path class="flow extract reverse" style=${`opacity:${mainOpacity}; --flow-duration:${flowAnimationDuration(model.fans.extract.speedPercent)};`} d=${flowPaths.extractMain}></path>
                  <path class="flow bypass" style=${`opacity:${bypassOpacity}; --flow-duration:${flowAnimationDuration(model.fans.supply.speedPercent)};`} d=${flowPaths.bypassInner}></path>
                </g>

                <g class="component-layer">
                  ${renderFan("Extract fan", model.fans.extract, fanCenters.extract.x, fanCenters.extract.y, () => handleEntityTap(hass, tap.extract_fan, model.fans.extract.speedEntity))}
                  ${renderFan("Supply fan", model.fans.supply, fanCenters.supply.x, fanCenters.supply.y, () => handleEntityTap(hass, tap.supply_fan, model.fans.supply.speedEntity))}
                  ${renderDamper("ODA", model.dampers.oda, damperAnchors.oda.x, damperAnchors.oda.y, false, () => handleEntityTap(hass, tap.oda_damper, model.dampers.oda.entity))}
                  ${renderDamper("ETA", model.dampers.eta, damperAnchors.eta.x, damperAnchors.eta.y, false, () => handleEntityTap(hass, tap.eta_damper, model.dampers.eta.entity))}
                  ${renderFilter(
                    model.filters.oda,
                    flowPaths.filterLeft,
                    [ "m 357,361 10,-10", "m 345.5,349.5 10,-10", "m 334,338 10,-10", "m 322.5,326.5 10,-10", "m 391.5,395.5 10,-10", "m 380,384 10,-10", "m 368.5,372.5 10,-10" ],
                    () => handleEntityTap(hass, tap.oda_filter, model.filters.oda.statusEntity ?? model.filters.oda.lifeEntity),
                  )}
                  ${renderFilter(
                    model.filters.eta,
                    flowPaths.filterRight,
                    [ "m 357,361 10,-10", "m 345.5,349.5 10,-10", "m 334,338 10,-10", "m 322.5,326.5 10,-10", "m 391.5,395.5 10,-10", "m 380,384 10,-10", "m 368.5,372.5 10,-10" ],
                    () => handleEntityTap(hass, tap.eta_filter, model.filters.eta.statusEntity ?? model.filters.eta.lifeEntity),
                  )}
                </g>

                <g class="overlay-layer">
                  ${renderTemperatureBadge("EHA", model.temperatures.eha, temperatureAnchors.eha.x, temperatureAnchors.eha.y, () => handleEntityTap(hass, tap.eha_temperature, model.temperatures.eha.entity))}
                  ${renderTemperatureBadge("ODA", model.temperatures.oda, temperatureAnchors.oda.x, temperatureAnchors.oda.y, () => handleEntityTap(hass, tap.oda_temperature, model.temperatures.oda.entity))}
                  ${renderTemperatureBadge("SUP", model.temperatures.sup, temperatureAnchors.sup.x, temperatureAnchors.sup.y, () => handleEntityTap(hass, tap.sup_temperature, model.temperatures.sup.entity))}
                  ${renderTemperatureBadge("ETA", model.temperatures.eta, temperatureAnchors.eta.x, temperatureAnchors.eta.y, () => handleEntityTap(hass, tap.eta_temperature, model.temperatures.eta.entity))}

                  ${layout.show_power
                    ? svg`
                        <g class="metric-badge" transform="translate(795, 320)">
                          <rect x="-82" y="-22" width="164" height="44" rx="10"></rect>
                          <text x="0" y="6" class="badge-value small">${formatValueWithUnit(model.fans.supply.power, model.fans.supply.powerUnit, 0)}</text>
                        </g>
                        <g class="metric-badge" transform="translate(205, 320)">
                          <rect x="-82" y="-22" width="164" height="44" rx="10"></rect>
                          <text x="0" y="6" class="badge-value small">${formatValueWithUnit(model.fans.extract.power, model.fans.extract.powerUnit, 0)}</text>
                        </g>
                      `
                    : nothing}

                  <g class="port-labels">
                    <circle cx="170" cy="190" r="30" class="port-dot eha"></circle>
                    <circle cx="170" cy="410" r="30" class="port-dot oda"></circle>
                    <circle cx="830" cy="190" r="30" class="port-dot sup"></circle>
                    <circle cx="830" cy="410" r="30" class="port-dot eta"></circle>
                    <text x="170" y="190">EHA</text>
                    <text x="170" y="410">ODA</text>
                    <text x="830" y="190">SUP</text>
                    <text x="830" y="410">ETA</text>
                  </g>
                </g>
              </svg>
          </div>
        </div>
      </div>

      <ha-icon-button
        class="more-info"
        .label=${moreInfoLabel}
        .title=${moreInfoLabel}
        @click=${handlers.onOpenMoreInfo}
      >
        <ha-svg-icon .path=${mdiDotsVertical}></ha-svg-icon>
      </ha-icon-button>

    ${renderCardFeatures(hass, model, handlers)}

    ${model.availability !== "full"
      ? html`<div class="availability-note">Partial telemetry: card remains active, but some data is unavailable.</div>`
      : nothing}
  `;
}
