import { StateCreator } from "zustand";
import { AppMiddleware, AppStore } from "../../../app/store/store";
import { ITasksState } from "../tasks";
import { getFilterQuery } from "../../lib";

export type ServerError = {
  status: number;
  name: "string";
  message: "string";
  details: { [key: string]: string };
};

export type ServerState = "idle" | "offline" | "pending" | "fulfilled" | "rejected";

export interface IServerSlice {
  server: {
    state: ServerState;
    status: number | null;
    error: ServerError | null;
    request: string | null;
  };
  pending: (request: string | null) => void;
  fulfilled: (tasks: ITasksState) => void;
  rejected: (status: number, error: ServerError, request: string) => void;
  update: () => void;
}

export const createServerSlice: StateCreator<AppStore, AppMiddleware, [], IServerSlice> = (set, get) => ({
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
    const request = `${import.meta.env.VITE_API_URL}?sort=${sort}${getFilterQuery(filter)}${
      limit ? `&pagination[limit]=${limit}` : ""
    }`;

    get().pending(request);
    setTimeout(get().getTasks, 3000, true);
  },
});
