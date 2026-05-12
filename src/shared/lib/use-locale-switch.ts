// shared/lib/use-locale-switch.ts
import { useRouter } from 'next/router';
import { usePageTransitionStore } from '@/shared/model/page-transition';
import { curtainLeave } from './page-transitions/curtain';
import { PAGE_TRANSITION_ENTER_MS } from '../сonfig/const';

export const useLocaleSwitch = () => {
    const router = useRouter();
    const setIsLeaving = usePageTransitionStore((s) => s.setIsLeaving);
    const setIsEntering = usePageTransitionStore((s) => s.setIsEntering);
    const resetPageTransition = usePageTransitionStore((s) => s.resetPageTransition);

    const switchLocale = async (locale: string) => {
        if (locale === router.locale) return;

        setIsLeaving(true);
        setIsEntering(false);

        await curtainLeave();

        await router.push(router.pathname, router.asPath, {
            locale,
            scroll: false,
        });

        resetPageTransition();
        setIsLeaving(false);
        setIsEntering(true);

        // повторяем логику из usePageTransition
        setTimeout(() => {
            setIsEntering(false);
        }, PAGE_TRANSITION_ENTER_MS);
    };

    return { switchLocale, currentLocale: router.locale };
};