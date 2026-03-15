import React, { ElementType, ReactNode, useMemo } from "react";
import classNames from "classnames";

type SplitMode = "letters" | "words" | "lines" | "none";
type AnimationState = "idle" | "enter" | "exit";

type TextAnimationProps<T extends ElementType> = {
  as?: T;
  text?: string;
  children?: ReactNode;
  split?: SplitMode;
  state?: AnimationState;
  className?: string;
  stagger?: number;
  duration?: number;
} & React.HTMLAttributes<HTMLElement>;

const splitText = (text: string, split: SplitMode) => {
  if (split === "none") {
    return [text];
  }

  if (split === "letters") {
    return Array.from(text);
  }

  if (split === "words") {
    return text.split(/(\s+)/).filter(Boolean);
  }

  return text.split("\n");
};

export const TextAnimation = <T extends ElementType = "div">({
  as,
  text,
  children,
  split = "none",
  state = "idle",
  className,
  stagger = 0.04,
  duration = 0.8,
  style,
  ...props
}: TextAnimationProps<T>) => {
  const Tag = (as || "div") as ElementType;

  const content =
    typeof text === "string"
      ? text
      : typeof children === "string"
        ? children
        : null;

  const parts = useMemo(() => {
    if (content == null) {
      return [];
    }

    return splitText(content, split);
  }, [content, split]);

  const rootClassName = classNames(
    "text-animation",
    {
      "text-animation-split-none": split === "none",
      "text-animation-split-letters": split === "letters",
      "text-animation-split-words": split === "words",
      "text-animation-split-lines": split === "lines",
      "text-animation-state-idle": state === "idle",
      "text-animation-state-enter": state === "enter",
      "text-animation-state-exit": state === "exit",
    },
    className,
  );

  if (content == null) {
    return (
      <Tag {...props} className={rootClassName} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      {...props}
      className={rootClassName}
      style={
        {
          ...style,
          "--text-animation-duration": `${duration}s`,
        } as React.CSSProperties
      }>
      {split === "none" &&
        parts.map((part, index) => (
          <React.Fragment key={index}>{part}</React.Fragment>
        ))}

      {(split === "letters" || split === "words") &&
        parts.map((part, index) => {
          const isSpace = /^\s+$/.test(part);

          if (isSpace) {
            return <React.Fragment key={index}>{part}</React.Fragment>;
          }

          return (
            <span
              className="text-animation-item"
              key={index}
              style={{ transitionDelay: `${index * stagger}s` }}>
              {part}
            </span>
          );
        })}

      {split === "lines" &&
        parts.map((part, index) => (
          <span className="text-animation-line" key={index}>
            <span
              className="text-animation-item"
              style={{ transitionDelay: `${index * stagger}s` }}>
              {part}
            </span>
          </span>
        ))}
    </Tag>
  );
};
