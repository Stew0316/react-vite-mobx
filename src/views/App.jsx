import { Outlet } from 'react-router'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { useStartApp } from './startApp';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

function App() {
  useStartApp();

  return (
    <ConfigProvider locale={zhCN} >
      <Outlet />
    </ConfigProvider >
  )
}
export default App
