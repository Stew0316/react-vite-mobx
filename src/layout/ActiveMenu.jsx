import { Tag } from 'antd';
import { useTabStore } from '@/store/tabStore';
import { useNavigate, useLocation } from 'react-router';
import { useAliveController } from 'react-activation';

const HOME_PATH = '/home';

const ActiveMenu = () => {
  const { tabs, removeTab, setActiveKey } = useTabStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { drop } = useAliveController();

  // 直接从路由推导当前激活的 key，刷新也能正确高亮
  const currentKey = location.pathname.replace(/^\/home/, '');
  const isHomeActive = currentKey === '' || currentKey === '/';

  const handleClose = (e, key) => {
    e.stopPropagation();
    const tab = tabs.find((t) => t.key === key);
    if (tab?.keepAlive) drop(key);
    removeTab(key);
    const { activeKey: nextKey } = useTabStore.getState();
    if (nextKey) {
      navigate(`/home${nextKey}`);
    } else {
      // 没有其他 tab 了，回到首页
      navigate(HOME_PATH);
    }
  };

  const handleClick = (key) => {
    setActiveKey(key);
    navigate(`/home${key}`);
  };

  const handleHomeClick = () => {
    setActiveKey('');
    navigate(HOME_PATH);
  };

  return (
    <div style={{ padding: '4px 8px', background: '#f5f5f5', display: 'flex', gap: 4, flexWrap: 'wrap', minHeight: 32 }}>
      {/* 固定首页 tab，不可关闭 */}
      <Tag
        color={isHomeActive ? 'blue' : 'default'}
        onClick={handleHomeClick}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        首页
      </Tag>
      {tabs.map((tab) => (
        <Tag
          key={tab.key}
          color={!isHomeActive && currentKey === tab.key ? 'blue' : 'default'}
          closable
          onClose={(e) => handleClose(e, tab.key)}
          onClick={() => handleClick(tab.key)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          {tab.title}
        </Tag>
      ))}
    </div>
  );
};

export default ActiveMenu;