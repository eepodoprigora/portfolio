import DefaultLayout from "@/shared/ui/DefaultLayout";
import Link from "@/shared/ui/Link";
import { RotateText } from "@/shared/ui/RotateText";

export type RawProps = {
  errorNumber: number;
  title: string;
  btnText: string;
};

const ErrorPageView = ({ errorNumber, title, btnText }: RawProps) => {
  return (
    <DefaultLayout>
      <div className="error">
        <div className="wrapper error__wrapper">
          <p className="error__title text-m">{title}</p>

          <h1 className="error__number" data-text={errorNumber}>
            {errorNumber}
            <span className="error__number-slice" aria-hidden="true">
              <span className="error__number-slice-inner error__number-slice-inner--a">
                {errorNumber}
              </span>
              <span className="error__number-slice-inner error__number-slice-inner--b">
                {errorNumber}
              </span>
              <span className="error__number-slice-inner error__number-slice-inner--c">
                {errorNumber}
              </span>
            </span>
          </h1>

          <Link href="/" className="error__link text-xl">
            <RotateText text={btnText} />
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ErrorPageView;
