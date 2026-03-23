import classNames from "classnames";
import { m } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type RawProps = {
  value: string;
};

type Props = React.HTMLAttributes<HTMLDivElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const DirectionsNumber = ({ value, className, ...props }: Props) => {
  const [frontValue, setFrontValue] = useState(value);
  const [backValue, setBackValue] = useState(value);
  const [rotation, setRotation] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isInstantReset, setIsInstantReset] = useState(false);

  const pendingValueRef = useRef<string | null>(null);

  useEffect(() => {
    if (value === frontValue && !isFlipping) {
      return;
    }

    if (isFlipping) {
      pendingValueRef.current = value;
      return;
    }

    setBackValue(value);

    requestAnimationFrame(() => {
      setIsInstantReset(false);
      setIsFlipping(true);
      setRotation(180);
    });
  }, [value, frontValue, isFlipping]);

  const handleAnimationComplete = () => {
    if (!isFlipping) {
      return;
    }

    const nextValue = backValue;

    setIsFlipping(false);
    setIsInstantReset(true);
    setFrontValue(nextValue);
    setBackValue(nextValue);
    setRotation(0);

    requestAnimationFrame(() => {
      setIsInstantReset(false);

      if (pendingValueRef.current && pendingValueRef.current !== nextValue) {
        const pendingValue = pendingValueRef.current;

        pendingValueRef.current = null;
        setBackValue(pendingValue);

        requestAnimationFrame(() => {
          setIsFlipping(true);
          setRotation(180);
        });

        return;
      }

      pendingValueRef.current = null;
    });
  };

  return (
    <div {...props} className={classNames("directions-number", className)}>
      <div className="directions-number__viewport">
        <m.div
          className="directions-number__card"
          animate={{ rotateY: rotation }}
          transition={
            isInstantReset
              ? { duration: 0 }
              : {
                  duration: 0.58,
                  ease: [0.45, 0, 0.55, 1],
                }
          }
          onAnimationComplete={handleAnimationComplete}>
          <span className="directions-number__face directions-number__face--front">
            {frontValue}
          </span>

          <span className="directions-number__face directions-number__face--back">
            {backValue}
          </span>
        </m.div>
      </div>
    </div>
  );
};
