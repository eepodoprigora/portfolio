import { mergeRefs } from "@/shared/lib/merge-refs";
import { useAppReadyStore } from "@/shared/model/app-ready";
import { OrientationImageShape } from "@/shared/model/types";
import { MarqueeText } from "@/shared/ui/MarqueeText";
import OrientationImage from "@/shared/ui/OrientationImage";
import classNames from "classnames";
import { useInView } from "motion/react";
import { useRef } from "react";

export type RawProps = {
  h1: string;
  image: OrientationImageShape | null;
  textBlock1?: string | null;
  textBlock2?: string | null;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Hero = ({
  h1,
  image,
  textBlock1,
  textBlock2,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { once: true });
  const appReady = useAppReadyStore((s) => s.appReady);
  return (
    <div
      {...props}
      className={classNames("about__hero hero", className)}
      ref={mergeRefs([ref, rootRef])}>
      {image && (
        <div
          className={classNames("hero__image-container", {
            "hero__image-container--mounted": inView && appReady,
          })}>
          <OrientationImage
            sources={image}
            sizes="100vw"
            className="hero__image"
          />
          <MarqueeText text={h1} />
          {(textBlock1 || textBlock2) && (
            <div className="hero__text h2">
              {textBlock1 && (
                <span className="hero__text-block">{textBlock1}</span>
              )}
              {textBlock2 && (
                <span className="hero__text-block">{textBlock2}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
