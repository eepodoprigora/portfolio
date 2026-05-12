import { IDirection, IDirectionBase, IDirectionCategory, IDirectionCategoryBase } from "@/entities/direction";
import { AppLocale } from "@/shared/сonfig/const";

export const DIRECTIONS_BASE = [
    {
        id: "interfaces-animation",
        number: "01",

        ru: {
            title: "Интерфейсы и анимация",
            description:
                "Промо-сайты, лендинги, иммерсивный скроллинг. Движение и детали которые создают ощущение продукта, а не просто страницы.",
        },

        en: {
            title: "Interfaces & Animation",
            description:
                "Promo websites, landing pages, immersive scrolling. Motion and details that make a product feel alive instead of just another webpage.",
        },
    },

    {
        id: "product-development",
        number: "02",

        ru: {
            title: "Продуктовая разработка",
            description:
                "React, Next.js, TypeScript, Vanilla JS — каталоги, личные кабинеты, интеграции. Код который удобно читать и развивать.",
        },

        en: {
            title: "Product Development",
            description:
                "React, Next.js, TypeScript, Vanilla JS — catalogs, dashboards, integrations. Code that is easy to maintain and scale.",
        },
    },

    {
        id: "architecture-development",
        number: "03",

        ru: {
            title: "AI-assisted разработка",
            description:
                "Claude, ChatGPT и Cursor — часть моего рабочего процесса. Быстрее нахожу решения, точнее реализую сложные задачи.",
        },

        en: {
            title: "AI-assisted Development",
            description:
                "Claude, ChatGPT, and Cursor are part of my workflow. Faster problem-solving and more precise implementation of complex tasks.",
        },
    },
] satisfies IDirectionBase[];

export const DIRECTION_CATEGORIES_BASE = [
    {
        id: "animations-microinteractions",
        directionId: "interfaces-animation",
        order: 1,

        ru: {
            title: "Сложные анимации и микровзаимодействия",
        },

        en: {
            title: "Advanced animations & microinteractions",
        },
    },

    {
        id: "promo-pages",
        directionId: "interfaces-animation",
        order: 2,

        ru: {
            title: "Иммерсивные промо-сайты",
        },

        en: {
            title: "Immersive promo websites",
        },
    },

    {
        id: "landing-pages",
        directionId: "interfaces-animation",
        order: 3,

        ru: {
            title: "Лендинги и промо-лендинги",
        },

        en: {
            title: "Landing pages & promo pages",
        },
    },

    {
        id: "adaptive-layout",
        directionId: "interfaces-animation",
        order: 4,

        ru: {
            title: "Pixel-perfect адаптивная вёрстка",
        },

        en: {
            title: "Pixel-perfect responsive layout",
        },
    },

    {
        id: "interactive-sections",
        directionId: "interfaces-animation",
        order: 5,

        ru: {
            title: "Интерактивные и scroll-секции",
        },

        en: {
            title: "Interactive scroll-based sections",
        },
    },

    {
        id: "sites-and-interfaces",
        directionId: "product-development",
        order: 1,

        ru: {
            title: "React, Next.js, TypeScript, Vanilla JS",
        },

        en: {
            title: "React, Next.js, TypeScript, Vanilla JS",
        },
    },

    {
        id: "catalogs-complex-pages",
        directionId: "product-development",
        order: 2,

        ru: {
            title: "Каталоги с фильтрами и сложной логикой",
        },

        en: {
            title: "Catalogs with filters & complex logic",
        },
    },

    {
        id: "forms-business-logic",
        directionId: "product-development",
        order: 3,

        ru: {
            title: "Формы и бизнес-логика",
        },

        en: {
            title: "Forms & business logic",
        },
    },

    {
        id: "api-integration",
        directionId: "product-development",
        order: 4,

        ru: {
            title: "Интеграция с API",
        },

        en: {
            title: "API integrations",
        },
    },

    {
        id: "personal-accounts",
        directionId: "product-development",
        order: 5,

        ru: {
            title: "Личные кабинеты и брокерские интерфейсы",
        },

        en: {
            title: "Dashboards & broker interfaces",
        },
    },

    {
        id: "claude",
        directionId: "architecture-development",
        order: 1,

        ru: {
            title: "Claude",
        },

        en: {
            title: "Claude",
        },
    },

    {
        id: "chatgpt",
        directionId: "architecture-development",
        order: 2,

        ru: {
            title: "ChatGPT",
        },

        en: {
            title: "ChatGPT",
        },
    },

    {
        id: "cursor",
        directionId: "architecture-development",
        order: 3,

        ru: {
            title: "Cursor",
        },

        en: {
            title: "Cursor",
        },
    },

    {
        id: "component-architecture",
        directionId: "architecture-development",
        order: 4,

        ru: {
            title: "Компонентная архитектура",
        },

        en: {
            title: "Component architecture",
        },
    },

    {
        id: "optimization-support",
        directionId: "architecture-development",
        order: 5,

        ru: {
            title: "Оптимизация и рефакторинг",
        },

        en: {
            title: "Optimization & refactoring",
        },
    },
] satisfies IDirectionCategoryBase[];

export const getDirections = async (
    locale: AppLocale = "ru",
): Promise<IDirection[]> =>
    DIRECTIONS_BASE.map(({ ru, en, ...base }) => ({
        ...base,
        ...(locale === "en" ? en : ru),
    }));

export const getDirectionCategories = async (
    locale: AppLocale = "ru",
): Promise<IDirectionCategory[]> =>
    DIRECTION_CATEGORIES_BASE.map(({ ru, en, ...base }) => ({
        ...base,
        ...(locale === "en" ? en : ru),
    }));