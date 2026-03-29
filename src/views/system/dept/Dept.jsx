import { useEffect, useRef } from "react";
import Wrap from "@/layout/Wrap";
import { message } from "antd";
import useCrudTable from "@/hooks/useCrudTable";
import { getTree, delItem, addItem, editItem } from "@/api/system/dept";
import { useDictArray, useDictObj } from "@/hooks/dict";
import DeptBtn from "./DeptBtn";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MenuOutlined,
} from '@ant-design/icons';

const Dept = () => {

  const statusOptions = useDictArray("common_status");
  const statusObj = useDictObj("common_status");
  const btnRef = useRef();

  const {
    tableData,
    rowSelection,
    getList,
    delData,
    batchDel,
    openAdd,
    openEdit,
    isModalOpen,
    isEdit,
    form,
    handleOk,
    handleCancel,
    selectData
  } = useCrudTable({
    listApi: async () => {
      const data = await getTree();
      return { records: data, total: data.length }
    },
    delApi: delItem,
    addApi: addItem,
    editApi: editItem,
    openEditOverride: (record) => btnRef.current?.editModal(record),
  });

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "部门名称", dataIndex: "name" },
    {
      title: "状态", key: 'status',
      render: (_, record) => (
        <Tag color={record.status === 1 ? 'green' : 'red'}>
          {statusObj?.[record.status]}
        </Tag>
      ),
    },
    {
      title: '角色排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => delData(record.id)}>
            删除
          </Button>
        </>
      ),
    }
  ]

  return (
    <>
      <Wrap
        getData={getList}
        columns={columns}
        tableData={tableData}
        rowSelection={rowSelection}
        Btn={
          <DeptBtn ref={btnRef} selectData={selectData} getList={getList} />
        }
        rowKey="id"
        pagination={false}
        defaultExpandAllRows
        scroll={{ x: 1500 }}
      >
        <Form.Item label="部门名称" name="name">
          <Input placeholder="请输入部门名称" allowClear />
        </Form.Item>
        <Form.Item label="部门状态" name="status">
          <Select
            style={{ width: 180 }}
            placeholder="请选择部门状态"
            options={statusOptions}
            allowClear
          />
        </Form.Item>
      </Wrap>
    </>
  )
}

export default Dept;