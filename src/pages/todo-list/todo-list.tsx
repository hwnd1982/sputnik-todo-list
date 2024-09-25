import {Layout, theme } from 'antd';
import {TaskForm, TaskTable} from '../../widgets';
import { useAppStore } from '../../app';
import { useEffect } from 'react';
import { Content, Header, Status, StatusMarker, StatusText, Title } from './ui';

export function TodoList () {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const server = useAppStore(state => state.server);
  
  useEffect(() => {
    if (server.state === 'offline' || server.state === 'idle') {
      useAppStore.getState().update();
    }
  });

  return (
    <Layout>
      <Header>
        <div>
          <Title>TodoList</Title>
        </div>
        <div>
          <Status>
            <StatusMarker $state={server.state}></StatusMarker>
            <StatusText>{server.state}</StatusText>
          </Status>
        </div>
      </Header>
      <Content $bgColor={colorBgContainer}>
        <TaskForm />
        <TaskTable />
      </Content>
    </Layout>
  );
};
