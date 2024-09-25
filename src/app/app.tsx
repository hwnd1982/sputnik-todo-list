import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { TodoList } from '../pages';
import './global.scss'

export function App() {
  return (
    <>
      <ConfigProvider locale={ruRU}>
        <TodoList />
      </ConfigProvider>
    </>
  )
}
