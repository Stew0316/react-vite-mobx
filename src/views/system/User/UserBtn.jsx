import SelfBtn from "@/layout/SelfBtn";
import { useState, forwardRef, useImperativeHandle } from "react"
import { DownloadOutlined, UploadOutlined, UnlockOutlined, SettingOutlined, ReloadOutlined, UserOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const UserBtn = forwardRef(({ userOption, selectData, ...props }, ref) => {
  return (
    <div className="btns">
      <Button type="primary" className="btn" icon={<PlusOutlined />}>新增</Button>
      <Button type="primary" danger className="btn" icon={<DeleteOutlined />}>删除</Button>
      <SelfBtn color="#3dc263" className="btn" text="导入" icon={<UploadOutlined />}></SelfBtn>
      <SelfBtn color="#e6a23c" btn={<Button type="primary" className="btn"><DownloadOutlined /> 导出</Button>}></SelfBtn>
    </div>
  )

})

export default UserBtn;