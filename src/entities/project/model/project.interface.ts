import { ImageShape } from "@/shared/model/types";

export interface IProject {
    id: string;
    name: string;
    previewImg: ImageShape;
    href: string;
}