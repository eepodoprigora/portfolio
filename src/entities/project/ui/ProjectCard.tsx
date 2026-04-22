import Image from "next/image";
import classNames from "classnames";
import { IProject } from "../model";

type RawProps = IProject &
  React.HTMLAttributes<HTMLElement> & {
    setSlideRef?: (node: HTMLElement | null) => void;
    setMediaRef?: (node: HTMLDivElement | null) => void;
    active?: boolean;
  };

export const ProjectCard = ({
  href,
  setSlideRef,
  setMediaRef,
  name,
  category,
  summary,
  previewImg,
  active,
  className,
  ...props
}: RawProps) => {
  return (
    <article
      {...props}
      ref={setSlideRef}
      className={classNames("project-card", className, {
        "project-card--active": active,
      })}>
      <div className="project-card__inner">
        <div ref={setMediaRef} className="project-card__media">
          <div className="project-card__image-container">
            <Image
              className="project-card__image"
              src={previewImg.src}
              alt={name}
              fill
              draggable={false}
            />
          </div>
        </div>

        <div className="project-card__content">
          {category && <p className="project-card__category">{category}</p>}
          <h3 className="project-card__title h3">{name}</h3>
          {summary && <p className="project-card__summary">{summary}</p>}
        </div>
      </div>

      <a
        className="project-card__link"
        href={href}
        aria-label={name}
        target="_blank"
        rel="noreferrer"
      />
    </article>
  );
};
