import { Outlet, useLocation } from 'react-router'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { useStartApp } from './startApp';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

function App() {
  useStartApp();

  const location = useLocation();

  return (
    <ConfigProvider locale={zhCN} >
      <Outlet key={location.pathname} />
    </ConfigProvider >
  )
}
export default App
