
export const format2 = (n: number) => String(n).padStart(2, "0");

export const clampMax = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export const clampMin = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

export const normalizeHref = (href: string) => href.replace(/\/{2,}/g, "/");