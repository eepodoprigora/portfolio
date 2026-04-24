import { IProject, IProjectDetail } from "@/entities/project";
import { ProjectSectionType } from "@/entities/project/model";
import { tp } from "@/shared/lib/formatting";
import { PROJECTS_BASE } from "./projects.repo";

export const PROJECT_SECTIONS_CONFIG = {
    complexity: {
        title: "Сложность",
        type: "text",
    },
    result: {
        title: "Результат",
        type: "list",
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

type ProjectDetailOnly = Omit<IProjectDetail, keyof IProject>;

const mapProjectSections = (project: IProjectDetail): ProjectDetailData => {
    const sectionsView = Object.entries(project.sections).map(([id, value]) => {
        const sectionId = id as ProjectSectionId;
        const config = PROJECT_SECTIONS_CONFIG[sectionId];

        return {
            id: sectionId,
            title: config.title,
            type: config.type,
            value,
        };
    });

    return {
        ...project,
        sectionsView,
    };
};

const vkiDetail: ProjectDetailOnly = {
    tags: ["Next.js", "TypeScript", "SCSS", "Framer Motion", "REST API"],
    video: [{ src: "/static/projects/vki/video.mp4", type: "video/mp4" }],
    images: [
        { src: "/static/projects/vki/1.jpg" },
        { src: "/static/projects/vki/2.jpg" },
        { src: "/static/projects/vki/3.jpg" },
        { src: "/static/projects/vki/4.jpg" },
    ],
    sections: {
        complexity: tp(
            "Каталог без стандартной иерархии — роутинг, нелинейную развилку по продуктам и ЧПУ-попапы с синхронизацией URL проектировала с нуля. Параллельно настроила техническое SEO до запуска."
        ),
        result: [
            tp("Продуктовая линейка стала читаться без лишних кликов — нелинейная навигация ведёт пользователя к нужной позиции напрямую"),
            tp("Закрыла полный цикл фронтенда: компоненты, анимации, API-интеграция, SEO — один человек от начала до запуска"),

        ],
    },
};

const rotormineDetail: ProjectDetailOnly = {
    tags: ["Next.js", "TypeScript", "SCSS", "Optimization", "REST API"],
    video: [{ src: "/static/projects/rotormine/video.mp4", type: "video/mp4" }],
    images: [
        { src: "/static/projects/rotormine/1.jpg" },
        { src: "/static/projects/rotormine/2.jpg" },
        { src: "/static/projects/rotormine/3.jpg" },
        { src: "/static/projects/rotormine/4.jpg" },
    ],
    sections: {
        complexity: tp(
            "Зашла в чужой проект на этапе доработок: разобралась в чужой кодовой базе, продумала архитектуру фильтров — структуру получения, хранения и обновления состояния. Синхронизировала избранное и сравнение между списком, попапом и страницей товара через Zustand"
        ),
        result: [
            tp("Старые баги устранены, проект стабильно работает на всех устройствах"),
            tp("Избранное и сравнение синхронизированы через Zustand — пользователь не теряет выборку при навигации между списком, попапом и страницей товара"),
        ],
    },
};

const khamovnikiDetail: ProjectDetailOnly = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP"],
    video: [],
    images: [
        { src: "/static/projects/khamovniki/1.jpg" },
        { src: "/static/projects/khamovniki/2.jpg" },
        { src: "/static/projects/khamovniki/3.jpg" },
        { src: "/static/projects/khamovniki/4.jpg" },
    ],
    sections: {
        complexity: tp(
            "Интерактивная SVG-схема этажа: клик по квартире синхронно обновляет карточку, фильтр и список."
        ),
        result: [
            tp("Реализовала интерактивную SVG-схему: клик по квартире мгновенно показывает её характеристики, статус и цену"),
            tp("Закрыла весь фронтенд проекта: верстка, анимации, интерактив — самостоятельно"),
        ],
    },
};

const obydenskiyDetail: ProjectDetailOnly = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP", "Bitrix API"],
    video: [],
    images: [
        { src: "/static/projects/obydenskiy/1.jpg" },
        { src: "/static/projects/obydenskiy/2.jpg" },
        { src: "/static/projects/obydenskiy/3.jpg" },
        { src: "/static/projects/obydenskiy/4.jpg" },
        { src: "/static/projects/obydenskiy/5.jpg" },
    ],
    sections: {
        complexity: tp(
            "Десятки анимационных сцен и параллакс-скролл — при неаккуратной реализации просадки FPS и сломанные анимации на мобильных. Задача: сохранить эффект не теряя производительность."
        ),
        result: [
            tp("Удержала производительность при десятках анимационных сцен — сайт не тормозит на мобильных"),
            tp("Реализовала нестандартные элементы: параллакс, «до/после», «летающую инсталляцию»"),
        ],
    },
};

