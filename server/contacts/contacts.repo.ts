export type ContactType = "email" | "telegram" | "github" | "instagram";

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

const contactsMock: ContactsGroup[] = [
    {
        id: "primary",
        title: "Обсудим ваш проект",
        items: [
            {
                id: "email",
                type: "email",
                title: "Почта",
                value: "eepodoprogora@gmail.com",
                href: "mailto:eepodoprogora@gmail.com",
            },
            {
                id: "telegram",
                type: "telegram",
                title: "Телеграм",
                value: "@Evgenia96",
                href: "https://t.me/Evgenia96",
            },
        ],
    },
    {
        id: "social",
        title: "Социальные сети",
        items: [
            {
                id: "github",
                type: "github",
                title: "GitHub",
                value: "github.com/eepodoprigora",
                href: "https://github.com/eepodoprigora",
            },
        ],
    },
];

const delay = (ms: number) =>
    new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });

export const getContacts = async (): Promise<ContactsGroup[]> => {
    await delay(500);

    return contactsMock;
};