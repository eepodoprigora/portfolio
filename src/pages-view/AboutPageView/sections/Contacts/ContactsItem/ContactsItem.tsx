import classNames from "classnames";

export type RawProps = {
  id: string;
  type: string;
  title: string;
  value: string;
  href: string;
};

type Props = React.HTMLAttributes<HTMLLIElement> &
  RawProps & {
    isSocial: boolean;
    ref?: React.RefObject<HTMLLIElement | null>;
  };

export const ContactsItem = ({
  href,
  title,
  value,
  isSocial,
  className,
  ...props
}: Props) => {
  return (
    <li {...props} className={classNames("contacts__item", className)}>
      <a
        className="contacts__link"
        href={href}
        target="_blank"
        rel="noreferrer">
        {!isSocial && (
          <span className="contacts__item-title text-m">{title}:</span>
        )}
        {isSocial && <span className="contacts__item-icon"></span>}

        <span className="contacts__item-value text-m">{value}</span>
      </a>
    </li>
  );
};