const dominantaDetail: ProjectDetailOnly = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP", "Bitrix API"],
    video: [],
    images: [
        { src: "/static/projects/dominanta/1.jpg" },
        { src: "/static/projects/dominanta/2.jpg" },
        { src: "/static/projects/dominanta/3.jpg" },
        { src: "/static/projects/dominanta/4.jpg" },
    ],
    sections: {
        complexity: tp(
            "Слайдер с кастомной стрелкой направления: в левой части экрана — назад, в правой — вперёд."
        ),
        result: [
            tp("Стрелка реагирует на позицию курсора на экране — интерфейс ведёт пользователя без явных подсказок"),
            tp("Анимации по скроллу реализованы без просадок FPS — работают плавно на мобильных и десктопе"),

        ],
    },
};

const iliynkaDetail: ProjectDetailOnly = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP", "Bitrix API"],
    video: [],
    images: [
        { src: "/static/projects/iliynka/1.jpg" },
        { src: "/static/projects/iliynka/2.jpg" },
        { src: "/static/projects/iliynka/3.jpg" },
        { src: "/static/projects/iliynka/4.jpg" },
    ],
    sections: {
        complexity: tp(
            "Карта с появлением маркеров по скроллу и однонаправленная подача контента — технически сложно, визуально должно быть незаметно."
        ),
        result: [
            tp("Закрыла весь фронтенд премиум-проекта самостоятельно — верстка, анимации, карта с кастомной логикой по скроллу",),
            tp("Добилась плавной работы анимаций без просадок FPS"),
        ],
    },
};

const whitemarkDetail: ProjectDetailOnly = {
    tags: ["HTML", "SCSS", "JavaScript", "GSAP"],
    video: [],
    images: [
        { src: "/static/projects/whitemark/1.jpg" },
        { src: "/static/projects/whitemark/2.jpg" },
        { src: "/static/projects/whitemark/3.jpg" },

    ],
    sections: {
        complexity: tp(
            "Изображение уменьшается и трансформируется в строку текста, двигаясь вместе с ней. Готовых решений нет — реализовала собственную логику на GSAP."
        ),
        result: [
            tp("Реализовала анимацию трансформации изображения в строку без готовых библиотек — нестандартное решение под нестандартную задачу"),
            tp("Движение и композиция расставляют акценты сами — пользователь читает кейс в нужном порядке без дополнительных UI-подсказок"),
        ],
    },
};

const PROJECTS_DETAILS: Record<string, ProjectDetailOnly> = {
    vki: vkiDetail,
    rotormine: rotormineDetail,
    khamovniki: khamovnikiDetail,
    obydenskiy: obydenskiyDetail,
    dominanta: dominantaDetail,
    iliynka: iliynkaDetail,
    whitemark: whitemarkDetail,
};

export const getProjectDetail = async (
    id: string
): Promise<ProjectDetailData | null> => {
    const baseProject = PROJECTS_BASE.find((project) => project.id === id);
    const detailProject = PROJECTS_DETAILS[id];

    if (!baseProject || !detailProject) {
        return null;
    }

    return mapProjectSections({
        ...baseProject,
        ...detailProject,
    });
};