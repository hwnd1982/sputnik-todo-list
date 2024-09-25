import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Task } from '../../shared/store/tasks/tasks';
import { useAppStore } from '../../app/';
import { EndList } from './ui';
import { 
  idColumnConfig,
  descriptionColumnConfig,
  statusColumnConfig,
  dateColumnConfig,
  optionsColumnConfig,
  editableConfig
} from './config';
import { getRowClassName } from './lib';

export function TaskTable() {
  const { tasks, updatedTask } = useAppStore.getState();
  const columns: ProColumns<Task>[] = [
    idColumnConfig(),
    descriptionColumnConfig(),
    statusColumnConfig(tasks.filter),
    dateColumnConfig(),
    optionsColumnConfig(),
  ];

  return (
    <>
      <ProTable
        columns={columns}
        cardBordered={true}
        search={false}
        dataSource={tasks.list}
        rowClassName={getRowClassName}
        options={{reload: false, setting: false, density: false}}
        size='small'
        editable={editableConfig(updatedTask)}
        rowKey="id"
        dateFormatter="string"
        headerTitle="Список задач:"
        pagination={false}
      />
      { !tasks.end  && <EndList /> }
    </>
  )
};
