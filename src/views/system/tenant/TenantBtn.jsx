import { forwardRef, useImperativeHandle } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message } from 'antd';
import { delConfirm } from "@/utils/feedBack";
import { delItem, editItem, addItem } from "@/api/system/tenant";

import useCrud from "@/hooks/crud";

const TenantBtn = forwardRef(({ selectData, getList, ...props }, ref) => {

  const {
    isEdit,
    isModalOpen,
    form,
    allDel,
    add,
    handleCancel,
    handleOk,
  } = useCrud({
    selectData,
    getList,
    delApi: delItem,
    addApi: addItem,
    editApi: editItem,
    ref
  })

  const [statusOptions, setStatusOptions] = useState([
    { value: 1, label: '启用', status: 'success', color: 'green' },
    { value: 0, label: '禁用', status: 'error' },
  ])

  return (
    <>
      <div className="btns">
        <Button className="btn" type="primary" icon={<PlusOutlined />} onClick={add}>新增</Button>
        <Button type="primary" danger icon={<DeleteOutlined />} onClick={allDel}>删除</Button>
      </div>
      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          className="base-form"
          labelCol={{ span: 4 }}
          form={form}
        >
          <Form.Item
            label="租户名称"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入租户名称",
                max: 50,
              },
            ]}
          >
            <Input placeholder="请输入租户名称" />
          </Form.Item>
          <Form.Item
            label="联系地址"
            name="address"
          >
            <Input placeholder="请输入联系地址" />
          </Form.Item>
          <Form.Item
            label="联系方式"
            name="contact"
          >
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item
            label="租户状态"
            name="status"
            rules={[
              {
                required: true,
                message: "请选择租户状态",
              },
            ]}
          >
            <Select
              placeholder="请选择租户状态"
              style={{ width: 150 }}
              options={statusOptions}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
})

export default TenantBtn;