import { mergeRefs } from "@/shared/lib/merge-refs";
import { TextAnimation } from "@/shared/ui/TextAnimation/TextAnimation";
import classNames from "classnames";
import { useRef, useState } from "react";
import { DirectionItem, DirectionItemRawProps } from "./DirectionItem";
import { DirectionsNumber } from "./DirectionsNumber";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const activeNumber = directions[activeIndex]?.number ?? "01";

  return (
    <section
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
          />
        )}

        <div className="directions__content">
          <div className="directions__number-column">
            <DirectionsNumber value={activeNumber} />
          </div>

          <div className="directions__list">
            {directions.map((item, index) => (
              <DirectionItem
                key={item.id}
                {...item}
                index={index}
                onActive={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
