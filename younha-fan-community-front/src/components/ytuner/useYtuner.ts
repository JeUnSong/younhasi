import { create } from "zustand";

type YtunerState = {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
};

export const useYtuner = create<YtunerState>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));