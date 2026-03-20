import { timeout } from '@/shared/lib/timeout';

export const curtain = (): Promise<void> =>
    new Promise(async (resolve) => {
        document.body.classList.add('is-page-leaving');
        await timeout(1000);
        document.body.classList.remove('is-page-leaving');
        resolve();
    });
