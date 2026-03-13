import React, { useMemo, useRef } from "react";
import Image from "next/image";
import classNames from "classnames";
import { format2 } from "@/shared/lib/strings";
import { useProjectsSlider, useThreeProjectsOverlay } from "../model";

type Project = {
  id: string;
  previewImg: { src: string };
};

type Props = React.HTMLAttributes<HTMLElement> & {
  projects: Project[];
};

export const ProjectsSlider = ({ projects, className, ...props }: Props) => {
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  const slidesRef = useRef<HTMLDivElement[]>([]);

  const { progress, currentIndex } = useProjectsSlider({
    rootRef,
    slidesRef,
    slidesCount: projects.length,
  });

  const imageUrls = useMemo(
    () =>
      projects.map((p) => p.previewImg?.src).filter((s): s is string => !!s),
    [projects],
  );

  useThreeProjectsOverlay({
    hostRef,
    mediaRefs: slidesRef,
    imageUrls,
    progressPx: progress,
  });

  const setSlideRef = (index: number) => (node: HTMLDivElement | null) => {
    if (!node) return;
    slidesRef.current[index] = node;
  };

  return (
    <section
      {...props}
      ref={rootRef}
      className={classNames("projects-slider", className)}>
      <div className="projects-slider__counter" aria-hidden="true">
        {format2(currentIndex + 1)}/{format2(projects.length)}
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
            <article key={project.id} className="projects-slider__slide">
              <div ref={setSlideRef(index)} className="projects-slider__media">
                <Image
                  className="projects-slider__image"
                  src={project.previewImg.src}
                  alt=""
                  fill
                  draggable={false}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
