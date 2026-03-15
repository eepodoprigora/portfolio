import Link from "@/shared/ui/Link";
import { RotateText } from "@/shared/ui/RotateText";

export const Header = () => {
  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Link href={"/"} className="text-xl">
          <RotateText text="Evgenia Podoprigora" />
        </Link>
        {/* <Link href={"/about"} className="text-l">
          <RotateText text="About" />
        </Link> */}
      </div>
    </header>
  );
};
