import { forwardRef, useImperativeHandle } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { delItem, addItem, editItem } from "@/api/system/tenant";
import useCrudTable from "@/hooks/useCrudTable";
import PermButton from "@/components/PermButton";

const statusOptions = [
  { value: 1, label: "启用" },
  { value: 0, label: "禁用" },
];

const TenantBtn = forwardRef(({ selectData, getList }, ref) => {
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
  });

  useImperativeHandle(ref, () => ({
    editModal: openEditModal,
  }));

  return (
    <>
      <div className="btns">
        <PermButton perm="sys:tenant:add" className="btn" type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          新增
        </PermButton>
        <PermButton perm="sys:tenant:delete" type="primary" danger icon={<DeleteOutlined />} onClick={batchDel}>
          删除
        </PermButton>
      </div>

      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="base-form" labelCol={{ span: 4 }} form={form}>
          <Form.Item
            label="租户名称"
            name="name"
            rules={[{ required: true, message: "请输入租户名称", max: 50 }]}
          >
            <Input placeholder="请输入租户名称" />
          </Form.Item>
          <Form.Item label="联系地址" name="address">
            <Input placeholder="请输入联系地址" />
          </Form.Item>
          <Form.Item label="联系方式" name="contact">
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item
            label="租户状态"
            name="status"
            rules={[{ required: true, message: "请选择租户状态" }]}
          >
            <Select
              placeholder="请选择租户状态"
              style={{ width: 150 }}
              options={statusOptions}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default TenantBtn;