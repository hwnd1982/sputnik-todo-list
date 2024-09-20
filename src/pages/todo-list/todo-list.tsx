import {Layout, theme } from 'antd';
import {TaskForm, TaskTable} from '../../widgets';
import { useAppStore } from '../../app';
import { useEffect } from 'react';

const { Header, Content } = Layout;

export function TodoList () {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const server = useAppStore(state => state.server);
  const colorBgServerState = {
    "idle": 'grey',
    "offline": 'grey',
    "pending": 'blue',
    "fulfilled": 'green',
    "rejected": 'red',
  };
  
  useEffect(() => {
    if (server.state === 'offline' || server.state === 'idle') {
      useAppStore.getState().update();
    }
  });

  return (
    <Layout>
      <Header className="header" style={{ display: 'flex', position: "sticky", top: 0, zIndex: 99, justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: "#fff" }}>
          <h3 style={{margin: 0}}>TodoList </h3>
        </div>
        <div style={{ color: "#fff" }}>
          <p style={{display: "flex", alignItems: "center"}}>
            <span style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              flexShrink: 0,
              boxShadow: 'rgba(0, 0, 0, .9) 3px 1px 10px 1px inset',
              backgroundColor: colorBgServerState[server.state],
              transition: '.4s'
            }}></span>
            <span style={{minWidth: '60px', textAlign: 'right'}}>
              {server.state}
            </span>
          </p>
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
