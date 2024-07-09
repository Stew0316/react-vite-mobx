import { Button, Flex } from "antd";
const UserBtn = () => {
  return (
    <div className="btns">
      <Button type="primary" className="btn">新增</Button>
      <Button type="primary" danger className="btn">删除</Button>
      <Button className="btn">角色配置</Button>
    </div>
  )

}

export default UserBtn;