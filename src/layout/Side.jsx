import Style from '@/style/Side.module.scss'
import { Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import * as Icons from '@ant-design/icons';
import { ICON_CODE } from '@/common/IconFont'
import { useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '@/store/authStore';

// 根据 icon 字符串名称动态渲染 Ant Design 图标
const renderIcon = (iconName) => {
  if (!iconName || !Icons[iconName]) return null;
  const Icon = Icons[iconName];
  return <Icon />;
};

// menuTree → Ant Design Menu items（保留树结构）
// menuType: 0=目录, 1=菜单(页面), 2=按钮(跳过)
const buildMenuItems = (tree) =>
  (tree ?? [])
    .filter((item) => item.isVisible && item.menuType !== 2)
    .map((item) => {
      if (item.menuType === 0) {
        return {
          key: String(item.id),
          label: item.name,
          icon: renderIcon(item.icon),
          children: item.children?.length ? buildMenuItems(item.children) : undefined,
        };
      }
      return {
        key: `/home${item.path}`,
        label: item.name,
        icon: renderIcon(item.icon),
      };
    });

// 固定菜单项（不受后台配置影响）
const FIXED_ITEMS = [
  {
    label: '首页',
    key: '/home',
    icon: <ICON_CODE type="iconhome" />,
  },
  {
    label: 'echarts面板',
    key: '/home/echartsMask',
    icon: <Icons.BarChartOutlined />,
  },
];

const getParentKeys = (menuItems, targetKey, parentKeys = []) => {
  for (const item of menuItems) {
    if (item.key === targetKey) {
      return parentKeys;
    }

    if (item.children) {
      const matchedParentKeys = getParentKeys(item.children, targetKey, [...parentKeys, item.key]);

      if (matchedParentKeys.length) {
        return matchedParentKeys;
      }
    }
  }

  return [];
}

function Side(props) {
  const locate = useLocation()
  const navi = useNavigate()
  const userInfo = useAuthStore((state) => state.userInfo);

  const items = useMemo(
    () => [...FIXED_ITEMS, ...buildMenuItems(userInfo?.menuTree)],
    [userInfo?.menuTree]
  );

  const [current, setCurrent] = useState(locate.pathname);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    setCurrent(locate.pathname)
    setOpenKeys(getParentKeys(items, locate.pathname))
  }, [locate.pathname, items])

  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key) {
      navi(e.key)
    }
  };

  const onOpenChange = (keys) => {
    setOpenKeys(keys)
  }

  return (
    <div className={`${props.className} ${Style.sidebar}`}>
      <Menu
        className='menus'
        style={{
          width: '100%',
          height: '100%',
        }}
        onClick={onClick}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </div>
  )
}

export default Side