import { ProColumns } from "@ant-design/pro-components";
import { Task } from "../../../shared";

export type ProColumnsConfig<T = void> = (dat: T) => ProColumns<Task>;
