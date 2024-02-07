import Style from '@/style/Header.module.scss'
import { Dropdown, Tooltip  } from 'antd'
import { DownOutlined, SmileOutlined, GithubOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react'
import userStore from '@/store/user'
const name = import.meta.env.VITE_NAME
function HeaderBar(props) {
  const nav = useNavigate()
  
  function dropClick({key}) {
    const eventMap = {
      1: () => {
        nav('/people')
      },
      2: () => {
        nav('/', {replace: true})
      }
    }
    eventMap[key]()
  }
  const items = [
    {
      key: '1',
      label: '个人中心'
    },
    {
      key: '2',
      label: '退出登录'
    },
  ]
  return (
    <div className={`${Style.header} ${props.className}`}>
      <div className='left'>
        <img src="/fac.jpg" alt="" />
        <span>{name}</span>
      </div>
      <div className='right'>
        <Tooltip title='项目github地址'>
          <a target='_blank' className='link' href="https://github.com/fenglingnan/react-vite-mobx">
            <GithubOutlined className='svgs' />
          </a>
        </Tooltip>
        <Tooltip title='一些小效果'>
          <ShareAltOutlined onClick={e => nav('/others')} className='svgs' />
        </Tooltip>
        <Dropdown
          menu={{
            items,
            onClick: dropClick
          }}
          placement="bottom"
          arrow
        >
          <span className='drop' onClick={(e) => e.preventDefault()}>
            {userStore.userName}
            <DownOutlined className='svgs'></DownOutlined>
          </span>
        </Dropdown>
      </div>
    </div>
  )
}

export default observer(HeaderBar)