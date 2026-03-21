import { Button, Modal, Form, Input, Radio } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { delItem, addItem, editItem } from "@/api/system/dict";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import useCrudTable from "@/hooks/useCrudTable";
import { SOURCE_SYSTEM_OPTIONS, SOURCE_SYSTEM_DEFAULT } from "@/constant/system";
import DictConfigDialog from "./DictConfigDialog";

const DictBtn = forwardRef(({ selectData, getList, isGlobal = false }, ref) => {
  const dialogRef = useRef();
  const [configData, setConfigData] = useState({});
  const {
    isEdit,
    isModalOpen,
    form,
    openAdd,
    openEditModal, // ✅ 补上解构
    handleCancel,
    handleOk,
    batchDel,
  } = useCrudTable({
    listApi: () => Promise.resolve({ records: [], total: 0 }),
    delApi: delItem,
    addApi: (data) => addItem({ ...data, isGlobal }),
    editApi: (data) => editItem({ ...data, isGlobal }),
    autoRequest: false,
    onSuccess: getList,
    externalSelectData: selectData,
  });

  // openEditModal 内部已经包含 setFieldsValue + setIsModalOpen，直接透传即可
  useImperativeHandle(ref, () => ({
    editModal: openEditModal,
    openConfig: (data) => {
      setConfigData(data);
      dialogRef.current?.openDialog(data.id);
    },
  }));

  return (
    <>
      <div style={{ marginBottom: "12px" }}>
        <Button
          icon={<PlusOutlined />}
          style={{ marginRight: "8px" }}
          type="primary"
          onClick={openAdd}
        >
          新增
        </Button>
        <Button icon={<DeleteOutlined />} type="primary" danger onClick={batchDel}>
          删除
        </Button>
      </div>

      <DictConfigDialog ref={dialogRef} configData={configData} />

      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isGlobal && (
          <div style={{ marginBottom: 12, padding: "6px 12px", background: "var(--ant-color-warning-bg, #fffbe6)", border: "1px solid var(--ant-color-warning-border, #ffe58f)", borderRadius: 6, fontSize: 13, color: "var(--ant-color-warning, #faad14)" }}>
            当前正在编辑全局字典，修改将对所有租户生效
          </div>
        )}
        <Form
          className="base-form"
          labelCol={{ span: 8 }}
          initialValues={{ status: 1, sourceSystem: SOURCE_SYSTEM_DEFAULT }}
          form={form}
        >
          <Form.Item
            label="字典编号"
            name="code"
            rules={[{ required: true, message: "请输入字典编号", max: 50 }]}
          >
            <Input placeholder="请输入字典编号" />
          </Form.Item>
          <Form.Item
            label="字典名称"
            name="name"
            rules={[{ required: true, message: "请输入字典名称", max: 50 }]}
          >
            <Input placeholder="请输入字典名称" />
          </Form.Item>
          <Form.Item label="外部平台字典类型编码" name="externalCode">
            <Input placeholder="请输入外部平台字典类型编码" />
          </Form.Item>
          <Form.Item label="外部平台字典类型名称" name="externalName">
            <Input placeholder="请输入外部平台字典类型名称" />
          </Form.Item>
          <Form.Item
            label="是否启用"
            name="status"
            rules={[{ required: true, message: "请选择是否启用" }]}
          >
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="来源"
            name="sourceSystem"
            rules={[{ required: true, message: "请选择来源" }]}
          >
            <Select
              placeholder="请选择来源"
              style={{ width: 120 }}
              options={SOURCE_SYSTEM_OPTIONS}
            />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default DictBtn;