import { IProjectDetail, IProjectFlat, ProjectSectionType } from "@/entities/project";
import { tp } from "@/shared/lib/formatting";
import { AppLocale } from "@/shared/сonfig/const";
import { PROJECTS_BASE } from "./projects.repo";

export const PROJECT_SECTIONS_CONFIG = {
    complexity: {
        type: "text",
        ru: {
            title: "Сложность",
        },
        en: {
            title: "Challenge",
        },
    },
    result: {
        type: "list",
        ru: {
            title: "Результат",
        },
        en: {
            title: "Result",
        },
    },
} as const;

type ProjectSectionId = keyof typeof PROJECT_SECTIONS_CONFIG;

export type ProjectDetailSection = {
    id: ProjectSectionId;
    title: string;
    type: ProjectSectionType;
    value: string | string[];
};

type ProjectDetailData = IProjectDetail & {
    sectionsView: ProjectDetailSection[];
};

type ProjectDetailOnly = Omit<IProjectDetail, keyof IProjectFlat>;

type ProjectDetailLocaleData = {
    sections: ProjectDetailOnly["sections"];
};

type ProjectDetailBase = Omit<ProjectDetailOnly, "sections"> & {
    ru: ProjectDetailLocaleData;
    en: ProjectDetailLocaleData;
};

const mapProjectSections = (
    project: IProjectDetail,
    locale: AppLocale,
): ProjectDetailData => {
    const sectionsView = Object.entries(project.sections).map(([id, value]) => {
        const sectionId = id as ProjectSectionId;
        const config = PROJECT_SECTIONS_CONFIG[sectionId];

        return {
            id: sectionId,
            title: locale === "en" ? config.en.title : config.ru.title,
            type: config.type,
            value,
        };
    });

    return {
        ...project,
        sectionsView,
    };
};

const vkiDetail: ProjectDetailBase = {
    tags: ["Next.js", "TypeScript", "SCSS", "Framer Motion", "REST API"],
    video: [{ src: "/static/projects/vki/video.mp4", type: "video/mp4" }],
    images: [
        { src: "/static/projects/vki/1.jpg" },
        { src: "/static/projects/vki/2.jpg" },
        { src: "/static/projects/vki/3.jpg" },
        { src: "/static/projects/vki/4.jpg" },
    ],

    ru: {
        sections: {
            complexity: tp(
                "Каталог без стандартной иерархии — роутинг, нелинейную развилку по продуктам и ЧПУ-попапы с синхронизацией URL проектировала с нуля. Параллельно настроила техническое SEO до запуска.",
            ),
            result: [
                tp("Продуктовая линейка стала читаться без лишних кликов — нелинейная навигация ведёт пользователя к нужной позиции напрямую"),
                tp("Закрыла полный цикл фронтенда: компоненты, анимации, API-интеграция, SEO — один человек от начала до запуска"),
                tp("Активно использовала ИИ в разработке — ускорила рутину без потери качества"),
            ],
        },
    },

    en: {
        sections: {
            complexity:
                "The catalog had no standard hierarchy, so I designed the routing, non-linear product navigation, and SEO-friendly popups with URL synchronization from scratch. I also handled technical SEO before launch.",
            result: [
                "The product line became easier to explore without extra clicks — non-linear navigation leads users directly to the right item.",
                "Delivered the full frontend cycle: components, animations, API integration, and SEO — from start to launch.",
                "Actively used AI during development to speed up routine work without losing quality.",
            ],
        },
    },
};

