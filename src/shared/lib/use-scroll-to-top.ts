export const useScrollToTop = () => {
    const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
        if (typeof window === 'undefined') return;

        window.scrollTo({
            top: 0,
            behavior,
        });
    };

    return scrollToTop;
};