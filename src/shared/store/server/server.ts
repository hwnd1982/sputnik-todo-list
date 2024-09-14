import { StateCreator } from "zustand";
import { AppMiddleware, AppStore } from "../../../app/store/store";
import { TasksState } from "../tasks";
import { getFilterQuery } from "../../lib";

export type ServerError = {
  status: number;
  name: "string";
  message: "string";
  details: { [key: string]: string };
};

export interface ServerSlice {
  server: {
    state: "idle" | "offline" | "pending" | "fulfilled" | "rejected";
    status: number | null;
    error: ServerError | null;
    request: string | null;
  };
  pending: (request: string | null) => void;
  fulfilled: (tasks: TasksState) => void;
  rejected: (status: number, error: ServerError, request: string) => void;
  update: () => void;
}

export const createServerSlice: StateCreator<AppStore, AppMiddleware, [], ServerSlice> = (set, get) => ({
  server: {
    state: "idle",
    status: null,
    error: null,
    request: null,
  },
  pending: request => {
    set({
      server: {
        state: "pending",
        status: 0,
        error: null,
        request,
      },
    });
  },
  fulfilled: tasks => {
    set({
      server: {
        state: "fulfilled",
        status: 200,
        error: null,
        request: null,
      },
      tasks,
    });
  },
  rejected: (status, error, request) => {
    set({
      server: {
        state: "rejected",
        status,
        error,
        request,
      },
    });
  },
  update: async () => {
    const limit = get().tasks.list.length;
    const { filter, sort } = get().tasks;
    const request = `${import.meta.env.VITE_API_URL}/tasks2?sort=${sort}${getFilterQuery(filter)}${
      limit ? `&pagination[limit]=${limit}` : ""
    }`;

    get().pending(request);
    setTimeout(get().getTasks, 3000, true);
  },
});
