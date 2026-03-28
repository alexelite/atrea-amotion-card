import { describe, expect, it } from "vitest";
import { getDefaultTapActions, normalizeConfig } from "../src/config";
import type { AtreaAmotionCardConfig } from "../src/types";

const minimalConfig: AtreaAmotionCardConfig = {
  type: "custom:atrea-amotion-card",
  climate_entity: "climate.atrea",
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
    },
    dampers: {
      bypass: "sensor.bypass",
    },
  },
};

describe("normalizeConfig", () => {
  it("fills defaults for optional fields", () => {
    const normalized = normalizeConfig(minimalConfig);
    expect(normalized.title).toBe("Atrea aMotion");
    expect(normalized.layout?.fan_animation_max_rpm).toBe(1800);
    expect(normalized.tap_actions?.bypass).toBe("more-info");
  });

  it("throws when climate_entity is missing", () => {
    expect(() =>
      normalizeConfig({
        ...minimalConfig,
        climate_entity: "" as unknown as AtreaAmotionCardConfig["climate_entity"],
      }),
    ).toThrow(/climate_entity/);
  });

  it("exports default tap actions", () => {
    expect(getDefaultTapActions().mode).toBe("more-info");
  });
});
