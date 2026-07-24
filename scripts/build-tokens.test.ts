import { describe, expect, it } from "vitest";
import { buildCss, fluidClamp, loadTokenTree } from "./build-tokens";

const fixture = {
  colour: {
    night: {
      $type: "color",
      "950": { $value: "#0B0F14" },
    },
    coral: {
      $type: "color",
      "500": { $value: "#FF8D9B" },
    },
  },
  semantic: {
    accent: {
      $type: "color",
      default: {
        $value: "{colour.coral.500}",
        $extensions: { orba: { cssName: "accent" } },
      },
    },
  },
  type: {
    body: {
      $type: "orba-fluid-text",
      $value: { minPx: 16, maxPx: 16, weight: 400, trackingEm: 0, leading: 1.6 },
    },
    "display-2xl": {
      $type: "orba-fluid-text",
      $value: { minPx: 56, maxPx: 96, weight: 300, trackingEm: -0.05, leading: 1.05 },
    },
  },
  shadow: {
    $type: "shadow",
    raised: {
      $value: { color: "#00000059", offsetX: "0px", offsetY: "8px", blur: "24px", spread: "0px" },
    },
  },
  easing: {
    $type: "cubicBezier",
    spring: { $value: [0.34, 1.56, 0.64, 1] },
  },
  duration: {
    $type: "duration",
    base: { $value: "300ms" },
  },
};

describe("buildCss", () => {
  const { theme, root } = buildCss(fixture);

  it("flattens colour primitives to --color-* theme vars", () => {
    expect(theme["--color-night-950"]).toBe("#0B0F14");
  });

  it("resolves aliases and honours cssName extensions", () => {
    expect(theme["--color-accent"]).toBe("#FF8D9B");
  });

  it("emits fixed sizes as plain rem", () => {
    expect(theme["--text-body"]).toBe("1rem");
    expect(theme["--text-body--line-height"]).toBe("1.6");
    expect(theme["--text-body--font-weight"]).toBe("400");
  });

  it("emits fluid sizes as clamp() with viewport interpolation", () => {
    expect(theme["--text-display-2xl"]).toMatch(/^clamp\(3\.5rem,/);
    expect(theme["--text-display-2xl"]).toMatch(/vw/);
    expect(theme["--text-display-2xl"]).toMatch(/6rem\)$/);
    expect(theme["--text-display-2xl--letter-spacing"]).toBe("-0.05em");
  });

  it("serialises shadows", () => {
    expect(theme["--shadow-raised"]).toBe("0px 8px 24px 0px #00000059");
  });

  it("serialises cubic beziers as --ease-*", () => {
    expect(theme["--ease-spring"]).toBe("cubic-bezier(0.34, 1.56, 0.64, 1)");
  });

  it("emits durations under :root", () => {
    expect(root["--duration-base"]).toBe("300ms");
  });

  it("serialises gradients with alias stops under :root", () => {
    const { root: r } = buildCss({
      colour: {
        coral: { $type: "color", "500": { $value: "#FF8D9B" }, "700": { $value: "#B45B67" } },
        gradient: {
          accent: {
            $type: "orba-gradient",
            $value: { angle: 135, stops: ["{colour.coral.500}", "{colour.coral.700}"] },
          },
        },
      },
    });
    expect(r["--gradient-accent"]).toBe("linear-gradient(135deg, #FF8D9B, #B45B67)");
  });

  it("throws loudly on a missing alias target", () => {
    expect(() =>
      buildCss({
        semantic: {
          x: { $type: "color", y: { $value: "{colour.nope.1}" } },
        },
      }),
    ).toThrow(/alias/i);
  });
});

describe("fluidClamp", () => {
  it("interpolates between 390 and 1280 viewports", () => {
    // slope = (96-56)/(1280-390) = 0.044944 px/px → 4.4944vw
    // intercept = 56 - 0.044944*390 = 38.4719px → 2.4045rem
    expect(fluidClamp(56, 96)).toBe("clamp(3.5rem, 2.4045rem + 4.4944vw, 6rem)");
  });
});

describe("loadTokenTree", () => {
  it("merges the real token files and resolves the real accent", () => {
    const tree = loadTokenTree("tokens");
    const { theme } = buildCss(tree);
    expect(theme["--color-accent"]).toBe("#FF8D9B");
    expect(theme["--color-bg"]).toBe("#0B0F14");
    expect(theme["--radius-2xl"]).toBe("32px");
  });
});
