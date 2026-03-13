
import { AppCommonPageData } from '@/shared/api/types';
import { CommonPageProps } from '@/shared/model/types';


export const getCommonPageProps = async (
    cookies?: Partial<{ [key: string]: string }>,
): Promise<Omit<CommonPageProps, 'breadcrumbs' | keyof AppCommonPageData>> => {


    return {
        meta: {
            baseTitle: 'Порфолио',
            description: '[APP_DESCRIPTION]',
            ogImage: '/static/images/og-image.jpg',
        },
        cookies: null,

    };
};
