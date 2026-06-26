import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_RECENT = 6;

type RecentState = {
  ids: string[];
  add: (id: string) => void;
};

export const useRecentlyViewed = create<RecentState>()(
  persist(
    (set) => ({
      ids: [],
      add: (id) =>
        set((state) => ({
          ids: [id, ...state.ids.filter((i) => i !== id)].slice(0, MAX_RECENT),
        })),
    }),
    { name: 'premora-recent' },
  ),
);
