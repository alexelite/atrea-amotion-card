import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    --atrea-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --atrea-surface: color-mix(in srgb, var(--atrea-bg) 94%, var(--primary-text-color) 6%);
    --atrea-panel: color-mix(in srgb, var(--atrea-bg) 88%, var(--primary-text-color) 12%);
    --atrea-border: rgba(34, 72, 128, 0.14);
    --atrea-text: var(--primary-text-color, #1f2a37);
    --atrea-muted: var(--secondary-text-color, #6b7280);
    --atrea-blue: #294a97;
    --atrea-gray-path: #b7b9bf;
    --atrea-danger: var(--error-color, #db4437);
    --atrea-warning: #e0a43a;
    --atrea-good: #67b929;
    --atrea-dial-start: color-mix(in srgb, var(--state-active-color, var(--atrea-blue)) 65%, #77b8ff);
    --atrea-dial-end: color-mix(in srgb, var(--state-active-color, var(--atrea-blue)) 25%, #ff7c7c);
    --atrea-feature-border-radius: var(--ha-border-radius-xl, var(--ha-border-radius-lg, 16px));
    --atrea-fan-fill: var(--atrea-surface);
    --atrea-fan-stroke: var(--atrea-blue);
    color: var(--atrea-text);
  }

  ha-card {
    position: relative;
    overflow: hidden;
    color: var(--atrea-text);
  }

  ha-card.theme-dark {
    --atrea-surface: color-mix(in srgb, var(--atrea-bg) 90%, var(--primary-text-color) 10%);
    --atrea-panel: color-mix(in srgb, var(--atrea-bg) 84%, var(--primary-text-color) 16%);
    --atrea-fan-fill: color-mix(in srgb, var(--atrea-surface) 82%, white 18%);
    --atrea-fan-stroke: color-mix(in srgb, white 76%, var(--state-icon-color, #9fb7ff) 24%);
  }

  ha-card.theme-light {
    --atrea-surface: color-mix(in srgb, var(--atrea-bg) 96%, var(--primary-text-color) 4%);
    --atrea-panel: color-mix(in srgb, var(--atrea-bg) 90%, var(--primary-text-color) 10%);
    --atrea-fan-fill: var(--atrea-surface);
    --atrea-fan-stroke: var(--atrea-blue);
  }

  ha-card.is-compact .container {
    padding: 8px 12px 12px;
  }

  ha-card.is-compact .official-card-features {
    padding: 8px 12px 0;
  }

  ha-card.is-compact .official-control-select .official-option {
    min-width: 44px;
    min-height: 44px;
  }

  .title {
    width: 100%;
    margin: 0;
    padding: 8px 30px;
    font-size: var(--ha-font-size-l, 24px);
    line-height: var(--ha-line-height-expanded, 32px);
    font-weight: 400;
    color: var(--atrea-text);
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: none;
  }

  .container {
    position: relative;
    padding: 8px 16px 16px;
  }

  .main-stage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
  }

  .official-card-features {
    --feature-color: var(--state-icon-color);
    --feature-height: 42px;
    --feature-button-spacing: 12px;
    pointer-events: none;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--ha-card-feature-gap, 12px);
    width: 100%;
    box-sizing: border-box;
    justify-content: space-evenly;
    flex: 0 0 auto;
    padding: 0 12px 12px;
    z-index: 2;
  }

  .official-card-feature {
    display: block;
  }

  .fan-popup-shell {
    position: absolute;
    z-index: 4;
    inset: 0;
  }

  .fan-popup-backdrop {
    position: absolute;
    inset: 0;
    background: transparent;
  }

  .fan-popup {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 44px;
    padding: 12px;
    border-radius: var(--atrea-feature-border-radius);
    background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #fff)) 88%, var(--atrea-panel) 12%);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 12%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
  }

  .alert-popup-shell {
    position: absolute;
    z-index: 4;
    inset: 0;
  }

  .alert-popup-backdrop {
    position: absolute;
    inset: 0;
    background: transparent;
  }

  .alert-popup {
    position: absolute;
    left: 12px;
    right: 12px;
    top: 44px;
    padding: 12px 14px;
    border-radius: var(--atrea-feature-border-radius);
    background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #fff)) 92%, var(--atrea-panel) 8%);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 12%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
  }

  .alert-popup.is-warning {
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--atrea-warning) 28%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
  }

  .alert-popup.is-fault {
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--atrea-danger) 28%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
  }

  .alert-popup-header {
    margin-bottom: 8px;
  }

  .alert-popup-title {
    color: var(--primary-text-color);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .alert-popup-body {
    display: grid;
    gap: 8px;
  }

  .alert-popup-text {
    margin: 0;
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    line-height: 1.35;
  }

  .fan-popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .fan-popup-title {
    color: var(--secondary-text-color);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .fan-popup-value {
    color: var(--primary-text-color);
    font-size: 1rem;
    font-weight: 600;
  }

  .fan-popup-controls {
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr) 52px;
    align-items: center;
    gap: 12px;
  }

  .fan-slider-wrap {
    min-width: 0;
  }

  .fan-step-button {
    inline-size: 52px;
    block-size: 52px;
    border: none;
    border-radius: calc(var(--atrea-feature-border-radius) - 4px);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    color: var(--state-icon-color, var(--atrea-blue));
    font: inherit;
    font-size: 1.9rem;
    line-height: 1;
    cursor: pointer;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 16%, transparent);
    transition:
      transform 140ms ease,
      box-shadow 140ms ease,
      color 140ms ease;
  }

  .fan-step-button:hover,
  .fan-step-button:focus-visible {
    color: var(--primary-text-color);
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.14),
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 24%, transparent);
  }

  .fan-step-button:active {
    transform: translateY(1px);
  }

  .fan-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: transparent;
    margin: 0;
    width: 100%;
    margin: 0;
    accent-color: var(--state-icon-color, var(--atrea-blue));
  }

  .fan-slider::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 20%, transparent);
  }

  .fan-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    inline-size: 22px;
    block-size: 22px;
    margin-top: -7px;
    border: none;
    border-radius: 50%;
    background: var(--state-icon-color, var(--atrea-blue));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }

  .fan-slider::-moz-range-track {
    height: 8px;
    border: none;
    border-radius: 999px;
    background: color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 20%, transparent);
  }

  .fan-slider::-moz-range-thumb {
    inline-size: 22px;
    block-size: 22px;
    border: none;
    border-radius: 50%;
    background: var(--state-icon-color, var(--atrea-blue));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }

  .official-card-features > * {
    pointer-events: auto;
  }

  .official-control-select {
    --control-select-color: var(--feature-color);
    --control-select-padding: 4px;
    --control-select-thickness: var(--feature-height);
    --control-select-border-radius: var(--atrea-feature-border-radius);
    --control-select-button-border-radius: calc(var(--control-select-border-radius) - var(--control-select-padding));
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 0;
    width: 100%;
    height: var(--control-select-thickness);
    box-sizing: border-box;
    padding: var(--control-select-padding);
    border-radius: var(--control-select-border-radius);
    background: color-mix(
      in srgb,
      var(--disabled-color, var(--atrea-panel)) calc(var(--control-select-background-opacity, 0.2) * 100%),
      transparent
    );
  }

  .official-option {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1 1 0%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: var(--control-select-button-border-radius);
    color: var(--control-select-color);
    background: transparent;
    cursor: pointer;
    user-select: none;
    transition:
      background-color 180ms ease,
      color 180ms ease,
      box-shadow 180ms ease;
  }

  .official-option + .official-option {
    margin-inline-start: var(--control-select-padding);
  }

  .official-option.selected {
    color: var(--text-primary-color, var(--primary-text-color));
    background: color-mix(in srgb, var(--control-select-color) 100%, transparent);
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      inset 0 0 0 1px color-mix(in srgb, var(--control-select-color) 24%, transparent);
  }

  .official-option:not(.disabled):hover,
  .official-option:not(.disabled):focus-visible {
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--control-select-color) 24%, transparent);
  }

  .official-option.disabled {
    cursor: default;
    opacity: 0.9;
  }

  .official-option-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .official-option ha-svg-icon,
  .official-option svg {
    inline-size: var(--mdc-icon-size, 20px);
    block-size: var(--mdc-icon-size, 20px);
    fill: currentColor;
  }

  .more-info {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    inset-inline-end: 0;
    inset-inline-start: initial;
    border-radius: var(--ha-border-radius-pill, 999px);
    color: var(--secondary-text-color);
    direction: var(--direction);
    transition: color 140ms ease;
  }

  .alert-info {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    inset-inline-start: 0;
    inset-inline-end: initial;
    border-radius: var(--ha-border-radius-pill, 999px);
    color: var(--atrea-warning);
    direction: var(--direction);
    transition: color 140ms ease;
  }

  .alert-info.is-fault {
    color: var(--atrea-danger);
  }

  .alert-info:hover,
  .alert-info:focus-visible {
    color: var(--primary-text-color);
  }

  .more-info:hover,
  .more-info:focus-visible {
    color: var(--primary-text-color);
  }

  .more-info ha-svg-icon,
  .more-info svg {
    inline-size: 20px;
    block-size: 20px;
    fill: currentColor;
  }

  .mode-value,
  .mode-select {
    width: 100%;
    font: inherit;
    color: var(--atrea-text);
    background: var(--atrea-surface);
    border: 1px solid rgba(41, 74, 151, 0.14);
    border-radius: 10px;
    padding: 8px 10px;
  }

  .mode-group {
    display: grid;
    gap: 4px;
  }

  .mode-group-label {
    font-size: 0.72rem;
    color: var(--atrea-muted);
  }

  .canvas-wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 100%;
  }

  .unit-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .unit-frame {
    fill: var(--atrea-surface);
    stroke: var(--atrea-blue);
    stroke-opacity: 0.15;
    stroke-width: 1.5;
  }

  .unit-outline,
  .exchanger-outline {
    fill: none;
    stroke: var(--atrea-blue);
    stroke-width: 4;
    stroke-linecap: square;
    stroke-linejoin: round;
  }

  .center-title,
  .center-subtitle,
  .port-labels text,
  .badge-label,
  .badge-value,
  .component-label,
  .component-value {
    fill: var(--atrea-text);
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
  }

  .center-title {
    font-size: 18px;
    font-weight: 500;
    fill: var(--primary-text-color);
  }

  .center-title.small {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    fill: var(--secondary-text-color);
  }

  .center-subtitle,
  .component-value,
  .badge-label {
    font-size: 14px;
    font-weight: 400;
    fill: var(--secondary-text-color);
  }

  .badge-value {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.01em;
    fill: var(--primary-text-color);
  }

  .badge-value.temperature-only {
    font-size: 28px;
    font-weight: 500;
  }

  .fan-info text {
    fill: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    pointer-events: none;
  }

  .badge-value.small {
    font-size: 16px;
  }

  .duct,
  .flow {
    fill: none;
    stroke-width: 28;
    stroke-linecap: square;
    stroke-linejoin: round;
  }

  .duct {
    opacity: 1;
  }

  .duct.supply,
  .flow.supply {
    stroke: var(--atrea-blue);
  }

  .duct.extract,
  .flow.extract {
    stroke: var(--atrea-gray-path);
  }

  .duct.bypass {
    stroke: var(--atrea-surface);
    stroke-width: 18;
    opacity: 0;
  }

  .duct.bypass.is-closed {
    stroke: var(--atrea-blue);
    stroke-width: 28;
    opacity: 1;
  }

  .flow {
    stroke-dasharray: 14 12;
  }

  .flow.bypass {
    stroke: var(--atrea-blue);
    stroke-width: 16;
    stroke-dasharray: 12 14;
    stroke-linecap: butt;
  }

  .side-decor.outside {
    fill: var(--c-draw-10, #d9dada);
  }

  .side-decor.inside {
    fill: color-mix(in srgb, var(--atrea-surface) 86%, white 14%);
    stroke: color-mix(in srgb, var(--atrea-muted) 35%, transparent);
    stroke-width: 5;
  }

  .fan-shell {
    fill: var(--atrea-fan-fill);
    stroke: var(--atrea-fan-stroke);
    stroke-width: 2;
  }

  .fan-rotor {
    fill: none;
    stroke: var(--atrea-fan-stroke);
    stroke-width: 3;
  }

  .fan-core {
    fill: var(--atrea-fan-fill);
    stroke: var(--atrea-fan-stroke);
    stroke-width: 3;
  }

  .damper-ring {
    fill: var(--atrea-surface);
    stroke: var(--atrea-blue);
    stroke-width: 2;
  }

  .damper-blade {
    fill: var(--atrea-blue);
  }

  .temp-badge rect,
  .metric-badge rect {
    fill: var(--ha-card-background, var(--card-background-color, #fff));
    stroke: var(--divider-color, rgba(0, 0, 0, 0.12));
    stroke-width: 1;
    opacity: 0.96;
  }

  .filter-body {
    fill: color-mix(in srgb, var(--filter-color) calc(var(--filter-opacity, 0.7) * 100%), white);
    stroke: var(--filter-color);
    stroke-opacity: calc(var(--filter-opacity, 0.7) * 0.72);
    stroke-width: 1.25;
  }

  .filter-slat {
    fill: none;
    stroke: color-mix(in srgb, var(--filter-color) 80%, white);
    stroke-opacity: calc(var(--filter-opacity, 0.7) * 0.82);
    stroke-width: 1.25;
    stroke-linecap: round;
  }

  .filter-days {
    fill: var(--secondary-text-color);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
  }

  .filter.is-critical-pulse .filter-slat:last-of-type {
    animation: filter-pulse 1.6s ease-in-out infinite;
  }

  .badge,
  .fan-group,
  .damper,
  .filter {
    cursor: pointer;
  }

  .is-muted {
    opacity: 0.45;
  }

  .availability-note {
    padding: 8px 16px 16px;
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  ha-dialog {
    --mdc-dialog-min-width: min(620px, calc(100vw - 24px));
    --mdc-dialog-max-width: min(620px, calc(100vw - 24px));
  }

  .dialog-subtitle {
    color: var(--secondary-text-color);
    font-size: calc(var(--ha-font-size-s, 0.875rem) * 1.02);
    line-height: 1.15;
  }

  .dialog-header-title {
    display: grid;
    gap: 1px;
    padding-block: 0;
  }

  .dialog-title {
    font-size: calc(var(--ha-font-size-xl, 1.5rem) * 0.95);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.1;
  }

  .more-info-dialog-title {
    font-size: calc(var(--ha-font-size-xl, 1.5rem) * 0.95);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.1;
  }

  .dialog-icon-button {
    inline-size: 36px;
    block-size: 36px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .more-info-close {
    inline-size: 36px;
    block-size: 36px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .dialog-icon-button svg {
    inline-size: 22px;
    block-size: 22px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .dialog-content {
    color: var(--primary-text-color);
    padding: 0 8px 10px;
    display: grid;
    justify-items: center;
    align-content: start;
    gap: 10px;
  }

  .current {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 28px;
    justify-items: center;
    text-align: center;
    margin: 0;
    width: min(100%, 432px);
  }

  .current:not(.has-multiple) {
    grid-template-columns: minmax(0, 1fr);
  }

  .current div {
    display: grid;
    gap: 2px;
    justify-items: center;
  }

  .current p {
    margin: 0;
    color: var(--primary-text-color);
  }

  .current .label {
    opacity: 0.8;
    font-size: calc(var(--ha-font-size-s, 0.875rem) * 1.02);
    line-height: var(--ha-line-height-condensed, 1.2);
    letter-spacing: 0.02em;
  }

  .current .value {
    font-size: calc(var(--ha-font-size-xl, 1.5rem) * 0.92);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: var(--ha-line-height-condensed, 1.2);
  }

  .controls {
    display: grid;
    place-items: center;
    margin: 0;
    width: min(100%, 420px);
  }

  .main-control,
  .thermostat-dial-shell {
    display: grid;
    place-items: center;
    gap: 8px;
    width: 100%;
  }

  .dial-wrap,
  .thermostat-dial-stage {
    position: relative;
    inline-size: min(100%, 420px);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
  }

  .thermostat-dial-svg {
    inline-size: 100%;
    block-size: auto;
  }

  .dial-track,
  .dial-progress {
    fill: none;
    stroke-width: 16;
    stroke-linecap: round;
  }

  .dial-track {
    stroke: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
  }

  .dial-progress {
    stroke: url(#atreaDialGradient);
  }

  .dial-content {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    gap: 4px;
    text-align: center;
    padding: 88px;
  }

  .dial-setpoint {
    font-size: 4.35rem;
    font-weight: 500;
    line-height: 0.88;
    letter-spacing: -0.02em;
  }

  .dial-state {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .dial-current,
  .dial-state {
    color: var(--secondary-text-color);
  }

  .dial-current {
    font-size: 0.92rem;
  }

  .adjust-buttons,
  .dial-buttons {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: -10px;
  }

  .adjust-button {
    inline-size: 48px;
    block-size: 48px;
    border-radius: 50%;
    border: 1px solid var(--divider-color, rgba(41, 74, 151, 0.14));
    background: transparent;
    color: var(--atrea-text);
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 120ms ease, border-color 120ms ease;
  }

  .adjust-button svg {
    inline-size: 20px;
    block-size: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .adjust-button:hover {
    background: color-mix(in srgb, var(--state-active-color, var(--atrea-blue)) 8%, transparent);
  }

  .popup-select {
    width: 100%;
    font: inherit;
    color: var(--atrea-text);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border: 1px solid var(--divider-color, rgba(41, 74, 151, 0.14));
    border-radius: 14px;
    padding: 11px 14px;
  }

  .menu-icon {
    inline-size: 22px;
    block-size: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
  }

  .menu-icon svg {
    inline-size: 20px;
    block-size: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .control-menus {
    display: grid;
    gap: 10px;
    width: min(100%, 420px);
    margin-top: -4px;
    justify-self: center;
  }

  .control-menus ha-control-select-menu {
    margin-top: 0;
  }

  .port-labels text {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.04em;
    fill: var(--primary-text-color);
  }

  .port-dot {
    opacity: 1;
    stroke: var(--secondary-text-color);
    stroke-width: 1;
  }

  .port-dot.eha {
    fill: #b6732f;
  }

  .port-dot.oda {
    fill: #66b92f;
  }

  .port-dot.sup {
    fill: #96b0ec;
  }

  .port-dot.eta {
    fill: #f1df27;
  }

  .component-value.emphasis {
    fill: var(--atrea-text);
    font-weight: 600;
  }

  .align-start {
    text-anchor: start;
  }

  @keyframes flow-move {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -120;
    }
  }

  @keyframes filter-pulse {
    0%,
    100% {
      stroke-opacity: 0.55;
    }
    50% {
      stroke-opacity: 1;
    }
  }

  @media (max-width: 720px) {
    .title {
      padding: 8px 30px;
    }

    .container {
      padding: 8px 14px 14px;
    }

    .current {
      grid-template-columns: 1fr 1fr;
    }

    .dial-content {
      padding: 74px;
    }

    .dial-setpoint {
      font-size: 3.6rem;
    }
  }

  @media (max-width: 520px) {
    .official-card-features {
      padding: 0 10px 10px;
    }

    .current {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow {
      animation: none !important;
    }
  }
`;
