import { mergeRefs } from "@/shared/lib/merge-refs";
import { TextAnimation } from "@/shared/ui/TextAnimation/TextAnimation";
import classNames from "classnames";
import { useInView } from "motion/react";
import { useRef } from "react";
import { DirectionItem, DirectionItemRawProps } from "./DirectionItem";

export type RawProps = {
  header?: string | null;
  directions: DirectionItemRawProps[];
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Directions = ({
  header,
  directions,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);

  return (
    <div
      {...props}
      className={classNames("directions", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper directions__wrapper">
        {header && (
          <TextAnimation
            as="h2"
            split="letters"
            className="directions__header text-m section-header"
            text={header}
            state={inView ? "enter" : "idle"}
          />
        )}

        {directions &&
          directions.map((item) => <DirectionItem key={item.id} {...item} />)}
      </div>
    </div>
  );
};
