import { clampMin } from "@/shared/lib/strings";
import { RefObject, useEffect, useState } from "react";

type Params = {
    rootRef: RefObject<HTMLElement | null>;
    slidesRef: RefObject<HTMLDivElement[]>;
    slidesCount: number;
};



const getClosestSlideIndex = (
    slides: HTMLDivElement[],
    slidesCount: number,
    progress: number,
) => {
    if (!slidesCount || slides.length !== slidesCount) {
        return 0;
    }

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2 + progress;
        const distance = Math.abs(center);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
};

export const useProjectsSlider = ({
    rootRef,
    slidesRef,
    slidesCount,
}: Params) => {
    const [progress, setProgress] = useState(0);
    const [minTranslate, setMinTranslate] = useState(0);
    const [maxTranslate, setMaxTranslate] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const updateSizes = () => {
            const slides = slidesRef.current;

            if (!slidesCount || slides.length !== slidesCount) {
                return;
            }

            const firstSlide = slides[0];
            const lastSlide = slides[slides.length - 1];

            if (!firstSlide || !lastSlide) {
                return;
            }

            const firstCenter = firstSlide.offsetLeft + firstSlide.offsetWidth / 2;
            const lastCenter = lastSlide.offsetLeft + lastSlide.offsetWidth / 2;

            const nextMaxTranslate = -firstCenter;
            const nextMinTranslate = -lastCenter;

            setMaxTranslate(nextMaxTranslate);
            setMinTranslate(nextMinTranslate);

            setProgress((prev) => {
                const nextProgress = clampMin(
                    prev || nextMaxTranslate,
                    nextMinTranslate,
                    nextMaxTranslate,
                );

                setCurrentIndex(
                    getClosestSlideIndex(slides, slidesCount, nextProgress),
                );

                return nextProgress;
            });
        };

        updateSizes();
        window.addEventListener("resize", updateSizes);

        return () => {
            window.removeEventListener("resize", updateSizes);
        };
    }, [slidesRef, slidesCount]);

    useEffect(() => {
        const root = rootRef.current;

        if (!root) {
            return undefined;
        }

        const handleWheel = (event: WheelEvent) => {
            const rect = root.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            const canScroll = isVisible && minTranslate !== maxTranslate;

            if (!canScroll) {
                return undefined;
            }

            const slides = slidesRef.current;

            if (!slidesCount || slides.length !== slidesCount) {
                return undefined;
            }

            setProgress((prev) => {
                const nextProgress = clampMin(
                    prev - event.deltaY * 0.8,
                    minTranslate,
                    maxTranslate,
                );

                setCurrentIndex(
                    getClosestSlideIndex(slides, slidesCount, nextProgress),
                );

                return nextProgress;
            });

            return undefined;
        };

        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [rootRef, slidesRef, slidesCount, minTranslate, maxTranslate]);

    return {
        progress,
        currentIndex,
    };
};