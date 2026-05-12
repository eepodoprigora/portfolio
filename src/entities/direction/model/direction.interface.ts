import { AppLocale } from "@/shared/сonfig/const";

export interface IDirection {
    id: string;
    number: string;
    title: string;
    description: string;
}

export type IDirectionCategory = {
    id: string;
    directionId: IDirection["id"];
    title: string;
    order: number;
};

export type IDirectionLocaleData = {
    title: string;
    description: string;
};

export type IDirectionCategoryLocaleData = {
    title: string;
};

export type IDirectionBase = Omit<IDirection, "title" | "description"> & {
    ru: IDirectionLocaleData;
    en: IDirectionLocaleData;
};

export type IDirectionCategoryBase = Omit<
    IDirectionCategory,
    "title"
> & {
    ru: IDirectionCategoryLocaleData;
    en: IDirectionCategoryLocaleData;
};

export type DirectionLocale = AppLocale;