import { Filter } from "..";
import { useAppStore } from "../../app";

export function getFilterQuery(filter: Filter) {
  switch (filter) {
    case "all":
      return "";
    case "favorite": {
      const favorite = useAppStore.getState().favorite.list;

      return favorite.length ? favorite.map(id => `&filters[id]=${id}`).join("") : `&filters[id]=${-1}`;
    }
    default:
      return `&filters[status]=${filter}`;
  }
}
