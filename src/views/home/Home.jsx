import { useState, useEffect } from 'react'
import HeaderBar from '@/layout/Header'
import Side from '@/layout/Side'
import Style from '@/style/Home.module.scss'
import { Outlet, useLocation } from 'react-router'
import { useAuthStore } from '@/store/authStore';
import ActiveMenu from '@/layout/ActiveMenu';
import { AliveScope } from 'react-activation';
import { useTabStore } from '@/store/tabStore';
import { flattenMenuTree } from '@/router/DynamicOutlet';

const RefreshOutlet = () => {
  const refreshKey = useAuthStore((state) => state.refreshKey);
  return <Outlet key={refreshKey} />;
};

// 监听路由变化，自动注册标签页
const TabWatcher = () => {
  const location = useLocation();
  const userInfo = useAuthStore((state) => state.userInfo);
  const addTab = useTabStore((state) => state.addTab);

  useEffect(() => {
    const currentPath = location.pathname.replace(/^\/home/, '');
    const flatMenus = flattenMenuTree(userInfo?.menuTree);
    const matched = flatMenus.find((m) => m.path === currentPath);
    if (matched) {
      addTab({
        key: currentPath,
        title: matched.name,
        keepAlive: !!matched.isCache,
      });
    }
  }, [location.pathname]);

  return null;
};

function Home() {

  return (
    <div className={`${Style.Home}`}>
      <HeaderBar className='header'></HeaderBar>
      <div className='wrap'>
        <Side className='side'></Side>
        <div className='route'>
          <ActiveMenu></ActiveMenu>
          <AliveScope>
            <TabWatcher />
            <RefreshOutlet />
          </AliveScope>
        </div>
      </div>
    </div>
  )
}
export default Home