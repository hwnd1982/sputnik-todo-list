import {
  DeleteOutlined,
  CheckCircleFilled,
  CloseCircleFilled
} from '@ant-design/icons';
import { RowEditableConfig } from "@ant-design/pro-components";
import { Task } from "../../../shared";

type EditableConfig = (action: (id: number, status: string, description: string) => Promise<void>) => RowEditableConfig<Task>;

export const editableConfig: EditableConfig = (action) => ({
  type: 'multiple',
  cancelText: <CloseCircleFilled />,
  saveText: <CheckCircleFilled  style={{ color: 'green' }} />,
  deleteText: <DeleteOutlined  style={{ color: 'red' }} />,
  actionRender: (_row, _config, dom) => {
    return [dom.save, dom.cancel, dom.delete];
  },
  onSave: async (_key, record: Task & {index?: number, status?: string, description?: string}) => {
    if (record?.status && record?.description) {
      action(record.id, record?.status, record.description);
    }
  },
});
