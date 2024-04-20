import { useEffect, useState } from 'react'
import style from '@/style/Login.module.scss'
import { Input, Tooltip, Button,Form } from 'antd';
import { useNavigate } from "react-router-dom";
import { authCode, submit } from '@/api/auth/login';
import md5 from 'md5';
function Login() {
  const [username, setUserName] = useState('')
  const [password, setUserPWD] = useState('')
  const [code, setUserCode] = useState('')
  const [codePic, setCodePic] = useState('')
  const navigate = useNavigate();
  async function getCode() {
    let res = await authCode()
    setCodePic(res.image)
  }
  const onFinish = (values) => {
    console.log('Success:', values, md5(123));
    log({
      ...values,
      password: md5(values.password)
    })
  };
  const log = async (data) => {
    let res = await submit(data)
    console.log(res)
  }
  useEffect(() => {
    getCode()
    // console.log(1111)
  }, [])
  return (
    <div className={`${style.login} flex-center`}>
      <div className='cont'>
        <div className='left'>
          {/* <img src={codePic} alt="" /> */}
        </div>
        <div className='right'>
          <div className='forms'>
            <div className='login-yet'>
              <span>账号登录</span>
              {/* <span>帮助</span> */}
            </div>
            <div className='inp'>
              <Form
                name='loginForm'
                onFinish={onFinish}
              >
                <Form.Item
                  label=""
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ]}
                >
                  <Input placeholder='请输入用户名' />
                </Form.Item>
                <Form.Item
                  label=""
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                >
                  <Input.Password placeholder='请输入密码' />
                </Form.Item>
                <Form.Item
                  label=""
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ]}
                >
                  <Input
                    type='text'
                    className='code'
                    addonAfter={<img src={codePic} onClick={getCode} style={{
                      cursor: 'pointer'
                    }} />}
                    placeholder='请输入验证码'
                  >              
                  </Input>
                </Form.Item>
                <Form.Item
                  
                >
                  <Button  htmlType="submit" className='btn' type="primary" block>登录</Button>
                </Form.Item>
              </Form>
              
              
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