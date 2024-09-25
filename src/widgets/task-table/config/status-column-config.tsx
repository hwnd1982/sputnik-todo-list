import { Filter } from "../../../shared";
import { ProColumnsConfig } from "./types";
import { FilterDropdown } from "../ui";

export const statusColumnConfig: ProColumnsConfig<Filter> = (filter: Filter) => ({
  disable: true,
  title: "Статус",
  width: 150,
  key: "status",
  dataIndex: ["attributes", "status"],
  filterMultiple: false,
  filters: [
    {
      value: "all",
      text: "Все",
    },
    {
      value: "open",
      text: "Создана",
    },
    {
      text: "Выполнена",
      value: "done",
    },
    {
      text: "В работе",
      value: "working",
    },
    {
      text: "Избранное",
      value: "favorite",
    },
  ],
  valueType: "select",
  className: "status-filter-select",
  formItemProps: {
    rules: [
      {
        required: true,
        message: "Поле не должно быть пустым!",
      },
    ],
  },

  valueEnum: {
    open: {
      text: "Создана",
      status: "open",
    },
    done: {
      text: "Выполнена",
      status: "done",
    },
    working: {
      text: "В работе",
      status: "working",
    },
  },
  filteredValue: [filter],
  filterDropdown(props) {
    if (!Array.isArray(this.filters)) return;

    return (
      <FilterDropdown prefixCls={props.prefixCls} confirm={props.confirm} filters={this.filters} />
    )
  },
});
