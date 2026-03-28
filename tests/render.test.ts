import { fixture, html } from "@open-wc/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/atrea-amotion-card";
import type { AtreaAmotionCard } from "../src/atrea-amotion-card";
import type { AtreaAmotionCardConfig, HomeAssistant } from "../src/types";

const config: AtreaAmotionCardConfig = {
  type: "custom:atrea-amotion-card",
  title: "Ventilation",
  climate_entity: "climate.hrv",
  bypass_select: "select.bypass_mode",
  filter_reset_button: "button.reset_filters",
  entities: {
    temperatures: {
      oda: "sensor.oda",
      eta: "sensor.eta",
      sup: "sensor.sup",
      eha: "sensor.eha",
    },
    fans: {
      supply_speed: "sensor.supply_speed",
      extract_speed: "sensor.extract_speed",
      supply_airflow: "sensor.supply_airflow",
      extract_airflow: "sensor.extract_airflow",
    },
    dampers: {
      bypass: "sensor.bypass",
      oda: "binary_sensor.oda_damper",
      eta: "binary_sensor.eta_damper",
    },
    filters: {
      oda: "binary_sensor.oda_filter",
      eta: "binary_sensor.eta_filter",
    },
    mode: {
      current: "sensor.mode",
      select: "select.mode",
    },
  },
};

const hass: HomeAssistant = {
  states: {
    "climate.hrv": {
      entity_id: "climate.hrv",
      state: "auto",
      attributes: {
        unit_name: "Atrea Duplex 380",
        friendly_name: "Unit HRV",
        current_temperature: 19.8,
        temperature: 21,
        target_temp_step: 0.5,
        min_temp: 7,
        max_temp: 35,
        outside_air_temperature: 4.1,
        extract_air_temperature: 22.4,
        supply_air_temperature: 18.6,
        exhaust_air_temperature: 14.3,
        supply_fan_speed_percent: 67,
        extract_fan_speed_percent: 54,
        bypass_position_percent: 100,
        oda_damper_percent: 100,
        eta_damper_percent: 0,
        current_mode: "standby",
        preset_mode: "Interval",
        fan_mode: "67",
        filter_days_remaining: 12,
        hvac_modes: ["off", "auto"],
        preset_modes: ["Standby", "Interval", "Ventilation only", "Night cooling", "Disbalance"],
        fan_modes: ["0", "30", "50", "67", "100"],
        temperature_unit: "°C",
        airflow_unit: "m3/h",
      },
    },
    "sensor.oda": { entity_id: "sensor.oda", state: "4.1", attributes: { unit_of_measurement: "°C" } },
    "sensor.eta": { entity_id: "sensor.eta", state: "22.4", attributes: { unit_of_measurement: "°C" } },
    "sensor.sup": { entity_id: "sensor.sup", state: "18.6", attributes: { unit_of_measurement: "°C" } },
    "sensor.eha": { entity_id: "sensor.eha", state: "14.3", attributes: { unit_of_measurement: "°C" } },
    "sensor.supply_speed": { entity_id: "sensor.supply_speed", state: "67", attributes: { unit_of_measurement: "%" } },
    "sensor.extract_speed": { entity_id: "sensor.extract_speed", state: "54", attributes: { unit_of_measurement: "%" } },
    "sensor.supply_airflow": { entity_id: "sensor.supply_airflow", state: "220", attributes: { unit_of_measurement: "m3/h" } },
    "sensor.extract_airflow": { entity_id: "sensor.extract_airflow", state: "210", attributes: { unit_of_measurement: "m3/h" } },
    "sensor.bypass": { entity_id: "sensor.bypass", state: "100", attributes: { unit_of_measurement: "%" } },
    "binary_sensor.oda_damper": { entity_id: "binary_sensor.oda_damper", state: "on", attributes: {} },
    "binary_sensor.eta_damper": { entity_id: "binary_sensor.eta_damper", state: "off", attributes: {} },
    "binary_sensor.oda_filter": { entity_id: "binary_sensor.oda_filter", state: "off", attributes: {} },
    "binary_sensor.eta_filter": { entity_id: "binary_sensor.eta_filter", state: "on", attributes: {} },
    "sensor.mode": { entity_id: "sensor.mode", state: "boost", attributes: {} },
    "select.mode": { entity_id: "select.mode", state: "boost", attributes: { options: ["away", "comfort", "boost"] } },
    "select.bypass_mode": { entity_id: "select.bypass_mode", state: "auto", attributes: { options: ["auto", "recovery", "open"] } },
    "button.reset_filters": { entity_id: "button.reset_filters", state: "unknown", attributes: {} },
  },
  callService: vi.fn(async () => undefined),
  dispatchEvent: () => true,
};

