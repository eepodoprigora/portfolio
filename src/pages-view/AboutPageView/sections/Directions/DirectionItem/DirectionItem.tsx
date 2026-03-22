import { IDirection, IDirectionCategory } from "@/entities/direction/model";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { TextAnimation } from "@/shared/ui/TextAnimation/TextAnimation";
import classNames from "classnames";
import { useInView } from "motion/react";
import { useRef } from "react";

export type RawProps = IDirection & {
  categories: IDirectionCategory[];
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const DirectionItem = ({
  title,
  description,
  categories,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);

  return (
    <div
      {...props}
      className={classNames("direction", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper direction__wrapper">
        <TextAnimation
          as="h2"
          split="letters"
          className="direction__title h2"
          text={title}
          state={inView ? "enter" : "idle"}
        />
        <TextAnimation
          as="h2"
          split="words"
          className="direction__description text-m"
          text={description}
          state={inView ? "enter" : "idle"}
        />

        <ul className="list-unstyled direction__list">
          {categories.map((item) => (
            <li key={item.id} className="direction__list-item">
              <span>{item.title}</span>{" "}
              <span className="direction__list-count">0{item.order}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
