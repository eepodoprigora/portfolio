import React, { ElementType, ReactNode, useMemo } from "react";
import classNames from "classnames";

type SplitMode = "letters" | "words" | "none";
type AnimationState = "idle" | "enter" | "exit";

type RawProps<T extends ElementType> = {
  as?: T;
  text?: string;
  children?: ReactNode;
  split?: SplitMode;
  state?: AnimationState;
  className?: string;
  stagger?: number;
  duration?: number;
};

type Props<T extends ElementType> = React.HTMLAttributes<HTMLElement> &
  RawProps<T>;

const splitText = (text: string, split: SplitMode) => {
  if (split === "none") {
    return [text];
  }

  if (split === "letters") {
    return Array.from(text);
  }

  return text.split(/(\s+)/);
};

const preserveSpaces = (value: string) => value.replace(/ /g, "\u00A0");

export const TextAnimation = <T extends ElementType = "div">({
  as,
  text,
  children,
  split = "none",
  state = "idle",
  className,
  stagger = 0.03,
  duration = 0.5,
  style,
  ...props
}: Props<T>) => {
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

  if (split === "none") {
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
        {content}
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
      {parts.map((part, index) => {
        if (!part) {
          return null;
        }

        const isSpace = /^\s+$/.test(part);

        if (isSpace) {
          return (
            <React.Fragment key={index}>{preserveSpaces(part)}</React.Fragment>
          );
        }

        return (
          <span className="text-animation-wrap" key={index}>
            <span
              className="text-animation-item"
              style={{ transitionDelay: `${index * stagger}s` }}>
              {part}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};
