import {
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  HeartFilled} from '@ant-design/icons';

import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Popconfirm } from 'antd';
import { Task, isFilter } from '../../shared/store/tasks/tasks';
import { useAppStore } from '../../app/';
import { useEffect, useRef } from 'react';
import { EndList } from './ui';

export function TaskTable() {
  const tasks = useAppStore.getState().tasks;
  const favorite = useAppStore.getState().favorite;
  const favoriteRef = useRef(useAppStore(state => state.favorite));
  let filter = tasks.filter;
  
  useEffect(() => {
    useAppStore.subscribe((state) => (favoriteRef.current = state.favorite));
  })
  
  const columns: ProColumns<Task>[] = [
    {
      title: '№',
      dataIndex: 'index',
      valueType: 'indexBorder',
      className: 'index-status',
      width: 32,
    },
    {
      title: 'Описание',
      key: 'description',
      ellipsis: true,
      dataIndex: ['attributes', 'description'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Поле не должно быть пустым!',
            max: 300
          },
        ],
      },
    },
    {
      disable: true,
      title: 'Статус',
      width: 150,
      key: 'status',
      dataIndex: ['attributes', 'status'],
      filterMultiple: false,
      defaultFilteredValue: ['all'],
      filteredValue: [tasks.filter],
      filterResetToDefaultFilteredValue: true,
      onFilter: (value, record) => {
        if (filter === value) return true;

        if (typeof value === "string" && isFilter(value)) {
          useAppStore.getState().setFilter(value);
          filter = value;
        }

        return value === record.attributes.status;
      },
      
      valueType: 'select',
      className: 'status-filter-select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Поле не должно быть пустым!'
          },
        ],
      },
      filters: [
        
        {
          value: 'all',
          text: 'Все',
        },
        {
          value: 'open',
          text: 'Создана',
        },
        {
          text: 'Выполнена',
          value: 'done',
        },
        {
          text: 'В работе',
          value: 'working',
        },
        {
          text: 'Избранное',
          value: 'favorite',
        },
      ],
      valueEnum: {
        open: {
          text: 'Создана',
          status: 'open',
        },
        done: {
          text: 'Выполнена',
          status: 'done',
        },
        working: {
          text: 'В работе',
          status: 'working',
        },
      },
    },
    {
      title: 'Дата',
      width: 100,
      key: 'createdAt',
      dataIndex: ['attributes', 'createdAt'],
      valueType: 'date',
      editable: false,
      hideInSearch: true,
      fieldProps(_, config) {
        return {
          ...config,
          format:"DD.MM.YYYY"
        }
      },
    },
    {
      valueType: 'option',
      width: 80,
      key: 'option',
      
      render: (_text, record, _, action) => [  
        <a
          key={`edit-${record.id}`}
          onClick={() => action?.startEditable?.(record.id)}
        >
          <EditOutlined />
        </a>,
        <a
          key={`delete-${record.id}`}
          style={{ color: 'red' }}
        >
          <Popconfirm
            placement="top"
            title={"Удалить задачу?"}
            onConfirm={() => {
              useAppStore.getState().deleteTask(record.id);
              message.info('Задача будет удалена.');
            }}
            okText="Да"
            cancelText="Нет"
          >
            <DeleteOutlined />
          </Popconfirm>
        </a>,
        <a
          style={{ color: 'red' }}
          key={`favorite-${record.id}`}
          onClick={() => {
            if (favorite.list.includes(record.id)) {
              useAppStore.getState().deleteFavorite(record.id);
            } else {
              useAppStore.getState().addFavorite(record.id)
            }
          }}
        >
          {favorite.list.includes(record.id) ? <HeartFilled /> : <HeartOutlined /> }
        </a>,
      ]
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        cardBordered={true}
        search={false}
        dataSource={tasks.list}
        rowClassName={(record) => {
          switch(record.attributes.status) {
            case "open": return 'bg-white';
            case "working": return 'bg-blue';
            case "done": return 'bg-green';
            default: return 'bg-white';
          }
        }}
        options={{reload: false, setting: false, density: false}}
        size='small'
        editable={{
          type: 'multiple',
          cancelText: <CloseCircleFilled />,
          saveText: <CheckCircleFilled  style={{ color: 'green' }} />,
          deleteText: <DeleteOutlined  style={{ color: 'red' }} />,
                  actionRender: (_row, _config, dom) => {
            return [dom.save, dom.cancel, dom.delete];
          },
          onSave: async (_key, record: Task & {index?: number, status?: string, description?: string}) => {
            if (record?.status && record?.description) {
              useAppStore.getState().updatedTask(record.id, record?.status, record.description);
            }
          },
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="Список задач:"
        pagination={false}
      />
      { !tasks.end  && <EndList /> }
    </>
  )
};
