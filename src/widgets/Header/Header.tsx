import { useHeaderColorStore } from "@/shared/model/header-color";
import Link from "@/shared/ui/Link";
import { RotateText } from "@/shared/ui/RotateText";
import classNames from "classnames";

export const Header = () => {
  const headerColor = useHeaderColorStore((s) => s.headerClass);

  return (
    <header className={classNames("header", headerColor)}>
      <div className="wrapper header__wrapper">
        <Link href={"/"} className="text-xl">
          <RotateText text="Evgenia Podoprigora" />
        </Link>
        <Link href={"/about"} className="text-l header__about">
          <RotateText text="Обо мне" />
        </Link>
        <Link href={"/"} className="text-l header__main">
          <RotateText text="Главная" />
        </Link>
      </div>
    </header>
  );
};
