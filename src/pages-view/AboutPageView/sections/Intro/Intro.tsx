import { mergeRefs } from "@/shared/lib/merge-refs";
import { TextAnimation } from "@/shared/ui/TextAnimation/TextAnimation";
import classNames from "classnames";
import { useRef } from "react";

export type RawProps = {
  header?: string | null;
  textBlock1?: string | null;
  textBlock2?: string | null;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Intro = ({
  header,
  textBlock1,
  textBlock2,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      className={classNames("intro", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper intro__wrapper">
        {header && (
          <TextAnimation
            as="h2"
            split="letters"
            className="intro__header text-m section-header"
            text={header}
          />
        )}

        {textBlock1 && (
          <TextAnimation
            as="div"
            split="words"
            className="intro__main h2"
            text={textBlock1}
            stagger={0.025}
          />
        )}

        {textBlock2 && (
          <TextAnimation
            as="div"
            split="words"
            className="intro__add"
            text={textBlock2}
            stagger={0.04}
          />
        )}
      </div>
    </div>
  );
};
