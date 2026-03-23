
import { AppCommonPageData } from '@/shared/api/types';
import { CommonPageProps } from '@/shared/model/types';


export const getCommonPageProps = async (): Promise<Omit<CommonPageProps, 'breadcrumbs' | keyof AppCommonPageData>> => {
    return {
        meta: {
            baseTitle: 'Порфолио',
            description: '[APP_DESCRIPTION]',
            ogImage: '/static/images/og-image.jpg',
        },
    };
};
