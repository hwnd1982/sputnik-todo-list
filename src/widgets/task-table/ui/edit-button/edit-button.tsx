import { EditOutlined } from '@ant-design/icons';
import { ProCoreActionType } from '@ant-design/pro-components';

export function EditButton({id, action}: {id: number, action?: ProCoreActionType}) {
  const onClick = () => {
    if (action) {
      action.startEditable(id);
    }
  };

  return (
    <a onClick={onClick}>
        <EditOutlined />
    </a>
  )
}