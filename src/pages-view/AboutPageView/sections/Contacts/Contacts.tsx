import { mergeRefs } from "@/shared/lib/merge-refs";
import classNames from "classnames";
// import { useInView } from "motion/react";
import { useRef } from "react";

export type RawProps = {};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Contacts = ({ className, ref, ...props }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  // const inView = useInView(rootRef);

  return (
    <div
      {...props}
      className={classNames("contacts", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper contacts__wrapper"></div>
    </div>
  );
};
