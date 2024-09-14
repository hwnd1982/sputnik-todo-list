import axios from "axios";
import { StateCreator } from "zustand";
import { AppMiddleware, AppStore } from "../../../app/store/store";
import { ServerError } from "../server/server";
import { getFilterQuery } from "../../lib";

export type Status = "open" | "done" | "working";
export type Filter = Status | "favorite" | "all";
export function isFilter(value: string): value is Filter {
  return ["open", "done", "working", "favorite", "all"].includes(value);
}

export interface Task {
  id: number;
  attributes: {
    description: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}

export interface MetaState {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface TasksState {
  list: Task[];
  page: number;
  end: boolean;
  sort: string;
  filter: Filter;
  meta: MetaState;
}

export interface TasksSlice {
  tasks: TasksState;
  nextPage: () => Promise<void>;
  getTasks: (update?: boolean) => Promise<void>;
  createTask: (description: string) => Promise<void>;
  updatedTask: (id: number, status: string, description: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setFilter: (filter: Filter) => Promise<void>;
}

export interface Fulfilled {
  status: 200;
  data: {
    data: Task[];
    meta: {
      pagination: MetaState;
    };
  };
}

export interface Rejected {
  status: 400 | 401 | 403 | 404 | 500;
  data: object;
  error: ServerError;
}

export type Payload = Fulfilled | Rejected;

export const createTasksSlice: StateCreator<AppStore, AppMiddleware, [], TasksSlice> = (set, get) => ({
  tasks: {
    list: [],
    page: 1,
    sort: "createdAt",
    filter: "all",
    end: false,
    meta: {
      page: 0,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
  nextPage: async () => {
    const tasks = get().tasks;
    const { pageCount } = tasks.meta;
    const nextPage = tasks.page < pageCount ? tasks.page + 1 : tasks.page;

    set({
      tasks: {
        ...tasks,
        page: nextPage,
      },
    });

    await get().getTasks();
  },
  setFilter: async (filter: Filter) => {
    const tasks = get().tasks;

    set({
      tasks: {
        ...tasks,
        filter,
        page: 0,
        end: false,
      },
    });

    await get().getTasks(true);
  },
  getTasks: async (update = false) => {
    const { page, sort, filter } = get().tasks;
    const request =
      get().server.request ||
      `${import.meta.env.VITE_API_URL}/tasks2?sort=${sort}${getFilterQuery(filter)}${
        page > 1 ? `&pagination[page]=${page}` : ""
      }`;

    if (!request) return;

    get().pending(request);

    try {
      const payload: Payload = await axios(request, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
          "Content-Type": "application/json",
        },
      });

      if (payload.status === 200) {
        const { data } = payload;
        const { tasks } = get();
        const list = [
          ...(update ? [] : tasks.list),
          ...(update ? data.data : data.data.filter(item => !tasks.list.find(({ id }) => item.id === id))),
        ];
        const end = data.meta.pagination.total <= list.length;

        get().fulfilled({
          ...tasks,
          page: update ? 0 : tasks.page,
          list,
          end,
        });
      } else {
        const { status, error } = payload;

        get().rejected(status, error, request);

        if (status === 500) {
          setTimeout(get().getTasks, 5000, true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  createTask: async description => {
    get().pending(null);

    try {
      const payload: Payload = await axios(`${import.meta.env.VITE_API_URL}/tasks2`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ data: { status: "open", description } }),
      });

      if (payload.status === 200) {
        await get().getTasks(true);
      } else {
        get().fulfilled({ ...get().tasks });
      }
    } catch (err) {
      console.log(err);
    }
  },
  updatedTask: async (id, status, description) => {
    get().pending(null);

    try {
      const payload: Payload = await axios(`${import.meta.env.VITE_API_URL}/tasks2/${id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ data: { status, description } }),
      });

      if (payload.status === 200) {
        await get().getTasks(true);
      } else {
        get().fulfilled({ ...get().tasks });
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteTask: async id => {
    get().pending(null);

    try {
      const payload: Payload = await axios(`${import.meta.env.VITE_API_URL}/tasks2/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
          "Content-Type": "application/json",
        },
      });

      if (payload.status === 200) {
        await get().getTasks(true);
      } else {
        get().fulfilled({ ...get().tasks });
      }
    } catch (err) {
      console.log(err);
    }
  },
});
