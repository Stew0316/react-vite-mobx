import Style from '@/style/Side.module.scss'
import { Menu } from 'antd';
import { useState } from 'react';
import { MailOutlined, SettingOutlined, AppstoreOutlined  } from '@ant-design/icons';
import { ICON_CODE } from '@/common/IconFont'
import { useLocation, useMatch  } from 'react-router';
//这里的key取路径的最后一部分/home/index取index，/home/index/test取test，方便刷新取location重新赋值
const items = [
  {
    label: '首页',
    key: 'index',
    icon: <ICON_CODE type="iconhome" />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
]

function Side(props) {
  const [current, setCurrent] = useState('index');
  const locate = useLocation()
  const mat = useMatch(locate.pathname)
  console.log(mat)
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className={`${props.className} ${Style.sidebar}`}>
      <Menu style={{
        width: '100%',
      }} onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />;
    </div>
  )
}

export default Side