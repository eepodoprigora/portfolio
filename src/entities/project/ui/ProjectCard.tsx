import Image from "next/image";
import classNames from "classnames";
import { IProject } from "../model";

type Props = IProject &
  React.HTMLAttributes<HTMLElement> & {
    setSlideRef?: (node: HTMLElement | null) => void;
    setMediaRef?: (node: HTMLDivElement | null) => void;
  };

export const ProjectCard = ({
  href,
  setSlideRef,
  setMediaRef,
  name,
  previewImg,
  className,
  ...props
}: Props) => {
  return (
    <article
      {...props}
      ref={setSlideRef}
      className={classNames("project-card", className)}>
      <div ref={setMediaRef} className="project-card__media">
        <Image
          className="project-card__image"
          src={previewImg.src}
          alt={name}
          fill
          draggable={false}
        />
      </div>

      <a
        className="project-card__link"
        href={href}
        aria-label={name}
        target="_blank"
      />
    </article>
  );
};
