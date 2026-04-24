import { mergeRefs } from "@/shared/lib/merge-refs";
import { ImageShape, VideoShape } from "@/shared/model/types";
import Parallaxed from "@/shared/ui/Parallaxed";

import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";

export type RawProps = {
  video?: VideoShape | null;
  images?: ImageShape[] | null;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Visual = ({ video, images, className, ref, ...props }: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  return (
    <section
      {...props}
      className={classNames("project__visual visual", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper visual__wrapper">
        {images &&
          images.length &&
          images.map((image, i) => (
            <div className="visual__image-wrapper" key={i}>
              <Parallaxed scalePower={0.2} className="responsive__item">
                <Image
                  src={image?.src ?? ""}
                  alt={image?.alt ?? ""}
                  title={image?.title}
                  sizes="80vw"
                  fill
                  className="visual__image image"
                />
              </Parallaxed>
            </div>
          ))}
      </div>
    </section>
  );
};
