import { RefObject } from "react";
import { IProject } from "../model";
import Image from "next/image";

type Props = IProject &
  React.HTMLAttributes<HTMLElement> & {
    ref?: RefObject<HTMLAnchorElement | null>;
  };

export const ProjectCard = ({ id, slug, name, previewImg, ...rest }: Props) => {
  return (
    <article {...rest} className="projects-slider__item">
      <a className="project-card" href={`/projects/${slug}`}>
        <div className="project-card__media">
          <Image
            className="project-card__img"
            src={previewImg.src}
            alt={name}
            width={350}
            height={500}
            loading="eager"
          />
        </div>
      </a>
    </article>
  );
};
