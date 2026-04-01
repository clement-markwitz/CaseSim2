import CaseFreeScreen from '@/components/screens/CaseFreeScreen';
import { RefreshCcw } from '@tamagui/lucide-icons-2';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Spinner } from 'tamagui';

export default function CaseDetailScreen() {
  const { reset } = useQueryErrorResetBoundary();
  const { id } = useLocalSearchParams();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <Button icon={RefreshCcw} size="$5" onPress={resetErrorBoundary} />
      )}
    >
      <Suspense fallback={<Spinner size="large" color="$yellow" />}>
        <CaseFreeScreen caseId={id as string} />
      </Suspense>
    </ErrorBoundary>
  );
}
