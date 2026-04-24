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
            "Каталог с нелинейной иерархией и нестандартным роутингом — стандартные решения не покрывали логику разделов. Спроектировала и реализовала кастомную навигацию с нуля, включая ЧПУ-попапы с синхронизацией URL и состояния."
        ),
        result: [
            tp("Пользователи могут расшаривать и возвращаться к конкретному товару по прямой ссылке — каждый попап имеет собственный URL"),
            tp("Устранила лишние ре-рендеры: интерфейс не «моргает» при навигации, что критично для каталогов с большим объёмом данных"),
            tp("Каталог корректно работает на мобильных без деградации логики попапов"),
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
            "Каталог с фильтрацией и избранным, где состояние должно оставаться консистентным между страницей списка, попапом и отдельной страницей товара. Без оптимизации — лаги при фильтрации и «прыгающее» избранное."
        ),
        result: [
            tp("Фильтрация работает без задержек — товары обновляются мгновенно без полного ре-рендера страницы"),
            tp("Избранное сохраняется и синхронизируется между попапом и страницей списка — пользователь не теряет выборку при навигации"),
            tp("Взяла проект в поддержку: итеративно улучшала и дорабатывала функциональность под требования продукта"),
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
            "SVG-схема этажа с кликабельными квартирами: каждый элемент должен синхронно обновлять карточку, фильтр и URL. На мобильных — точность попадания в маленькие зоны без потери UX."
        ),
        result: [
            tp("Реализовала интерактивную SVG-схему: клик по квартире мгновенно показывает её характеристики, статус и цену"),
            tp("Состояние выбора синхронизировано с фильтром — схема и список всегда консистентны"),
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
            "Промо-сайт с десятками анимационных сцен и параллакс-скроллом: при неправильной реализации — провалы FPS и сбои анимаций на мобильных. Задача — сохранить визуальный эффект без деградации производительности."
        ),
        result: [
            tp("Реализовала параллакс и анимационные сцены на GSAP + LocomotiveScroll без просадок FPS"),
            tp("Сделала слайдер «до/после» — ключевой элемент для сравнения состояния объекта"),
            tp("Все анимации корректно работают на мобильных: адаптировала тайминги и упростила сцены там, где производительность важнее эффекта"),
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
            "Сайт, где анимации — не декор, а часть сценария выбора: направление движения, скорость появления и взаимодействие слайдеров влияют на то, как пользователь воспринимает объекты."
        ),
        result: [
            tp("Реализовала кастомные слайдеры с переменным направлением анимации — создаёт эффект «живого» пространства при скролле"),
            tp("Анимации синхронизированы с пользовательскими действиями, а не запускаются по таймеру — интерфейс реагирует на человека"),
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
            "Промо-сайт премиум-класса: карта с динамическим появлением маркеров по скроллу и однонаправленная подача контента — технически сложно, визуально должно быть незаметно."
        ),
        result: [
            tp("Реализовала интерактивную карту с появлением маркеров по скроллу"),
            tp("Анимации не перегружают восприятие: работают как часть сторителлинга, а не как украшение"),
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
            "Кейс-страницы с нестандартной анимацией трансформации: изображение разворачивается в строку текста по скроллу. Нет готовых решений — реализовала собственную логику на GSAP."
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