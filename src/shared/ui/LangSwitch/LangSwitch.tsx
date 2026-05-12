import { useLocaleSwitch } from "@/shared/lib/use-locale-switch";
import classNames from "classnames";
import { RotateText } from "@/shared/ui/RotateText";

export const LangSwitch = () => {
  const { switchLocale, currentLocale } = useLocaleSwitch();

  return (
    <div
      className={classNames("lang-switch", {
        "lang-switch--ru-active": currentLocale === "ru",
        "lang-switch--en-active": currentLocale === "en",
      })}>
      <button
        className="lang-switch__btn lang-switch__btn--ru text-xl"
        onClick={() => switchLocale("ru")}
        aria-current={currentLocale === "ru" ? "true" : undefined}>
        <RotateText text="RU" />
      </button>
      <button
        className="lang-switch__btn lang-switch__btn--en text-xl"
        onClick={() => switchLocale("en")}
        aria-current={currentLocale === "en" ? "true" : undefined}>
        <RotateText text="EN" />
      </button>
    </div>
  );
};