describe("AtreaAmotionCard", () => {
  beforeEach(() => {
    vi.mocked(hass.callService).mockClear();
  });

  it("renders an SVG schematic with official card-features div structure", async () => {
    const element = await fixture<AtreaAmotionCard>(html`<atrea-amotion-card></atrea-amotion-card>`);
    element.setConfig(config);
    element.hass = hass;
    await element.updateComplete;

    const shadow = element.shadowRoot;
    const card = shadow?.querySelector("ha-card");
    const features = Array.from(shadow?.querySelectorAll(".official-card-features .official-card-feature") ?? []);
    const actionOptions = Array.from(shadow?.querySelectorAll<HTMLElement>(".official-control-select .official-option") ?? []);
    expect(shadow?.querySelector("svg")).toBeTruthy();
    expect(card?.classList.contains("type-custom-atrea-amotion-card")).toBe(true);
    expect(card?.classList.contains("theme-auto")).toBe(true);
    expect(card?.classList.contains("is-compact")).toBe(false);
    expect(shadow?.querySelector(".more-info")).toBeTruthy();
    expect(shadow?.querySelector(".title")?.textContent).toContain("Ventilation");
    expect(shadow?.querySelector(".container .main-stage")).toBeTruthy();
    expect(shadow?.querySelector(".main-stage .canvas-wrap")).toBeTruthy();
    expect(shadow?.querySelector(".official-card-features")).toBeTruthy();
    expect(features).toHaveLength(1);
    expect(actionOptions).toHaveLength(6);
    expect(actionOptions.find((option) => option.classList.contains("selected"))?.getAttribute("aria-label")).toBe("Interval");
    expect(actionOptions.find((option) => option.getAttribute("aria-label") === "Fan")?.classList.contains("disabled")).toBe(false);
    expect(shadow?.querySelector("ha-dialog")).toBeFalsy();
    expect(shadow?.querySelector(".fan-popup")).toBeFalsy();
  });

  it("opens a native-first more-info dialog with climate controls", async () => {
    const element = await fixture<AtreaAmotionCard>(html`<atrea-amotion-card></atrea-amotion-card>`);
    element.setConfig(config);
    element.hass = hass;
    await element.updateComplete;

    const kebab = element.shadowRoot?.querySelector<HTMLElement>(".more-info");
    kebab?.click();
    await element.updateComplete;

    const moreInfo = element.shadowRoot?.querySelector<HTMLElement>("atrea-more-info-climate");
    const selectMenus = Array.from(moreInfo?.shadowRoot?.querySelectorAll("ha-control-select-menu") ?? []);
    const labels = selectMenus.map((menu) => (menu as { label?: string }).label);

    expect(element.shadowRoot?.querySelector("ha-dialog")).toBeTruthy();
    expect(element.shadowRoot?.textContent).toContain("Atrea Duplex 380");
    expect(moreInfo).toBeTruthy();
    expect(moreInfo?.shadowRoot?.textContent).toContain("Current temperature");
    expect(moreInfo?.shadowRoot?.querySelector("ha-state-control-climate-temperature")).toBeTruthy();
    expect(selectMenus.length).toBe(2);
    expect(labels).toContain("Mode");
    expect(labels).toContain("Fan mode");
    expect(element.shadowRoot?.textContent).not.toContain("Coming soon");
  });

  it("opens the fan popup and maps fan percentage controls to climate.set_fan_mode", async () => {
    const element = await fixture<AtreaAmotionCard>(html`<atrea-amotion-card></atrea-amotion-card>`);
    element.setConfig(config);
    element.hass = hass;
    await element.updateComplete;

    element.shadowRoot?.querySelector<HTMLElement>("#action-standby")?.click();
    element.shadowRoot?.querySelector<HTMLElement>("#action-fan")?.click();
    await element.updateComplete;

    const slider = element.shadowRoot?.querySelector<HTMLInputElement>(".fan-slider");
    slider!.value = "49";
    slider?.dispatchEvent(new Event("input"));
    slider?.dispatchEvent(new Event("change"));
    await element.updateComplete;

    element.shadowRoot?.querySelector<HTMLElement>(".fan-step-button[aria-label='Increase fan speed']")?.click();

    expect(element.shadowRoot?.querySelectorAll(".official-card-features .official-card-feature").length).toBe(1);
    expect(element.shadowRoot?.querySelector(".fan-popup")).toBeTruthy();
    expect(element.shadowRoot?.textContent).toContain("50%");
    expect(hass.callService).toHaveBeenCalledTimes(3);
    expect(hass.callService).toHaveBeenCalledWith("climate", "set_preset_mode", {
      entity_id: "climate.hrv",
      preset_mode: "Standby",
    });
    expect(hass.callService).toHaveBeenCalledWith("climate", "set_fan_mode", {
      entity_id: "climate.hrv",
      fan_mode: "50",
    });
    expect(hass.callService).toHaveBeenCalledWith("climate", "set_fan_mode", {
      entity_id: "climate.hrv",
      fan_mode: "67",
    });
  });

  it("closes the fan popup on outside click and after timeout", async () => {
    vi.useFakeTimers();
    try {
      const element = await fixture<AtreaAmotionCard>(html`<atrea-amotion-card></atrea-amotion-card>`);
      element.setConfig(config);
      element.hass = hass;
      await element.updateComplete;

      element.shadowRoot?.querySelector<HTMLElement>("#action-fan")?.click();
      await element.updateComplete;
      expect(element.shadowRoot?.querySelector(".fan-popup")).toBeTruthy();

      element.shadowRoot?.querySelector<HTMLElement>(".fan-popup-shell")?.click();
      await element.updateComplete;
      expect(element.shadowRoot?.querySelector(".fan-popup")).toBeFalsy();

      element.shadowRoot?.querySelector<HTMLElement>("#action-fan")?.click();
      await element.updateComplete;
      expect(element.shadowRoot?.querySelector(".fan-popup")).toBeTruthy();

      vi.advanceTimersByTime(8000);
      await element.updateComplete;
      expect(element.shadowRoot?.querySelector(".fan-popup")).toBeFalsy();
    } finally {
      vi.useRealTimers();
    }
  });

  it("degrades gracefully when optional entities are missing", async () => {
    const element = await fixture<AtreaAmotionCard>(html`<atrea-amotion-card></atrea-amotion-card>`);
    element.setConfig({
      ...config,
      entities: {
        ...config.entities,
        filters: undefined,
        mode: undefined,
        temperatures: undefined,
        fans: undefined,
        dampers: undefined,
      },
    });
    element.hass = hass;
    await element.updateComplete;

    element.shadowRoot?.querySelector<HTMLElement>(".more-info")?.click();
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector("svg")).toBeTruthy();
    expect(element.shadowRoot?.textContent).toContain("Atrea Duplex 380");
    expect(element.shadowRoot?.querySelector("ha-dialog")).toBeTruthy();
    expect(element.shadowRoot?.querySelector("atrea-more-info-climate")).toBeTruthy();
  });
});
