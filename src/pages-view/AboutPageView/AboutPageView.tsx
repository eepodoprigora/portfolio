import { useMemo, useRef } from "react";
import {
  Directions,
  DirectionsRawProps,
  Hero,
  HeroRawProps,
  Intro,
  IntroRawProps,
} from "./sections";
import { useHeaderColorObserver } from "@/shared/lib/use-header-color";
import { DEFAULT_HEADER_CLASS, DARK_HEADER_CLASS } from "@/shared/сonfig/const";

export type RawProps = {
  heroSectionData: HeroRawProps;
  introSectionData: IntroRawProps;
  directionsSectionData: DirectionsRawProps;
};

const AboutPageView = ({
  heroSectionData,
  introSectionData,
  directionsSectionData,
}: RawProps) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const directionsRef = useRef<HTMLDivElement | null>(null);
  const contactsRef = useRef<HTMLElement | null>(null);

  const sectionRefs = useMemo(() => [heroRef, introRef, contactsRef], []);

  useHeaderColorObserver(sectionRefs, DEFAULT_HEADER_CLASS);

  return (
    <div className="about">
      <Hero
        ref={heroRef}
        {...heroSectionData}
        data-header-class={DARK_HEADER_CLASS}
      />

      <Intro
        ref={introRef}
        {...introSectionData}
        data-header-class={DEFAULT_HEADER_CLASS}
      />

      <Directions
        ref={directionsRef}
        {...directionsSectionData}
        data-header-class={DEFAULT_HEADER_CLASS}
      />
    </div>
  );
};

export default AboutPageView;
