import { forwardRef, useImperativeHandle } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { delItem, addItem, editItem } from "@/api/crm/tag";
import useCrudTable from "@/hooks/useCrudTable";
import PermButton from "@/components/PermButton";

const TagBtn = forwardRef(({ selectData, getList }, ref) => {
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
        <PermButton perm="crm:tag:add" className="btn" type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          新增
        </PermButton>
        <PermButton perm="crm:tag:delete" type="primary" danger icon={<DeleteOutlined />} onClick={batchDel}>
          删除
        </PermButton>
      </div>

      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="base-form" labelCol={{ span: 6 }} form={form}>
          <Form.Item
            label="标签名称"
            name="name"
            rules={[{ required: true, message: "请输入标签名称", max: 50 }]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>
          <Form.Item label="标签颜色" name="color">
            <Input placeholder="请输入颜色值，如 blue、#1890ff" />
          </Form.Item>
          <Form.Item label="排序" name="sort" initialValue={0}>
            <InputNumber min={0} style={{ width: "100%" }} placeholder="请输入排序号" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default TagBtn;
