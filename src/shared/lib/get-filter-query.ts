import { Filter } from "..";
import { useAppStore } from "../../app";

export function getFilterQuery(filter: Filter) {
  switch (filter) {
    case "all":
      return "";
    case "favorite":
      return useAppStore
        .getState()
        .favorite.list.map(id => `&filters[id]=${id}`)
        .join("");
    default:
      return `&filters[status]=${filter}`;
  }
}
