import {Layout, theme } from 'antd';
import {TaskForm, TaskTable} from '../../widgets';
import { useAppStore } from '../../app';
import { useEffect, useRef } from 'react';

const { Header, Content } = Layout;

export function TodoList () {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const serverRef = useRef(useAppStore(state => state.server));
  
  useEffect(() => {
    useAppStore.subscribe((state) => (serverRef.current = state.server));
    
    if (serverRef.current.state === 'offline' || serverRef.current.state === 'idle') {
      useAppStore.getState().update();
    }
  });

  return (
    <Layout>
      <Header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: "#fff" }}>
          <h3 style={{margin: 0}}>TodoList </h3>
        </div>
        <div style={{ color: "#fff" }}>
          <p>{serverRef.current.state}</p>
        </div>
      </Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <TaskForm />
        <TaskTable />
      </Content>
    </Layout>
  );
};
