import { AppLocale } from "@/shared/сonfig/const";

export type ContactType =
    | "email"
    | "telegram"
    | "github"
    | "instagram";

export type ContactItem = {
    id: string;
    type: ContactType;
    title: string;
    value: string;
    href: string;
};

export type ContactsGroup = {
    id: string;
    title: string;
    items: ContactItem[];
};

export type ContactItemLocaleData = {
    title: string;
};

export type ContactsGroupLocaleData = {
    title: string;
};

export type ContactItemBase = Omit<ContactItem, "title"> & {
    ru: ContactItemLocaleData;
    en: ContactItemLocaleData;
};

export type ContactsGroupBase = Omit<
    ContactsGroup,
    "title" | "items"
> & {
    ru: ContactsGroupLocaleData;
    en: ContactsGroupLocaleData;
    items: ContactItemBase[];
};

const CONTACTS_BASE: ContactsGroupBase[] = [
    {
        id: "primary",

        ru: {
            title: "Обсудим ваш проект",
        },

        en: {
            title: "Let's discuss your project",
        },

        items: [
            {
                id: "email",
                type: "email",
                value: "eepodoprogora@gmail.com",
                href: "mailto:eepodoprogora@gmail.com",

                ru: {
                    title: "Почта",
                },

                en: {
                    title: "Email",
                },
            },

            {
                id: "telegram",
                type: "telegram",
                value: "@Evgenia96",
                href: "https://t.me/Evgenia96",

                ru: {
                    title: "Телеграм",
                },

                en: {
                    title: "Telegram",
                },
            },
        ],
    },

    {
        id: "social",

        ru: {
            title: "Социальные сети",
        },

        en: {
            title: "Social media",
        },

        items: [
            {
                id: "github",
                type: "github",
                value: "github.com/eepodoprigora",
                href: "https://github.com/eepodoprigora",

                ru: {
                    title: "GitHub",
                },

                en: {
                    title: "GitHub",
                },
            },
        ],
    },
];

const delay = (ms: number) =>
    new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });

export const getContacts = async (
    locale: AppLocale = "ru",
): Promise<ContactsGroup[]> => {
    await delay(500);

    return CONTACTS_BASE.map(({ ru, en, items, ...group }) => ({
        ...group,
        ...(locale === "en" ? en : ru),

        items: items.map(({ ru, en, ...item }) => ({
            ...item,
            ...(locale === "en" ? en : ru),
        })),
    }));
};