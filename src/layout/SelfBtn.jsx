import { ConfigProvider, Button } from "antd"
const SelfBtn = ({color, className, text, icon, ...props}) => {
  const BTN = <Button type="primary" className={className} icon={icon}>
    {text}
  </Button>
  return <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: `${color}`,
          colorPrimaryHover: `${color}`,
          colorPrimaryActive: `${color}`,
        },
      },
    }}
  >
    {props.btn ? props.btn :BTN}
  </ConfigProvider>
}

export default SelfBtn;