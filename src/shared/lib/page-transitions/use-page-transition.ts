import { usePresence } from "motion/react";
import { useEffect } from "react";
import {
    DEFAULT_MODE,
    DEFAULT_NAME,
    PageTransitionName,
    usePageTransitionStore,
} from "@/shared/model/page-transition";
import { leaveInstant } from "./leave-instant";
import { PAGE_TRANSITION_DURATION } from "@/shared/сonfig/const";

export type LeaveFn = (data: {
    targetElement?: Element | null;
}) => Promise<void>;

const leaveFnMap: Record<PageTransitionName, LeaveFn> = {
    default: leaveInstant,
    instant: leaveInstant,
};


export const usePageTransition = () => {
    const name = usePageTransitionStore((state) => state.name);
    const targetElement = usePageTransitionStore((state) => state.targetElement);
    const setPageTransition = usePageTransitionStore(
        (state) => state.setPageTransition,
    );
    const setIsTransitioning = usePageTransitionStore(
        (state) => state.setIsTransitioning,
    );
    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        if (isPresent) {
            return;
        }

        let isCancelled = false;

        const run = async () => {
            setIsTransitioning(true);

            await leaveFnMap[name]({ targetElement });

            await new Promise<void>((resolve) => {
                window.setTimeout(resolve, PAGE_TRANSITION_DURATION);
            });

            if (isCancelled) {
                return;
            }

            safeToRemove();

            setPageTransition({
                mode: DEFAULT_MODE,
                name: DEFAULT_NAME,
                targetElement: null,
                isLoading: false,
            });

            setIsTransitioning(false);
        };

        run();

        return () => {
            isCancelled = true;
        };
    }, [
        isPresent,
        name,
        targetElement,
        safeToRemove,
        setIsTransitioning,
        setPageTransition,
    ]);
};