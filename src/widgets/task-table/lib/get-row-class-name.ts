import { Task } from "../../../shared";

export const getRowClassName = (record: Task) => {
  switch (record.attributes.status) {
    case "open":
      return "bg-white";
    case "working":
      return "bg-blue";
    case "done":
      return "bg-green";
    default:
      return "bg-red";
  }
};