const rotormineDetail: ProjectDetailBase = {
    tags: ["Next.js", "TypeScript", "SCSS", "Optimization", "REST API"],
    video: [{ src: "/static/projects/rotormine/video.mp4", type: "video/mp4" }],
    images: [
        { src: "/static/projects/rotormine/1.jpg" },
        { src: "/static/projects/rotormine/2.jpg" },
        { src: "/static/projects/rotormine/3.jpg" },
        { src: "/static/projects/rotormine/4.jpg" },
    ],

    ru: {
        sections: {
            complexity: tp(
                "Зашла в чужой проект на этапе доработок: разобралась в чужой кодовой базе, продумала архитектуру фильтров — структуру получения, хранения и обновления состояния. Синхронизировала избранное и сравнение между списком, попапом и страницей товара через Zustand",
            ),
            result: [
                tp("Старые баги устранены, проект стабильно работает на всех устройствах"),
                tp("Избранное и сравнение синхронизированы через Zustand — пользователь не теряет выборку при навигации между списком, попапом и страницей товара"),
            ],
        },
    },

    en: {
        sections: {
            complexity:
                "Joined an existing project during the refinement stage: quickly understood the codebase and designed the filter architecture, including data fetching, state storage, and updates. Synchronized favorites and comparison between the listing, popup, and product page using Zustand.",
            result: [
                "Legacy bugs were fixed, and the project became stable across devices.",
                "Favorites and comparison were synchronized through Zustand, so users keep their selected items while moving between the listing, popup, and product page.",
            ],
        },
    },
};

const khamovnikiDetail: ProjectDetailBase = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP"],
    video: [],
    images: [
        { src: "/static/projects/khamovniki/1.jpg" },
        { src: "/static/projects/khamovniki/2.jpg" },
        { src: "/static/projects/khamovniki/3.jpg" },
        { src: "/static/projects/khamovniki/4.jpg" },
    ],

    ru: {
        sections: {
            complexity: tp(
                "Интерактивная SVG-схема этажа: клик по квартире синхронно обновляет карточку, фильтр и список.",
            ),
            result: [
                tp("Реализовала интерактивную SVG-схему: клик по квартире мгновенно показывает её характеристики, статус и цену"),
                tp("Закрыла весь фронтенд проекта: верстка, анимации, интерактив — самостоятельно"),
            ],
        },
    },

    en: {
        sections: {
            complexity:
                "Interactive SVG floor plan: clicking an apartment updates the card, filters, and list in sync.",
            result: [
                "Built an interactive SVG floor plan where clicking an apartment instantly shows its details, status, and price.",
                "Delivered the entire frontend: layout, animations, and interactive logic independently.",
            ],
        },
    },
};

const obydenskiyDetail: ProjectDetailBase = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP", "Bitrix API"],
    video: [],
    images: [
        { src: "/static/projects/obydenskiy/1.jpg" },
        { src: "/static/projects/obydenskiy/2.jpg" },
        { src: "/static/projects/obydenskiy/3.jpg" },
        { src: "/static/projects/obydenskiy/4.jpg" },
        { src: "/static/projects/obydenskiy/5.jpg" },
    ],

    ru: {
        sections: {
            complexity: tp(
                "Десятки анимационных сцен и параллакс-скролл — при неаккуратной реализации просадки FPS и сломанные анимации на мобильных. Задача: сохранить эффект не теряя производительность.",
            ),
            result: [
                tp("Удержала производительность при десятках анимационных сцен — сайт не тормозит на мобильных"),
                tp("Реализовала нестандартные элементы: параллакс, «до/после», «летающую инсталляцию»"),
            ],
        },
    },

    en: {
        sections: {
            complexity:
                "The website included dozens of animated scenes and parallax scrolling. A careless implementation could easily lead to FPS drops and broken animations on mobile. The goal was to keep the visual effect without sacrificing performance.",
            result: [
                "Maintained smooth performance across dozens of animated scenes, including on mobile devices.",
                "Built custom elements such as parallax scenes, before/after interaction, and a flying installation animation.",
            ],
        },
    },
};

