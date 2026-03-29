import Style from '@/style/Side.module.scss'
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { BarChartOutlined, AppstoreOutlined, LockOutlined } from '@ant-design/icons';
import { ICON_CODE } from '@/common/IconFont'
import { useLocation, useNavigate } from 'react-router';

const items = [
  {
    label: '首页',
    key: '/home',
    icon: <ICON_CODE type="iconhome" />,
  },
  {
    label: 'echarts面板',
    key: '/home/echartsMask',
    icon: <BarChartOutlined />,
  },
  {
    icon: <AppstoreOutlined />,
    label: '系统管理',
    key: '/home/system',
    children: [
      {
        label: '角色',
        key: '/home/role',
      },
      {
        label: '部门',
        key: '/home/dept',
      },
      {
        label: '机构',
        key: '/home/tenant',
      },
      {
        label: '用户',
        key: '/home/users',
      },
      {
        label: '菜单',
        key: '/home/menuSet',
      },
      {
        label: '字典',
        key: '/home/dict',
      },
      {
        label: '全局字典',
        key: '/home/dictGlobal',
      },
    ]
  }
]

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
  const [current, setCurrent] = useState(locate.pathname);
  const [openKeys, setOpenKeys] = useState(getParentKeys(items, locate.pathname));

  useEffect(() => {
    setCurrent(locate.pathname)
    setOpenKeys(getParentKeys(items, locate.pathname))
  }, [locate.pathname])

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