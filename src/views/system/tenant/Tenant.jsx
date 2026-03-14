import Wrap from "@/layout/Wrap";
import { useState } from "react";
import { getPage, delItem } from "@/api/system/tenant";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import TenantBtn from "./TenantBtn";
import useTable from "@/hooks/table";

const Tenant = () => {

  const {
    page,
    btnRef,
    tableData,
    selectData,
    checkStrictly,
    pagiChange,
    editData,
    getList,
    delData,
    rowSelection
  } = useTable({
    listApi: getPage, delApi: delItem,
  });

  const [statusOptions, setStatusOptions] = useState([
    { value: 1, label: '启用', status: 'success', color: 'green' },
    { value: 0, label: '禁用', status: 'error' },
  ])

  const [statusMap, setStatusMap] = useState({
    1: '启用',
    0: '禁用',
  })

  const colorMap = {
    1: 'green',
    0: 'red',
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "租户名称",
      dataIndex: "name",
    },
    {
      title: "租户状态",
      dataIndex: "status",
      render: (text, record) => {
        return <Tag key={record.status} color={colorMap[record.status]}>
          {statusMap[record.status]}
        </Tag>
      }
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
    },
    {
      title: '联系地址',
      dataIndex: 'address',
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (text, record, index) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => editData(record)}>
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            onClick={() => delData(record)}
            danger
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Wrap
        className="tenant-container"
        getData={getList}
        columns={columns}
        rowSelection={{
          ...rowSelection,
          checkStrictly,
        }}
        tableData={tableData}
        pagination={{
          current: page.current,
          pageSize: page.pageSize,
          total: page.total,
          onChange: pagiChange,
          showSizeChanger: true,
          showTotal: (total) => `共 ${page.total} 条`,
        }}
        Btn={<TenantBtn selectData={selectData} getList={getList} ref={btnRef}></TenantBtn>}
      >

        <Form.Item label="租户名称" name="name">
          <Input placeholder="请输入租户名称" />
        </Form.Item>
        <Form.Item label="租户状态" name="status">
          <Select
            placeholder="请选择租户状态"
            style={{ width: 120 }}
            options={statusOptions}
          ></Select>
        </Form.Item>
      </Wrap>

    </>
  )
}

export default Tenant;