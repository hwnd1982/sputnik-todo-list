import { ProColumnsConfig } from "./types";

export const descriptionColumnConfig: ProColumnsConfig = () => ({
  title: "Описание",
  key: "description",
  ellipsis: true,
  dataIndex: ["attributes", "description"],
  formItemProps: {
    rules: [
      {
        required: true,
        message: "Поле не должно быть пустым!",
        max: 300,
      },
    ],
  },
});
