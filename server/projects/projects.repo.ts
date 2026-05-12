import { IProject, IProjectFlat } from "@/entities/project";
import { tp } from "@/shared/lib/formatting";
import { AppLocale } from "@/shared/сonfig/const";

export const PROJECTS_BASE = [
    {
        id: "vki",
        href: "https://vk-ing.ru/",
        previewImg: {
            src: "/static/previews/vki-preview.jpg",
        },
        category: "B2B / Industrial",

        ru: {
            name: "ВКИ",
            summary: tp(
                "Корпоративный сайт инжиниринговой компании — серьёзная ниша, нестандартные анимации.",
            ),
        },

        en: {
            name: "VKI",
            summary:
                "Engineering company website — niche industry, custom animations.",
        },
    },

    {
        id: "rotormine",
        href: "https://rotormine.ru/",
        previewImg: {
            src: "/static/previews/rotor-preview.jpg",
        },
        category: "Luxury E-commerce",

        ru: {
            name: "Rotormine",
            summary: tp(
                "Маркетплейс люксовых часов — от Rolex до Patek Philippe. Каталог, фильтры, trade-in.",
            ),
        },

        en: {
            name: "Rotormine",
            summary:
                "Luxury watch marketplace featuring Rolex, Patek Philippe, and more. Catalog, filters, and trade-in system.",
        },
    },

    {
        id: "khamovniki",
        href: "https://khamovniki12.ru/",
        previewImg: {
            src: "/static/previews/khamovniki-preview.jpg",
        },
        category: "Luxury Real Estate",

        ru: {
            name: "Хамовники 12",
            summary: tp(
                "Клубный дом де-люкс в Москве — иммерсивный промо-сайт для аудитории с бюджетом от 100 млн.",
            ),
        },

        en: {
            name: "Khamovniki 12",
            summary:
                "De luxe private residence in Moscow — immersive promo website for premium audience.",
        },
    },

    {
        id: "obydenskiy",
        href: "https://obydenskiy-1.ru/",
        previewImg: {
            src: "/static/previews/obydenskiy-preview.jpg",
        },
        category: "Luxury Real Estate",

        ru: {
            name: "Обыденский 1",
            summary: tp(
                "Клубный дом от Sminex в Хамовниках — pixel-perfect под де-люкс сегмент.",
            ),
        },

        en: {
            name: "Obydenskiy 1",
            summary:
                "Luxury residence by Sminex in Khamovniki — pixel-perfect implementation for premium segment.",
        },
    },

    {
        id: "dominanta",
        href: "https://d-a.ru/",
        previewImg: {
            src: "/static/previews/dominanta-preview.jpg",
        },
        category: "Real Estate / Corporate",

        ru: {
            name: "Доминанта",
            summary: tp(
                "Корпоративный сайт девелопера — мультипроектная витрина и кабинет брокера.",
            ),
        },

        en: {
            name: "Dominanta",
            summary:
                "Corporate website for a real estate developer with multi-project showcase and broker dashboard.",
        },
    },

    {
        id: "iliynka",
        href: "https://ilyinka.ru/",
        previewImg: {
            src: "/static/previews/iliynka-preview.jpg",
        },
        category: "Luxury Real Estate",

        ru: {
            name: "Ильинка 3/8",
            summary: tp(
                "Клубные особняки в 160м от Кремля — один из самых дорогих адресов Москвы.",
            ),
        },

        en: {
            name: "Ilyinka 3/8",
            summary:
                "Private mansions 160 meters from the Kremlin — one of the most prestigious addresses in Moscow.",
        },
    },

    {
        id: "whitemark",
        href: "https://whitemark.ru/",
        previewImg: {
            src: "/static/previews/wm-preview.jpg",
        },
        category: "Digital Agency / Corporate",

        ru: {
            name: "Whitemark",
            summary: tp(
                "Сайт студии-победителя Awwwards и Webby Award. Два года внутри команды.",
            ),
        },

        en: {
            name: "Whitemark",
            summary:
                "Website for an Awwwards and Webby Award winning agency. Worked inside the team for two years.",
        },
    },
] satisfies IProject[];

export const getProjects = async (locale: AppLocale = 'ru'): Promise<IProjectFlat[]> =>
    PROJECTS_BASE.map(({ ru, en, ...base }) => ({
        ...base,
        ...(locale === 'en' ? en : ru),
    }));