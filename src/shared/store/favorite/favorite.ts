import { StateCreator } from "zustand";
import { AppMiddleware, AppStore } from "../../../app/store/store";

export interface FavoriteState {
  list: number[];
}

export interface FavoriteSlice {
  favorite: FavoriteState;
  addFavorite: (id: number) => void;
  deleteFavorite: (id: number) => void;
}

export const createFavoriteSlice: StateCreator<AppStore, AppMiddleware, [], FavoriteSlice> = (set, get) => ({
  favorite: {
    list: [],
  },
  addFavorite: id => {
    const { list } = get().favorite;

    set({
      favorite: {
        list: [...list, id],
      },
    });
  },
  deleteFavorite: id => {
    const list = get().favorite.list.filter(item => item !== id);

    set({
      favorite: { list },
    });
  },
});
