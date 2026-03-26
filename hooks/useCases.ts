import { fetchCasesWithSkinsId } from '@/api/cases.api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useCases = () => {
    return useSuspenseQuery(
        {
            queryKey: ['cases'],
            queryFn: fetchCasesWithSkinsId,
            staleTime: 3600
        }
    )
}