import React from "react";
import classNames from "classnames";
import { usePageTransitionStore } from "@/shared/model/page-transition";

type RawProps = React.HTMLAttributes<HTMLElement>;

export const PageTransitionOverlay = ({ className, ...props }: RawProps) => {
  const isTransitioning = usePageTransitionStore(
    (state) => state.isTransitioning,
  );

  return (
    <div
      {...props}
      className={classNames("page-transition-overlay", className, {
        "page-transition-overlay--transitioning": isTransitioning,
      })}>
      <div className="page-transition-overlay__circle" />
    </div>
  );
};
