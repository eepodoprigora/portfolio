import { ImageShape, VideoShape } from "@/shared/model/types";

export interface IProject {
    id: string;
    name: string;
    previewImg: ImageShape;
    href: string;
    category: string;
    summary: string;

}

export interface IProjectDetail extends IProject {
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