import React from "react";
import classNames from "classnames";

type RawProps = {
  text: string;
  as?: "span" | "div";
};

type Props = React.HTMLAttributes<HTMLElement> & RawProps;

export const RotateText = ({
  text,
  as = "span",
  className,
  ...props
}: Props) => {
  const Tag = as;
  const chars = Array.from(text);

  return (
    <Tag
      {...props}
      className={classNames("rotate-text", className)}
      aria-label={text}>
      <span className="rotate-text__inner" aria-hidden="true">
        {chars.map((char, index) => (
          <span
            key={index}
            className={classNames("rotate-text__char", {
              "rotate-text__char--space": char === " ",
            })}
            style={{ "--char-index": index } as React.CSSProperties}>
            <span className="rotate-text__char-text rotate-text__char-text--current">
              {char === " " ? "\u00A0" : char}
            </span>

            <span className="rotate-text__char-text rotate-text__char-text--next">
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
};
