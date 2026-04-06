import type { AtreaAmotionCardConfig, HomeAssistantState } from "./types";

function readUnitName(stateObj?: HomeAssistantState): string | undefined {
  if (typeof stateObj?.attributes.unit_name === "string" && stateObj.attributes.unit_name.trim()) {
    return stateObj.attributes.unit_name;
  }

  if (typeof stateObj?.attributes.friendly_name === "string" && stateObj.attributes.friendly_name.trim()) {
    return stateObj.attributes.friendly_name;
  }

  return undefined;
}

export function resolveTitle(config: AtreaAmotionCardConfig, stateObj?: HomeAssistantState): string | null {
  const unitName = readUnitName(stateObj);

  if (config.show_title === "none") {
    return null;
  }

  if (config.show_title === "custom") {
    return typeof config.title === "string" && config.title.trim()
      ? config.title
      : unitName ?? "Ventilation unit";
  }

  return unitName ?? "Ventilation unit";
}
