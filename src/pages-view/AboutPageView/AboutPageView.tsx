import { useMemo, useRef } from "react";
import {
  Directions,
  DirectionsRawProps,
  Hero,
  HeroRawProps,
  Intro,
  IntroRawProps,
  ContactsRawProps,
  Contacts,
} from "./sections";
import { useHeaderColorObserver } from "@/shared/lib/use-header-color";
import { DEFAULT_HEADER_CLASS, DARK_HEADER_CLASS } from "@/shared/сonfig/const";
import DefaultLayout from "@/shared/ui/DefaultLayout";

export type RawProps = {
  heroSectionData: HeroRawProps;
  introSectionData: IntroRawProps;
  directionsSectionData: DirectionsRawProps;
  contactsSectionData: ContactsRawProps;
};

const AboutPageView = ({
  heroSectionData,
  introSectionData,
  directionsSectionData,
  contactsSectionData,
}: RawProps) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const directionsRef = useRef<HTMLDivElement | null>(null);
  const contactsRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useMemo(() => [heroRef, introRef, contactsRef], []);

  useHeaderColorObserver(sectionRefs, DEFAULT_HEADER_CLASS);

  return (
    <DefaultLayout>
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

        <Contacts
          ref={contactsRef}
          {...contactsSectionData}
          data-header-class={DEFAULT_HEADER_CLASS}
        />
      </div>
    </DefaultLayout>
  );
};

export default AboutPageView;
