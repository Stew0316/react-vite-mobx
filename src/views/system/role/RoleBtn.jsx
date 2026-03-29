import { forwardRef, useImperativeHandle, useMemo } from "react";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useCrudTable from "@/hooks/useCrudTable";
import { delItem, addItem, editItem } from "@/api/system/role";
import { useDictArray } from "@/hooks/dict";
import { stringToNumber } from '@/utils/dataChange';

const RoleBtn = forwardRef(({ selectData, getList }, ref) => {
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

  const statusOptions = useDictArray("common_status");
  const statusOptionsNum = useMemo(() => stringToNumber(statusOptions), [statusOptions]);

  useImperativeHandle(ref, () => ({
    editModal: openEditModal,
  }));

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <Button icon={<PlusOutlined />} style={{ marginRight: '8px' }} type="primary" onClick={openAdd}>新增</Button>
        <Button icon={<DeleteOutlined />} type="primary" danger onClick={batchDel}>删除</Button>
      </div>

      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="base-form" labelCol={{ span: 4 }} form={form}>
          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: "请输入角色名称", max: 50 }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item
            label="角色编码"
            name="code"
            rules={[{ required: true, message: "请输入角色编码", max: 50 }]}
          >
            <Input placeholder="请输入角色编码" />
          </Form.Item>
          <Form.Item
            label="角色排序"
            name="sort"
            rules={[{ required: true, message: "请输入角色排序", type: 'number' }]}
          >
            <InputNumber placeholder="请输入角色排序" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="角色状态"
            name="status"
            rules={[{ required: true, message: "请选择角色状态" }]}
          >
            <Select placeholder="请选择角色状态" style={{ width: '100%' }} options={statusOptionsNum}></Select>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default RoleBtn;