import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createServerSlice,
  ServerSlice,
  createTasksSlice,
  TasksSlice,
  createFavoriteSlice,
  FavoriteSlice,
} from "../../shared";

export type AppMiddleware = [["zustand/devtools", never]];
export interface AppStore extends TasksSlice, ServerSlice, FavoriteSlice {}
export const useAppStore = create<AppStore>()(
  persist(
    (set, get, ...args) => ({
      ...createTasksSlice(set, get, ...args),
      ...createServerSlice(set, get, ...args),
      ...createFavoriteSlice(set, get, ...args),
    }),
    {
      name: "app-todo-store",
      partialize: state => ({
        tasks: state.tasks,
        favorite: state.favorite,
        server: {
          state: "offline",
        },
      }),
    }
  )
);
