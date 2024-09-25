import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createServerSlice,
  IServerSlice,
  createTasksSlice,
  ITasksSlice,
  createFavoriteSlice,
  IFavoriteSlice,
} from "../../shared";

export type AppMiddleware = [["zustand/devtools", never]];
export interface AppStore extends ITasksSlice, IServerSlice, IFavoriteSlice {}
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
