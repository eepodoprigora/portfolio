import { tp } from '@/shared/lib/formatting';
import { CommonPageProps } from '@/shared/model/types';

type Locale = 'ru' | 'en';

const i18n = {
    ru: {
        baseTitle: 'Портфолио',
        description: 'Портфолио — Евгения Подопригора, креативный фронтенд разработчик',
        about: 'Обо мне',
        home: 'Главная',
        policy: 'Политика конфиденциальности',
    },
    en: {
        baseTitle: 'Portfolio',
        description: 'Portfolio — Evgenia Podoprigora, creative frontend developer',
        about: 'About',
        home: 'Home',
        policy: 'Privacy policy',
    },
};

export const getCommonPageProps = async (
    locale: Locale = 'ru'
): Promise<Omit<CommonPageProps, 'breadcrumbs'>> => {
    const t = i18n[locale];

    return {
        meta: {
            baseTitle: t.baseTitle,
            description: t.description,
            ogImage: '/static/about/hero_mob.jpg',
        },
        headerData: {
            links: [
                {
                    href: '/',
                    text: 'Evgenia Podoprigora',
                },
                {
                    href: '/about',
                    text: t.about,
                    showPage: 'main',
                },
                {
                    href: '/',
                    text: t.home,
                    showPage: 'about',
                },
            ],
        },
        footerData: {
            policy: { text: tp(t.policy), href: '/privacy-policy' },
        },
    };
};