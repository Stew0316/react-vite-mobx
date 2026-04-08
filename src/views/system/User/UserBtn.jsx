import SelfBtn from "@/layout/SelfBtn";
import { useState, forwardRef, useImperativeHandle, useMemo } from "react"
import { DownloadOutlined, UploadOutlined, UnlockOutlined, SettingOutlined, ReloadOutlined, UserOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import useCrudTable from "@/hooks/useCrudTable";
import { delItem, addItem, editItem } from "@/api/system/user";
import { useDictArray } from "@/hooks/dict";
import { stringToNumber } from '@/utils/dataChange';

const UserBtn = forwardRef(({ getList, selectData, deptId, ...props }, ref) => {

  const defaultParams = useMemo(() => ({ deptId }), [deptId]);

  const {
    isEdit,
    isModalOpen,
    form,
    openAdd,
    openEditModal,
    handleCancel,
    handleOk,
    batchDel,
  } = useCrudTable({
    listApi: () => Promise.resolve({ records: [], total: 0 }),
    delApi: delItem,
    addApi: addItem,
    editApi: editItem,
    autoRequest: false,
    onSuccess: getList,
    externalSelectData: selectData,
    defaultParams
  });

  const statusOptions = useDictArray("common_status");
  const statusOptionsNum = useMemo(() => stringToNumber(statusOptions), [statusOptions]);

  useImperativeHandle(ref, () => ({
    editModal: openEditModal,
  }));

  return (
    <>
      <div className="btns">
        <Button type="primary" className="btn" icon={<PlusOutlined />} onClick={openAdd} disabled={!deptId}>新增</Button>
        <Button type="primary" danger className="btn" icon={<DeleteOutlined />} onClick={batchDel} disabled={!deptId}>删除</Button>
        <SelfBtn
          color="#3dc263"
          className="btn"
          text="导入"
          icon={<UploadOutlined />}
          disabled={!deptId}
        ></SelfBtn>
        <SelfBtn color="#e6a23c" btn={<Button type="primary" className="btn" disabled={!deptId}><DownloadOutlined /> 导出</Button>}></SelfBtn>
      </div>

      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="base-form" labelCol={{ span: 4 }} form={form}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名", max: 50 }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: !isEdit, message: "请输入密码", max: 50 }]}
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="用户昵称"
            name="nickname"
          >
            <Input placeholder="请输入用户昵称" />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号格式" }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { type: 'email', message: "请输入正确的邮箱格式" },
              { max: 50, message: "邮箱长度不能超过50个字符" }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select placeholder="请选择状态" style={{ width: '100%' }} options={statusOptionsNum}></Select>
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
          >
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )

})

export default UserBtn;