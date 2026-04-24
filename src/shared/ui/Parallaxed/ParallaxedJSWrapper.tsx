import classNames from 'classnames';
import { MotionValue, m, useScroll, useTransform } from 'motion/react';
import { RefObject } from 'react';
import { useMounted } from '@/shared/lib/use-mounted';

type Props = {
    children: React.ReactNode;
    elRef: RefObject<HTMLElement>;
    containerRef?: RefObject<HTMLElement>;
    value: number;
    direction: 1 | -1;
    axis: 'x' | 'y';
    scale: number;
};

function useParallax(
    scrollProgress: MotionValue<number>,
    distance: number,
    startFromZero = false,
    direction: 1 | -1 = 1,
) {
    return useTransform(
        scrollProgress,
        [0, 1],
        [startFromZero ? 0 : distance, -distance].map((x) => x * direction),
    );
}

const ParallaxedJSWrapper = ({ value, children, elRef, containerRef, axis, scale, direction }: Props) => {
    const scroll = useScroll({
        container: containerRef,
        target: elRef,
        offset: ['start end', 'end start'],
        axis,
    });
    const progress = scroll[axis === 'x' ? 'scrollXProgress' : 'scrollYProgress'];
    const parallaxValue = useParallax(progress, value, false, direction);
    const isMounted = useMounted();

    return (
        <m.div
            className={classNames('parallaxed-item', isMounted && 'parallaxed-item--js')}
            style={isMounted ? ({ [axis]: parallaxValue } as React.CSSProperties) : undefined}
        >
            <div
                className="parallaxed-item__wrapper"
                style={isMounted ? ({ '--scale': scale } as React.CSSProperties) : undefined}
            >
                {children}
            </div>
        </m.div>
    );
};

export default ParallaxedJSWrapper;
