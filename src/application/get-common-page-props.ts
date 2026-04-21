
import { AppCommonPageData } from '@/shared/api/types';
import { CommonPageProps } from '@/shared/model/types';


export const getCommonPageProps = async (): Promise<Omit<CommonPageProps, 'breadcrumbs' | keyof AppCommonPageData>> => {
    return {
        meta: {
            baseTitle: 'Портфолио',
            description: 'Портфолио - Евгения Подопригора, креативный фронтенд разработчик',
            ogImage: '/static/about/hero_mob.jpg',
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
