import { ProColumnsConfig } from "./types";

export const idColumnConfig: ProColumnsConfig = () => ({
  title: "№",
  dataIndex: "index",
  valueType: "indexBorder",
  className: "index-status",
  width: 32,
});
