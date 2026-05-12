import { normalizeHref } from "@/shared/lib/strings";
import { useHeaderColorStore } from "@/shared/model/header-color";
import { ILink } from "@/shared/model/types";
import { LangSwitch } from "@/shared/ui/LangSwitch";
import Link from "@/shared/ui/Link";
import { RotateText } from "@/shared/ui/RotateText";
import classNames from "classnames";

type RawProps = {
  links: ILink[];
};

type Props = React.HTMLAttributes<HTMLElement> & RawProps;

export const Header = ({ links }: Props) => {
  const headerColor = useHeaderColorStore((s) => s.headerClass);

  return (
    <header className={classNames("header", headerColor)}>
      <div className="wrapper header__wrapper">
        {links.map((item, i) => {
          const safeHref = normalizeHref(item.href);

          return (
            <Link
              href={safeHref}
              key={i}
              className={classNames("text-xl", {
                header__about: item.showPage === "about",
                header__main: item.showPage === "main",
              })}>
              <RotateText text={item.text} />
            </Link>
          );
        })}
        <LangSwitch />
      </div>
    </header>
  );
};
