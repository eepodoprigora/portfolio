"use client";

import { useEffect, useState } from "react";

const LayoutGrid = () => {
  const key = "k";
  const lineWidth = 1;

  const baseColor = [231, 64, 31];
  const columnColor = `rgba(${baseColor.join(",")}, 0.12)`;
  const gapColor = `rgba(${baseColor.join(",")}, 0.28)`;

  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [wrapperMaxWidth, setWrapperMaxWidth] = useState(0);
  const [columnWidth, setColumnWidth] = useState(0);
  const [gapWidth, setGapWidth] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    setMounted(true);

    const onResize = () => {
      const docStyles = window.getComputedStyle(document.documentElement);

      const wrapperMaxWidth =
        parseFloat(docStyles.getPropertyValue("--wrapper-max-width")) ||
        window.innerWidth;

      const offsetX = parseFloat(docStyles.getPropertyValue("--offset-x")) || 0;

      const gapWidth =
        parseFloat(docStyles.getPropertyValue("--grid-gap")) || 0;

      const gridColumns =
        parseFloat(docStyles.getPropertyValue("--grid-columns")) || 12;

      const scrollbarWidth =
        parseFloat(docStyles.getPropertyValue("--scrollbar-width")) || 0;

      const contentWidth = Math.min(
        wrapperMaxWidth,
        window.innerWidth - scrollbarWidth - offsetX * 2,
      );

      const columnWidth =
        contentWidth / gridColumns -
        gapWidth * ((gridColumns - 1) / gridColumns);

      setWrapperMaxWidth(wrapperMaxWidth);
      setOffsetX(offsetX);
      setGapWidth(gapWidth);
      setColumnWidth(columnWidth);
    };

    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === key) {
        setHidden((prev) => !prev);
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  if (!mounted || columnWidth <= 0) {
    return null;
  }

  return (
    <div
      hidden={hidden}
      style={{
        pointerEvents: "none",
        position: "fixed",
        zIndex: 99999999,
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: wrapperMaxWidth,
        height: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `repeating-linear-gradient(to right, ${columnColor}, ${columnColor} ${
          columnWidth - (gapWidth === 0 ? lineWidth : 0)
        }px, ${gapColor} ${columnWidth - (gapWidth === 0 ? lineWidth : 0)}px, ${gapColor} ${
          columnWidth + gapWidth
        }px)`,
        backgroundSize: `calc(100% - ${offsetX * 2}px) 100%`,
      }}
    />
  );
};

export default LayoutGrid;
