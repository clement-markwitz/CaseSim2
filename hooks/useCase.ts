import { fetchCasesWithSkinsId } from '@/api/cases.api';
import { Case } from '@/constants/case';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useCase = (caseId: string) => {
    return useSuspenseQuery({
        queryKey: ['cases'], // On tape dans le même cache global !
        queryFn: fetchCasesWithSkinsId,
        staleTime: 1000 * 60 * 60, // 1 heure
        // Magie : on extrait juste la caisse dont on a besoin
        select: (cases: Case[]) => cases.find((c) => c.id === caseId),
    });
};