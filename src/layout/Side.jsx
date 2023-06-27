import Style from '@/style/Side.module.scss'
import { Menu } from 'antd';
import { useState } from 'react';
import { BarChartOutlined, AppstoreOutlined, TableOutlined  } from '@ant-design/icons';
import { ICON_CODE } from '@/common/IconFont'
import { useLocation, useMatch, useNavigate  } from 'react-router';
//这里的key取路径的最后一部分/home/index取index，/home/index/test取test，方便刷新取location重新赋值
const items = [
  {
    label: '首页',
    key: '/home/',
    icon: <ICON_CODE type="iconhome" />,
  },
  {
    label: 'echarts面板',
    key: '/home/echartsMask',
    icon: <BarChartOutlined />,
  },
  {
    label: '表格表单',
    key: '/home/business',
    icon: <TableOutlined />,
  },
  {
    icon: <AppstoreOutlined />,
    label: '设置',
    children: [
      {
        label: '菜单',
        key: '/home/menuSet',
      },
      {
        label: '角色',
        key: '/home/role',
      },
      {
        label: '账号',
        key: '/home/account',
      },
    ]
  }
  // {
  //   label: 'Navigation Three - Submenu',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         {
  //           label: 'Option 1',
  //           key: 'setting:1',
  //         },
  //         {
  //           label: 'Option 2',
  //           key: 'setting:2',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'group',
  //       label: 'Item 2',
  //       children: [
  //         {
  //           label: 'Option 3',
  //           key: 'setting:3',
  //         },
  //         {
  //           label: 'Option 4',
  //           key: 'setting:4',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  //   key: 'alipay',
  // },
]

function Side(props) {
  
  const locate = useLocation()
  const navi = useNavigate()
  const mat = useMatch(locate.pathname)
  const [current, setCurrent] = useState(mat.pathname);
  const onClick = (e) => {
    setCurrent(e.key);
    if(e.key) {
      navi(e.key)
    }
  };
  return (
    <div className={`${props.className} ${Style.sidebar}`}>
      <Menu 
        style={{
          width: '100%',
        }}
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="inline" 
        items={items} 
      />
    </div>
  )
}

export default Side