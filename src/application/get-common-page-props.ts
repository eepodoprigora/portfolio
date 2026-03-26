
import { AppCommonPageData } from '@/shared/api/types';
import { CommonPageProps } from '@/shared/model/types';


export const getCommonPageProps = async (): Promise<Omit<CommonPageProps, 'breadcrumbs' | keyof AppCommonPageData>> => {
    return {
        meta: {
            baseTitle: 'Порфолио',
            description: '[APP_DESCRIPTION]',
            ogImage: '/static/images/og-image.jpg',
        },
        headerData: {
            links: [
                {
                    href: '/',
                    text: 'Evgenia Podoprigora',
                },
                {
                    href: 'about',
                    text: 'Обо мне',
                    showPage: 'main'
                },
                {
                    href: '/',
                    text: 'Главная',
                    showPage: 'about'
                },
            ]
        }
    };
};
