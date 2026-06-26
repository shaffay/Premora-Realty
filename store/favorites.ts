import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SavedSearch = {
  id: string;
  query: string;
  label: string;
  createdAt: number;
};

type FavoritesState = {
  favorites: string[];
  savedSearches: SavedSearch[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  saveSearch: (query: string, label: string) => void;
  removeSearch: (id: string) => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      savedSearches: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),
      saveSearch: (query, label) =>
        set((state) => {
          if (state.savedSearches.some((s) => s.query === query)) return state;
          return {
            savedSearches: [
              {
                id: `${query}-${state.savedSearches.length}`,
                query,
                label,
                createdAt: state.savedSearches.length,
              },
              ...state.savedSearches,
            ].slice(0, 12),
          };
        }),
      removeSearch: (id) =>
        set((state) => ({
          savedSearches: state.savedSearches.filter((s) => s.id !== id),
        })),
    }),
    { name: 'premora-favorites' },
  ),
);
