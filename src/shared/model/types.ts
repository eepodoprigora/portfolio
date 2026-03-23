import { AppCommonPageData } from '../api/types';

export type PageMeta = Partial<{
    title: string;
    description: string;
    ogImage: string;
}>;

export type AppBreadcrumbs = {
    text: string;
    href?: string | null;
}[];


export type CommonPageProps = AppCommonPageData & {
    bodyClass?: string;
    cookies?: Partial<{ [key: string]: string }> | null;
    meta: PageMeta &
    Partial<{
        baseTitle: string;
    }>;
    breadcrumbs: AppBreadcrumbs;


    overlapSticky?: boolean;
};

export type ImageShape = {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
    title?: string;
};

export type OrientationImageShape = {
    horizontal: ImageShape | null;
    vertical: ImageShape | null;
};






