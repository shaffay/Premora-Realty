import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_COMPARE = 3;

type CompareState = {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  isComparing: (id: string) => boolean;
  isFull: () => boolean;
};

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => {
          if (state.ids.includes(id)) {
            return { ids: state.ids.filter((i) => i !== id) };
          }
          if (state.ids.length >= MAX_COMPARE) return state;
          return { ids: [...state.ids, id] };
        }),
      remove: (id) => set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
      clear: () => set({ ids: [] }),
      isComparing: (id) => get().ids.includes(id),
      isFull: () => get().ids.length >= MAX_COMPARE,
    }),
    { name: 'premora-compare' },
  ),
);

export { MAX_COMPARE };
