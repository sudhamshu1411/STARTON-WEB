import { GrainGradient, grainGradientPresets } from "@paper-design/shaders-react";

export function GradientBackground({ isDark = true }) {
  return (
    <div className="absolute inset-0 -z-10">
      <GrainGradient
        {...grainGradientPresets[0].params}
        colorBack={isDark ? grainGradientPresets[0].params.colorBack : "#ffffff"}
        noise={isDark ? grainGradientPresets[0].params.noise : 0.6}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
