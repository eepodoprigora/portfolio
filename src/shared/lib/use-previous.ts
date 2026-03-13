import { useEffect, useState } from "react";

export function usePrevious<T>(value: T) {
    const [previous, setPrevious] = useState<T | undefined>(undefined);
    const [current, setCurrent] = useState(value);

    useEffect(() => {
        if (current !== value) {
            setPrevious(current);
            setCurrent(value);
        }
    }, [value, current]);

    return previous;
}