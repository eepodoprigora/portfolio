import { ImageShape, VideoShape } from "@/shared/model/types";

export interface IProjectLocale {
    name: string;
    summary: string;
}

export interface IProject {
    id: string;
    href: string;
    previewImg: ImageShape;
    category: string;

    ru: IProjectLocale;
    en: IProjectLocale;
}

export type IProjectFlat = Omit<IProject, 'ru' | 'en'> & IProjectLocale;

export interface IProjectDetail extends IProjectFlat {
    video?: VideoShape;
    images?: ImageShape[];
    sections: {
        complexity: string;
        result: string[];
    };
    tags?: string[];
}

export type ProjectSectionType = "text" | "list";

export type ProjectSectionId = "complexity" | "result" | "tags";

export interface ProjectDetailSection {
    id: ProjectSectionId;
    title: string;
    type: ProjectSectionType;
    value: string | string[];
}

export interface IProjectDetailView extends IProjectDetail {
    sectionsView: ProjectDetailSection[];
}