import { IDirection, IDirectionCategory } from "@/entities/direction/model";

export const getDirections = async (): Promise<IDirection[]> => {
    return [
        {
            id: "interfaces-animation",
            number: "01",
            title: "Интерфейсы и анимация",
            description:
                "Создаю выразительные интерфейсы, в которых движение, визуальный ритм и детали работают на общее впечатление от продукта.",
        },
        {
            id: "product-development",
            number: "02",
            title: "Продуктовая разработка",
            description:
                "Разрабатываю современные веб-интерфейсы с понятной логикой, аккуратной реализацией и вниманием к пользовательскому сценарию.",
        },
        {
            id: "architecture-development",
            number: "03",
            title: "Архитектура и развитие",
            description:
                "Собираю интерфейсы так, чтобы их было удобно поддерживать, масштабировать и развивать со временем.",
        },
    ];
};

export const getDirectionCategories = async (): Promise<IDirectionCategory[]> => {
    return [
        {
            id: "animations-microinteractions",
            directionId: "interfaces-animation",
            title: "Анимации и микровзаимодействия",
            order: 1,
        },
        {
            id: "promo-pages",
            directionId: "interfaces-animation",
            title: "Промо-страницы",
            order: 2,
        },
        {
            id: "landing-pages",
            directionId: "interfaces-animation",
            title: "Лендинги",
            order: 3,
        },
        {
            id: "adaptive-layout",
            directionId: "interfaces-animation",
            title: "Адаптивная вёрстка",
            order: 4,
        },
        {
            id: "interactive-sections",
            directionId: "interfaces-animation",
            title: "Интерактивные секции",
            order: 5,
        },
        {
            id: "sites-and-interfaces",
            directionId: "product-development",
            title: "Сайты и интерфейсы на React, Next.js и нативном JavaScript",
            order: 1,
        },
        {
            id: "catalogs-complex-pages",
            directionId: "product-development",
            title: "Каталоги и сложные страницы",
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
            title: "Личные кабинеты",
            order: 5,
        },
        {
            id: "component-architecture",
            directionId: "architecture-development",
            title: "Компонентная архитектура",
            order: 1,
        },
        {
            id: "typescript",
            directionId: "architecture-development",
            title: "TypeScript",
            order: 2,
        },
        {
            id: "state-management",
            directionId: "architecture-development",
            title: "Управление состоянием",
            order: 3,
        },
        {
            id: "refactoring",
            directionId: "architecture-development",
            title: "Рефакторинг",
            order: 4,
        },
        {
            id: "optimization-support",
            directionId: "architecture-development",
            title: "Оптимизация и поддержка",
            order: 5,
        },
    ];
};

