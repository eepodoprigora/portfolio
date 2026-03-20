import { usePresence } from "motion/react";
import { useEffect, useRef } from "react";
import {
    DEFAULT_MODE,
    DEFAULT_NAME,
    PageTransitionName,
    usePageTransitionStore,
} from "@/shared/model/page-transition";
import { leaveInstant } from "./leave-instant";

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
    const isStartedRef = useRef(false);

    useEffect(() => {
        if (isPresent || isStartedRef.current) {
            return;
        }

        isStartedRef.current = true;

        setIsTransitioning(true);

        leaveFnMap[name]({ targetElement }).then(() => {
            safeToRemove();

            setPageTransition({
                mode: DEFAULT_MODE,
                name: DEFAULT_NAME,
                targetElement: null,
                isLoading: false,
            });
        });
    }, [
        isPresent,
        name,
        targetElement,
        safeToRemove,
        setIsTransitioning,
        setPageTransition,
    ]);
};