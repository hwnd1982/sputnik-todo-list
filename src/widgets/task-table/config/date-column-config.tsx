import { ProColumnsConfig } from "./types";

export const dateColumnConfig: ProColumnsConfig = () => ({
  title: "Дата",
  width: 100,
  key: "createdAt",
  dataIndex: ["attributes", "createdAt"],
  valueType: "date",
  editable: false,
  hideInSearch: true,
  fieldProps(_, config) {
    return {
      ...config,
      format: "DD.MM.YYYY",
    };
  },
});
