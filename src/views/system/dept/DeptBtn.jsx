import { forwardRef, useImperativeHandle, useMemo } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { delItem, addItem, editItem, getTree } from "@/api/system/dept";
import useCrudTable from "@/hooks/useCrudTable";
import { useDictArray } from "@/hooks/dict";
import { stringToNumber } from '@/utils/dataChange';

const DeptBtn = forwardRef(({ selectData, getList }, ref) => {

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
  })

  const [parentOptions, setParentOptions] = useState([]);
  const statusOptions = useDictArray("common_status");
  const statusOptionsNum = useMemo(() => stringToNumber(statusOptions), [statusOptions]);

  const getParentOptions = async () => {
    const res = await getTree();
    setParentOptions(res);
  }

  const handleOpenEdit = async (record) => {
    await getParentOptions();
    openAdd(record);
  }

  const openModal = async (data) => {
    await getParentOptions();
    openEditModal(data);
  }

  useImperativeHandle(ref, () => ({
    editModal: openModal,
  }));

  return (
    <>
      <div className="btns">
        <Button className="btn" type="primary" icon={<PlusOutlined />} onClick={handleOpenEdit}>
          新增
        </Button>
        <Button type="primary" danger icon={<DeleteOutlined />} onClick={batchDel}>
          删除
        </Button>
      </div>

      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="base-form" labelCol={{ span: 4 }} form={form}>
          <Form.Item
            label="上级部门"
            name="parentId"
          >
            <TreeSelect
              placeholder="请选择上级部门"
              style={{ width: '100%' }}
              treeData={parentOptions}
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              allowClear
            ></TreeSelect>
          </Form.Item>
          <Form.Item
            label="部门名称"
            name="name"
            rules={[{ required: true, message: "请输入部门名称", max: 50 }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item
            label="部门排序"
            name="sort"
            rules={[{ required: true, message: "请输入部门排序" }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入部门排序" />
          </Form.Item>
          <Form.Item
            label="部门状态"
            name="status"
            rules={[{ required: true, message: "请选择部门状态" }]}
          >
            <Select
              placeholder="请选择部门状态"
              style={{ width: '100%' }}
              options={statusOptionsNum}
            />
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

export default DeptBtn;