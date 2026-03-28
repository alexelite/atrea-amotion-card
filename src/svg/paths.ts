export const SVG_VIEW_BOX = "0 0 1000 620";

export const flowPaths = {
  supplyMain: "M 40 410 h 268 l 64 -64 m 257 -92 64 -64 h 267",
  extractMain: "M 40 190 h 267 l 90 90 L 563 280 693 410 h 267",
  unitOutline: "M 165.5 510 V 90 h 670 v 420 h -670",
  bypassInner: "M 372 346 l 26 -26 165 0 65 -65",
  exchangerOutline: "M 418 208 l -92 92 92 92 h 165 l 92 -92 -92 -92 z",
  filterLeft: "M 413 397 403 407 311 315 l 10 -10 z",
  filterRight: "M 588 397 598 407 690 315 680 305 Z",
};

export const fanCenters = {
  supply: { x: 745, y: 190 },
  extract: { x: 255, y: 190 },
};

export const temperatureAnchors = {
  eha: { x: 105, y: 135 },
  oda: { x: 105, y: 485 },
  sup: { x: 895, y: 135 },
  eta: { x: 895, y: 485 },
};

export const damperAnchors = {
  oda: { x: 95, y: 410 },
  eta: { x: 905, y: 410 },
  bypass: { x: 500, y: 198 },
};
