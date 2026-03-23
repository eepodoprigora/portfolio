import { IDirection, IDirectionCategory } from "@/entities/direction/model";
import { mergeRefs } from "@/shared/lib/merge-refs";
import Reveal from "@/shared/ui/Reveal";
import { TextAnimation } from "@/shared/ui/TextAnimation/TextAnimation";
import classNames from "classnames";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

export type RawProps = IDirection & {
  categories: IDirectionCategory[];
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    index: number;
    onActive: (index: number) => void;
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const DirectionItem = ({
  title,
  description,
  categories,
  index,
  onActive,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const isActive = useInView(rootRef, {
    amount: 0.3,
  });

  const isTextInView = useInView(rootRef);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    onActive(index);
  }, [index, isActive, onActive]);

  return (
    <article
      {...props}
      className={classNames("direction", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="direction__wrapper">
        <TextAnimation
          as="h3"
          split="letters"
          className="direction__title h2"
          text={title}
          state={isTextInView ? "enter" : "idle"}
        />

        <TextAnimation
          as="p"
          split="words"
          className="direction__description text-m"
          text={description}
          state={isTextInView ? "enter" : "idle"}
        />

        <ul className="list-unstyled direction__list">
          {categories.map((item, itemIndex) => (
            <Reveal
              key={item.id}
              as="li"
              className="direction__list-item"
              delay={itemIndex * 80}>
              <>
                <span>{item.title}</span>
                <span className="direction__list-count">0{item.order}</span>
              </>
            </Reveal>
          ))}
        </ul>
      </div>
    </article>
  );
};
