import React, { useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { useThreeProjectsOverlay } from "../model";
import { useSlider } from "@/shared/lib/use-slider";
import { AnimatedCounter } from "@/shared/ui/AnimatedCounter";
import { format2 } from "@/shared/lib/strings";
import { useAppReadyStore } from "@/shared/model/app-ready";
import { IProjectFlat, ProjectCard } from "@/entities/project";
import { useInView } from "motion/react";

export type RawProps = {
  projects: IProjectFlat[];
  scrollBtn: string;
};

type Props = React.HTMLAttributes<HTMLElement> & RawProps;

export const ProjectsSlider = ({
  projects,
  scrollBtn,
  className,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLElement[]>([]);
  const mediaRefs = useRef<HTMLDivElement[]>([]);
  const inView = useInView(rootRef);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const appReady = useAppReadyStore((s) => s.appReady);

  const { progress, currentIndex } = useSlider({
    rootRef,
    slidesRef,
    slidesCount: projects.length,
  });

  const imageUrls = useMemo(
    () =>
      projects
        .map((project) => project.previewImg?.src)
        .filter(Boolean) as string[],
    [projects],
  );

  useThreeProjectsOverlay({
    hostRef,
    mediaRefs,
    imageUrls,
    progressPx: progress,
  });

  const setSlideRef = (index: number) => (node: HTMLElement | null) => {
    if (!node) return;
    slidesRef.current[index] = node;
  };

  const setMediaRef = (index: number) => (node: HTMLDivElement | null) => {
    if (!node) return;
    mediaRefs.current[index] = node;
  };

  useEffect(() => {
    const hideScrollHint = () => {
      scrollHintRef.current?.classList.add("is-hidden");

      document.removeEventListener("scroll", hideScrollHint);
      document.removeEventListener("touchstart", hideScrollHint);
      document.removeEventListener("wheel", hideScrollHint);
    };

    document.addEventListener("scroll", hideScrollHint, {
      passive: true,
    });

    document.addEventListener("touchstart", hideScrollHint, {
      passive: true,
    });

    document.addEventListener("wheel", hideScrollHint, {
      passive: true,
    });

    return () => {
      document.removeEventListener("scroll", hideScrollHint);
      document.removeEventListener("touchstart", hideScrollHint);
      document.removeEventListener("wheel", hideScrollHint);
    };
  }, []);

  return (
    <section
      {...props}
      ref={rootRef}
      className={classNames("projects-slider", className, {
        "projects-slider--ready": inView && appReady,
      })}>
      <div className="projects-slider__counter" aria-hidden="true">
        <AnimatedCounter value={currentIndex + 1} digits={2} />
        <span className="projects-slider__counter-separator"> - </span>
        <span className="projects-slider__counter-total">
          {format2(projects.length)}
        </span>
      </div>

      <div ref={viewportRef} className="projects-slider__viewport">
        <div
          ref={hostRef}
          className="projects-slider__webgl"
          aria-hidden="true"
        />

        <div
          ref={trackRef}
          className="projects-slider__track"
          style={{ "--progress": `${progress}px` } as React.CSSProperties}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              setSlideRef={setSlideRef(index)}
              setMediaRef={setMediaRef(index)}
              active={index === currentIndex}
            />
          ))}
        </div>
        <div className="projects-slider__scroll text-s" ref={scrollHintRef}>
          {scrollBtn}
        </div>
      </div>
    </section>
  );
};
