import { demoTheme, realTheme } from "@/constants/Colors";
import { useDemoStore } from "@/stores/demoStore";

export const useAppTheme = () => {
    const { mode } = useDemoStore();
    return mode === "demo" ? demoTheme : realTheme;
}