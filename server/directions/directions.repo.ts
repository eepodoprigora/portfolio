import { IDirection, IDirectionCategory } from "@/entities/direction/model";

export const getDirections = async (): Promise<IDirection[]> => {
    return [
        {
            id: "interfaces-animation",
            number: "01",
            title: "Интерфейсы и анимация",
            description:
                "Промо-сайты, лендинги, иммерсивный скроллинг. Движение и детали которые создают ощущение продукта, а не просто страницы.",
        },
        {
            id: "product-development",
            number: "02",
            title: "Продуктовая разработка",
            description:
                "React, Next.js, TypeScript, Vanilla JS — каталоги, личные кабинеты, интеграции. Код который удобно читать и развивать.",
        },
        {
            id: "architecture-development",
            number: "03",
            title: "AI-assisted разработка",
            description:
                "Claude, ChatGPT и Cursor — часть моего рабочего процесса. Быстрее нахожу решения, точнее реализую сложные задачи.",
        },
    ];
};

export const getDirectionCategories = async (): Promise<IDirectionCategory[]> => {
    return [
        // 01 — Интерфейсы и анимация
        {
            id: "animations-microinteractions",
            directionId: "interfaces-animation",
            title: "Сложные анимации и микровзаимодействия",
            order: 1,
        },
        {
            id: "promo-pages",
            directionId: "interfaces-animation",
            title: "Иммерсивные промо-сайты",
            order: 2,
        },
        {
            id: "landing-pages",
            directionId: "interfaces-animation",
            title: "Лендинги и промо-лендинги",
            order: 3,
        },
        {
            id: "adaptive-layout",
            directionId: "interfaces-animation",
            title: "Pixel-perfect адаптивная вёрстка",
            order: 4,
        },
        {
            id: "interactive-sections",
            directionId: "interfaces-animation",
            title: "Интерактивные и scroll-секции",
            order: 5,
        },

        // 02 — Продуктовая разработка
        {
            id: "sites-and-interfaces",
            directionId: "product-development",
            title: "React, Next.js, TypeScript, Vanilla JS",
            order: 1,
        },
        {
            id: "catalogs-complex-pages",
            directionId: "product-development",
            title: "Каталоги с фильтрами и сложной логикой",
            order: 2,
        },
        {
            id: "forms-business-logic",
            directionId: "product-development",
            title: "Формы и бизнес-логика",
            order: 3,
        },
        {
            id: "api-integration",
            directionId: "product-development",
            title: "Интеграция с API",
            order: 4,
        },
        {
            id: "personal-accounts",
            directionId: "product-development",
            title: "Личные кабинеты и брокерские интерфейсы",
            order: 5,
        },

        // 03 — AI-assisted разработка
        {
            id: "claude",
            directionId: "architecture-development",
            title: "Claude",
            order: 1,
        },
        {
            id: "chatgpt",
            directionId: "architecture-development",
            title: "ChatGPT",
            order: 2,
        },
        {
            id: "cursor",
            directionId: "architecture-development",
            title: "Cursor",
            order: 3,
        },
        {
            id: "component-architecture",
            directionId: "architecture-development",
            title: "Компонентная архитектура",
            order: 4,
        },
        {
            id: "optimization-support",
            directionId: "architecture-development",
            title: "Оптимизация и рефакторинг",
            order: 5,
        },
    ];
};

