import classNames from "classnames";
import { CSSProperties, HTMLAttributes, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import { useMounted } from "@/shared/lib/use-mounted";
import ParallaxedJSWrapper from "./ParallaxedJSWrapper";

interface Props extends HTMLAttributes<HTMLElement> {
  scalePower?: number;
  direction?: -1 | 1;
  containerRef?: React.RefObject<HTMLElement>;
  forceJS?: boolean;
}

const Parallaxed = ({
  children,
  direction = -1,
  scalePower = 0,
  containerRef,
  forceJS = false,
  className,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMounted = useMounted();

  const { height = 0 } = useResizeObserver({
    ref: ref as React.RefObject<HTMLDivElement>,
    box: "border-box",
  });

  const value = height * scalePower;
  const scale = 1 + scalePower;

  const supportsCSSViewTimeline =
    typeof window === "undefined" ||
    CSS.supports("animation-timeline", "view()");

  return (
    <div {...props} ref={ref} className={classNames("parallaxed", className)}>
      {supportsCSSViewTimeline && !forceJS ? (
        <div
          className="parallaxed-item"
          style={
            isMounted
              ? ({
                  "--parallax-scale": `${scale}`,
                  "--parallax-y-from": `${value * direction}px`,
                  "--parallax-y-to": `${value * -direction}px`,
                  animationName: "parallax",
                  animationTimingFunction: "linear",
                  animationFillMode: "both",
                  animationTimeline: "view(y)",
                  animationRange:
                    "var(--parallax-animation-range-start, cover) var(--parallax-animation-range-offset-start, 0%) var(--parallax-animation-range-end, cover) var(--parallax-animation-range-offset-end, 100%)",
                } as CSSProperties)
              : undefined
          }>
          <div className="parallaxed-item__wrapper">{children}</div>
        </div>
      ) : (
        <ParallaxedJSWrapper
          elRef={ref as React.RefObject<HTMLElement>}
          containerRef={containerRef}
          value={value}
          scale={scale}
          axis="y"
          direction={direction}>
          {children}
        </ParallaxedJSWrapper>
      )}
    </div>
  );
};

export default Parallaxed;
