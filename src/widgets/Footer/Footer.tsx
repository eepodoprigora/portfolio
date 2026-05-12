import { ILink } from "@/shared/model/types";
import Link from "@/shared/ui/Link";
import { RotateText } from "@/shared/ui/RotateText";

export type RawProps = {
  policy: ILink;
};

type Props = React.HTMLAttributes<HTMLElement> & RawProps;

export const Footer = ({ policy }: Props) => {
  return (
    <footer className="footer">
      <div className="wrapper footer__wrapper">
        <Link href={policy.href} className="footer__policy text-s">
          <RotateText text={policy.text} />
        </Link>
      </div>
    </footer>
  );
};
