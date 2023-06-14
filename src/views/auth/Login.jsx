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
        <p>登录</p>
        <Input
          value={userName}
          onChange={e => change(e, setUserName)}
        ></Input>
        <Input
          type='password'
          value={userPWD}
          onChange={e => change(e, setUserPWD)}
        ></Input>
        <Button className='btn' type="primary" onClick={() => navigate('/Home')}>登录</Button>
      </div>
    </div>
  )
}

export default Login