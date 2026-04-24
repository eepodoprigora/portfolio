import { ProjectDetailSection } from "@/entities/project";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { ImageShape } from "@/shared/model/types";
import Parallaxed from "@/shared/ui/Parallaxed";
import { RotateText } from "@/shared/ui/RotateText";
import { TextAnimation } from "@/shared/ui/TextAnimation";
import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";

export type RawProps = {
  name: string;
  summary: string;
  href: string;
  image: ImageShape;
  sections?: ProjectDetailSection[];
  tags?: string[];
  viewProject: string;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Overview = ({
  name,
  summary,
  image,
  href,
  viewProject,
  sections = [],
  tags = [],
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  return (
    <section
      {...props}
      className={classNames("project__overview overview", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper overview__wrapper">
        <div className="overview__media">
          <Parallaxed scalePower={0.2} className="responsive__item">
            <Image
              src={image?.src ?? ""}
              alt={image?.alt ?? ""}
              title={image?.title}
              sizes="40vw"
              fill
              className="overview__image image"
            />
          </Parallaxed>
        </div>

        <div className="overview__content">
          <TextAnimation
            as="h1"
            split="letters"
            className="overview__header h1"
            text={name}
          />

          <TextAnimation
            as="p"
            split="words"
            className="overview__summary text-m"
            text={summary}
          />

          {tags.length > 0 && (
            <ul className="overview__tags list-unstyled">
              {tags.map((tag) => (
                <li className="overview__tag text-s" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {sections.length > 0 && (
            <div className="overview__sections">
              {sections.map((section) => (
                <div className="overview__section" key={section.id}>
                  <TextAnimation
                    as="p"
                    split="letters"
                    className="overview__section-title text-s"
                    text={section.title}
                  />

                  {section.type === "text" &&
                    typeof section.value === "string" && (
                      <p className="overview__section-text text-s">
                        {section.value}
                      </p>
                    )}

                  {section.type === "list" && Array.isArray(section.value) && (
                    <ul className="overview__section-list list-unstyled">
                      {section.value.map((item) => (
                        <li
                          className="overview__section-item text-s"
                          key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          <a href={href} className="text-xl">
            <RotateText text={viewProject} />
          </a>
        </div>
      </div>
    </section>
  );
};
