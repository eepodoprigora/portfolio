import { timeout } from '@/shared/lib/timeout';

export const leaveInstant = (): Promise<void> => timeout(50).then(() => Promise.resolve());
