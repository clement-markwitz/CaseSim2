import AuthRedirectComponent from "@/components/AuthRedirectComponent";
import { useAuth } from "@/hooks/useAuth";
import LeaderboardsScreen from "@/screens/LeaderBoardScreen";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Spinner, Text } from "tamagui";



export default function LeaderbordsScreen() {
    const { user } = useAuth();

    if (!user) {
        return <AuthRedirectComponent page="Leaderboards" />;
    }
    return (
        <ErrorBoundary fallback={<Text>Error</Text>}>
            <Suspense fallback={<Spinner />}>
                <LeaderboardsScreen />
            </Suspense>
        </ErrorBoundary>
    );
}