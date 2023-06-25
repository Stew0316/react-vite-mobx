import { useState } from 'react'
import style from '@/style/Login.module.scss'
import { Input, Tooltip, Button } from 'antd';
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState('')
  const [userPWD, setUserPWD] = useState('')
  const navigate = useNavigate();
  const change = (e, func) => {
    func(e.target.value)
  }
  return (
    <div className={`${style.login} flex-center`}>
      <div className='cont'>
        <div className='left'>
          <img src="" alt="" />
        </div>
        <div className='right'>
          <div className='forms'>
            <div className='login-yet'>
              <span>账号登录</span>
              {/* <span>帮助</span> */}
            </div>
            <div className='inp'>
              <Input
                className='user'
                value={userName}
                placeholder='请输入账号'
                onChange={e => change(e, setUserName)}
              ></Input>
              <Input
                className='pwd'
                type='password'
                value={userPWD}
                placeholder='请输入密码'
                onChange={e => change(e, setUserPWD)}
              ></Input>
              <Button className='btn' type="primary" onClick={() => navigate('/home')} block>登录</Button>
            </div>
          </div>
          <div className='word'>
            <p>尚未创建账号？</p>
            <p>创建账号</p>
          </div>
        </div>
      </div>
    </div>
  )
}
/* 
        
         */
export default Login