const dominantaDetail: ProjectDetailBase = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP", "Bitrix API"],
    video: [],
    images: [
        { src: "/static/projects/dominanta/1.jpg" },
        { src: "/static/projects/dominanta/2.jpg" },
        { src: "/static/projects/dominanta/3.jpg" },
        { src: "/static/projects/dominanta/4.jpg" },
    ],

    ru: {
        sections: {
            complexity: tp(
                "Слайдер с кастомной стрелкой направления: в левой части экрана — назад, в правой — вперёд.",
            ),
            result: [
                tp("Стрелка реагирует на позицию курсора на экране — интерфейс ведёт пользователя без явных подсказок"),
                tp("Анимации по скроллу реализованы без просадок FPS — работают плавно на мобильных и десктопе"),
            ],
        },
    },

    en: {
        sections: {
            complexity:
                "Custom directional slider: the left side of the screen moves backward, the right side moves forward.",
            result: [
                "The arrow reacts to the cursor position, guiding the user without explicit UI hints.",
                "Scroll animations were implemented without FPS drops and work smoothly on both mobile and desktop.",
            ],
        },
    },
};

const iliynkaDetail: ProjectDetailBase = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP", "Bitrix API"],
    video: [],
    images: [
        { src: "/static/projects/iliynka/1.jpg" },
        { src: "/static/projects/iliynka/2.jpg" },
        { src: "/static/projects/iliynka/3.jpg" },
        { src: "/static/projects/iliynka/4.jpg" },
    ],

    ru: {
        sections: {
            complexity: tp(
                "Карта с появлением маркеров по скроллу и однонаправленная подача контента — технически сложно, визуально должно быть незаметно.",
            ),
            result: [
                tp("Закрыла весь фронтенд премиум-проекта самостоятельно — верстка, анимации, карта с кастомной логикой по скроллу"),
                tp("Добилась плавной работы анимаций без просадок FPS"),
            ],
        },
    },

    en: {
        sections: {
            complexity:
                "A map with markers appearing on scroll and a one-directional content flow. Technically complex, but visually it had to feel seamless.",
            result: [
                "Delivered the full frontend of a premium project independently: layout, animations, and a map with custom scroll-based logic.",
                "Achieved smooth animation performance without FPS drops.",
            ],
        },
    },
};

const whitemarkDetail: ProjectDetailBase = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP"],
    video: [],
    images: [
        { src: "/static/projects/whitemark/1.jpg" },
        { src: "/static/projects/whitemark/2.jpg" },
        { src: "/static/projects/whitemark/3.jpg" },
    ],

    ru: {
        sections: {
            complexity: tp(
                "Изображение уменьшается и трансформируется в строку текста, двигаясь вместе с ней. Готовых решений нет — реализовала собственную логику на GSAP.",
            ),
            result: [
                tp("Реализовала анимацию трансформации изображения в строку без готовых библиотек — нестандартное решение под нестандартную задачу"),
                tp("Движение и композиция расставляют акценты сами — пользователь читает кейс в нужном порядке без дополнительных UI-подсказок"),
            ],
        },
    },

    en: {
        sections: {
            complexity:
                "An image shrinks and transforms into a text line, then moves together with it. There was no ready-made solution, so I built custom GSAP logic.",
            result: [
                "Built an image-to-text-line transformation animation without ready-made libraries.",
                "Motion and composition guide the reading flow, so the user follows the case in the intended order without extra UI hints.",
            ],
        },
    },
};

const PROJECTS_DETAILS: Record<string, ProjectDetailBase> = {
    vki: vkiDetail,
    rotormine: rotormineDetail,
    khamovniki: khamovnikiDetail,
    obydenskiy: obydenskiyDetail,
    dominanta: dominantaDetail,
    iliynka: iliynkaDetail,
    whitemark: whitemarkDetail,
};

export const getProjectDetail = async (
    id: string,
    locale: AppLocale = "ru",
): Promise<ProjectDetailData | null> => {
    const baseProject = PROJECTS_BASE.find((project) => project.id === id);
    const detailProject = PROJECTS_DETAILS[id];

    if (!baseProject || !detailProject) {
        return null;
    }

    const { ru: baseRu, en: baseEn, ...base } = baseProject;
    const { ru: detailRu, en: detailEn, ...detail } = detailProject;

    return mapProjectSections(
        {
            ...base,
            ...(locale === "en" ? baseEn : baseRu),
            ...detail,
            ...(locale === "en" ? detailEn : detailRu),
        },
        locale,
    );
};