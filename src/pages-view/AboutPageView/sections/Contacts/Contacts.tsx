import { mergeRefs } from "@/shared/lib/merge-refs";
import { ImageShape } from "@/shared/model/types";
import { TextAnimation } from "@/shared/ui/TextAnimation/TextAnimation";
import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";
import { ContactsItem, ContactsItemRawProps } from "./ContactsItem";

export type ContactsGroupRawProps = {
  id: string;
  title: string;
  items: ContactsItemRawProps[];
};

export type RawProps = {
  header?: string | null;
  cta?: string | null;
  social: ContactsGroupRawProps[];
  image: ImageShape | null;
  rights: string;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Contacts = ({
  header,
  cta,
  social,
  image,
  rights,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      className={classNames("contacts", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper contacts__wrapper">
        {header && (
          <TextAnimation
            as="h2"
            split="letters"
            className="contacts__header text-m section-header"
            text={header}
          />
        )}

        <div className="contacts__main">
          <div className="contacts__content">
            {cta && (
              <TextAnimation
                as="p"
                split="words"
                className="contacts__cta text-xl"
                text={cta}
              />
            )}

            <div className="contacts__groups">
              {social.map((group) => {
                const isSocial = group.id === "social";
                return (
                  <section key={group.id} className="contacts__group">
                    <TextAnimation
                      as="h3"
                      split="words"
                      className="contacts__group-title text-m"
                      text={group.title}
                    />

                    <ul className="contacts__list list-unstyled">
                      {group.items.map((item) => (
                        <ContactsItem
                          key={item.id}
                          {...item}
                          isSocial={isSocial}
                          className={classNames({
                            "contacts__item--github": item.type === "github",
                          })}
                        />
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
            <div className="contacts__rights">{rights}</div>
          </div>

          <div className="contacts__media">
            {image && (
              <div className="contacts__image-box">
                <Image
                  src={image.src}
                  fill
                  alt={image.alt ?? header ?? "Контакты"}
                  title={image.title}
                  className="contacts__image"
                  loading="lazy"
                />
                <div className="contacts__image-liquid" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
