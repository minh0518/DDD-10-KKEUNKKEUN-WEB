import { create } from 'zustand';

interface FlyOutStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useFlyoutStore = create<FlyOutStore>((set) => ({
  isOpen: false,
  toggle: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));
