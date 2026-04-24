import { create } from "zustand";

interface UiStore {
    isTabVisible: boolean;
    setTabVisible: (visible: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    isTabVisible: true,
    setTabVisible: (visible: boolean) => set({ isTabVisible: visible }),
}));