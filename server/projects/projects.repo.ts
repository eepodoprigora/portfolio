import { IProject } from "@/entities/project";
import { tp } from "@/shared/lib/formatting";

export const PROJECTS_BASE = [
    {
        id: "vki",
        href: "https://vk-ing.ru/",
        name: "ВКИ",
        previewImg: { src: "/static/previews/vki-preview.jpg" },
        category: "B2B / Industrial",
        summary: tp(
            "Корпоративный сайт инжиниринговой компании — серьёзная ниша, нестандартные анимации."
        ),
    },
    {
        id: "rotormine",
        href: "https://rotormine.ru/",
        name: "Rotormine",
        previewImg: { src: "/static/previews/rotor-preview.jpg" },
        category: "Luxury E-commerce",
        summary: tp(
            "Маркетплейс люксовых часов — от Rolex до Patek Philippe. Каталог, фильтры, trade-in."
        ),
    },
    {
        id: "khamovniki",
        href: "https://khamovniki12.ru/",
        name: "Хамовники 12",
        previewImg: { src: "/static/previews/khamovniki-preview.jpg" },
        category: "Luxury Real Estate",
        summary: tp(
            "Клубный дом де-люкс в Москве — иммерсивный промо-сайт для аудитории с бюджетом от 100 млн."
        ),
    },
    {
        id: "obydenskiy",
        href: "https://obydenskiy-1.ru/",
        name: "Обыденский 1",
        previewImg: { src: "/static/previews/obydenskiy-preview.jpg" },
        category: "Luxury Real Estate",
        summary: tp(
            "Клубный дом от Sminex в Хамовниках — pixel-perfect под де-люкс сегмент."
        ),
    },
    {
        id: "dominanta",
        href: "https://d-a.ru/",
        name: "Доминанта",
        previewImg: { src: "/static/previews/dominanta-preview.jpg" },
        category: "Real Estate / Corporate",
        summary: tp(
            "Корпоративный сайт девелопера — мультипроектная витрина и кабинет брокера."
        ),
    },
    {
        id: "iliynka",
        href: "https://ilyinka.ru/",
        name: "Ильинка 3/8",
        previewImg: { src: "/static/previews/iliynka-preview.jpg" },
        category: "Luxury Real Estate",
        summary: tp(
            "Клубные особняки в 160м от Кремля — один из самых дорогих адресов Москвы."
        ),
    },
    {
        id: "whitemark",
        href: "https://whitemark.ru/",
        name: "Whitemark",
        previewImg: { src: "/static/previews/wm-preview.jpg" },
        category: "Digital Agency / Corporate",
        summary: tp(
            "Сайт студии-победителя Awwwards и Webby Award. Два года внутри команды."
        ),
    },
] satisfies IProject[];

export const getProjects = async () => PROJECTS_BASE;