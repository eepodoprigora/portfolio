import { useAppReadyStore } from "@/shared/model/app-ready";
import { useEffect, useState } from "react";
import { TextAnimation } from "../TextAnimation/TextAnimation";

export const Preloader = () => {
  const [count, setCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [needsExit, setNeedsExit] = useState(false);

  const setAppReady = useAppReadyStore((s) => s.setAppReady);

  const preloaderTiming = 3500;
  const toHideTiming = preloaderTiming - 500;

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setNeedsExit(true);
    }, 2000);

    return () => {
      clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    const intervals: ReturnType<typeof setInterval>[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const startCounter = (
      from: number,
      to: number,
      delay: number,
      startAfter: number,
    ) => {
      const timeout = setTimeout(() => {
        let current = from;

        const interval = setInterval(() => {
          current += 1;
          setCount(current);

          if (current >= to) {
            clearInterval(interval);
          }
        }, delay);

        intervals.push(interval);
      }, startAfter);

      timeouts.push(timeout);
    };

    startCounter(0, 45, 24, 0);
    startCounter(45, 100, 12, 1450);

    const hideTimeout = setTimeout(() => {
      setCount(100);
      setIsHidden(true);
    }, toHideTiming);

    const removeTimeout = setTimeout(() => {
      setIsRemoved(true);
      setAppReady(true);
    }, preloaderTiming);

    timeouts.push(hideTimeout, removeTimeout);

    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [setAppReady, toHideTiming]);

  if (isRemoved) {
    return null;
  }

  return (
    <div className={isHidden ? "preloader is-hidden" : "preloader"}>
      <TextAnimation
        as="div"
        split="letters"
        needsExit={needsExit}
        stagger={0.025}
        text="EVGENIA'S P. PORTFOLIO"
        className="preloader__text h1"
      />
      <div className="preloader__count">{count}%</div>
    </div>
  );
};
