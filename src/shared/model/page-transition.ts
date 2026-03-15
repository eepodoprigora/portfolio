import { create } from 'zustand';

export type PageTransitionName = 'default' | 'instant';

export const DEFAULT_MODE = 'wait';
export const DEFAULT_NAME = 'default';

type State = {
    mode: 'wait' | 'sync' | 'popLayout';
    name: PageTransitionName;
    targetElement?: Element | null;
    nextPathname?: string;
    isTransitioning: boolean;
    isLoading?: boolean;
};

type Action = {
    setPageTransition: (transition: Omit<State, 'isTransitioning' | 'nextPathname'>) => void;
    setIsTransitioning: (bool: boolean) => void;
    setIsLoading: (bool: boolean) => void;
    setNextPathname: (pathname: string) => void;
};

export const usePageTransitionStore = create<State & Action>((set) => ({
    mode: DEFAULT_MODE,
    name: DEFAULT_NAME,
    isTransitioning: false,
    isLoading: false,
    setPageTransition: (transition) => set(() => transition),
    setIsTransitioning: (bool) => set({ isTransitioning: bool }),
    setIsLoading: (bool) => set({ isLoading: bool }),
    setNextPathname: (pathname) => set({ nextPathname: pathname }),
}));
