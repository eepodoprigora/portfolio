import classnames from "classnames";
import React from "react";
import { usePageTransition } from "@/shared/lib/page-transitions";

interface Props extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const DefaultLayout = ({ ref, children, ...props }: Props) => {
  usePageTransition();

  return (
    <div
      {...props}
      ref={ref}
      className={classnames("page js-page", props.className)}>
      {children}
    </div>
  );
};

export default DefaultLayout;
