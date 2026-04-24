import ProfileScreen from "@/screens/ProfileScreen";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react-native";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button, Spinner } from "tamagui";

export const ProfileMe = () => {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }) => <Button icon={RefreshCcw} size="$5" onPress={resetErrorBoundary} />}
        >
            <Suspense fallback={<Spinner size="large" color="$yellow" marginTop={20} />}>
                <ProfileScreen />
            </Suspense>
        </ErrorBoundary>
    );
}

export default ProfileMe;
