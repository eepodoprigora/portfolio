import { useMemo, useRef } from "react";
import classNames from "classnames";
import { useMarqueeMotion } from "@/shared/lib/use-marquee-motion";

export type RawProps = {
  text: string;
  speed?: number;
};

type Props = React.HTMLAttributes<HTMLDivElement> & RawProps;

export const MarqueeText = ({
  text,
  speed = 0.9,
  className,
  ...props
}: Props) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLSpanElement | null>(null);

  useMarqueeMotion({
    trackRef,
    itemRef,
    baseSpeed: speed,
  });

  const items = useMemo(() => Array.from({ length: 3 }), []);

  return (
    <div
      {...props}
      className={classNames("marquee-text", className)}
      aria-hidden="true">
      <div className="marquee-text__viewport">
        <div ref={trackRef} className="marquee-text__track">
          {items.map((_, index) => (
            <span
              key={index}
              ref={index === 0 ? itemRef : undefined}
              className="marquee-text__item">
              <span className="marquee-text__label h1">{text}</span>
              <span className="marquee-text__separator h1">—</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
