import { Composition } from "remotion";
import { BalkanVeilTeaser } from "./BalkanVeilTeaser";

export function RemotionRoot() {
  return (
    <Composition
      id="BalkanVeilTeaser"
      component={BalkanVeilTeaser}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
}
