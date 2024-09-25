import { DeleteOutlined } from '@ant-design/icons';
import { message, Popconfirm } from 'antd';
import { useAppStore } from '../../../../app';
import { RedLink } from '../red-link';

export function DeleteButton({id}: { id: number }) {
  const { deleteTask } = useAppStore.getState();
  const onConfirm = () => {
    deleteTask(id);
    message.info('Задача будет удалена.');
  } 
  
  return (
    <RedLink>
      <Popconfirm
        placement="top"
        title={"Удалить задачу?"}
        onConfirm={onConfirm}
        okText="Да"
        cancelText="Нет"
      >
        <DeleteOutlined />
      </Popconfirm>
    </RedLink>
  )
}
