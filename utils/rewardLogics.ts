export const getISOWeek = (dateParam: Date | string | number): { year: number; week: number } => {
    const date = new Date(dateParam);
    const dayOfWeek = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayOfWeek);
    const isoYear = date.getUTCFullYear();
    const firstDayOfYear = new Date(Date.UTC(isoYear, 0, 1));
    const diffInDays = (date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24);
    return { year: isoYear, week: Math.ceil((diffInDays + 1) / 7) };
};

export const checkCanClaimDaily = (lastDateStr: string | null | undefined): boolean => {
    if (!lastDateStr) return true; // Nouveau joueur

    const todayStr = new Date().toISOString().split('T')[0];
    const lastClaimStr = new Date(lastDateStr).toISOString().split('T')[0];

    return todayStr !== lastClaimStr;
};

export const checkCanClaimWeekly = (lastDateStr: string | null | undefined): boolean => {
    if (!lastDateStr) return true; // Nouveau joueur

    const now = new Date();
    const lastClaim = new Date(lastDateStr);

    const currentISO = getISOWeek(now);
    const lastISO = getISOWeek(lastClaim);

    return currentISO.year !== lastISO.year || currentISO.week !== lastISO.week;
};