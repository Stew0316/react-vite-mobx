import { useEffect, useState } from 'react'
import style from '@/style/Login.module.scss'
import { Input, Tooltip, Button, Form } from 'antd';
import { useNavigate } from "react-router-dom";
import { authCode, submit } from '@/api/auth/login';
import md5 from 'md5';
import { LOCAL_ENV } from "@/common/localData";
import { useAuthStore } from "@/store/authStore";
function Login() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [username, setUserName] = useState('')
  const [password, setUserPWD] = useState('')
  const [code, setUserCode] = useState('')
  const [codePic, setCodePic] = useState('')
  const [captchaKey, setCaptchaKey] = useState('')
  const navigate = useNavigate();
  async function getCode() {
    let res = await authCode()
    setCaptchaKey(res.captchaKey)
    setCodePic(res.captchaImage)
  }
  const onFinish = (values) => {
    log({
      ...values,
      captchaKey,
    })
  };
  const log = async (data) => {
    let res = await submit(data).catch(() => {
      getCode()
    })
    localStorage.setItem(LOCAL_ENV.VITE_MAIN_KEY + '-token', res.token)
    setAuth(res.token, null)
    navigate('/home')
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
                  name="tenantId"
                  rules={[
                    {
                      required: true,
                      message: '请输入公司ID',
                    },
                  ]}
                >
                  <Input placeholder='请输入公司ID' />
                </Form.Item>
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
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ]}
                >
                  <Space.Compact style={{ width: '100%' }}>
                    <Input
                      type='text'
                      className='captcha'
                      placeholder='请输入验证码'
                    >
                    </Input>
                    <img className='codeWrap' src={codePic} onClick={getCode} />
                  </Space.Compact>
                </Form.Item>
                <Form.Item

                >
                  <Button htmlType="submit" className='btn' type="primary" block>登录</Button>
                </Form.Item>
              </Form>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
/* 
        
         */
export default Login