import Wrap from "@/layout/Wrap";
import { useRef } from "react";
import { getPage, delItem } from "@/api/system/tenant";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TenantBtn from "./TenantBtn";
import useCrudTable from "@/hooks/useCrudTable";

const statusMap = { 1: "启用", 0: "禁用" };
const colorMap = { 1: "green", 0: "red" };

const statusOptions = [
  { value: 1, label: "启用" },
  { value: 0, label: "禁用" },
];

const Tenant = () => {
  const btnRef = useRef();

  const {
    page,
    tableData,
    selectData,
    rowSelection,
    pagiChange,
    openEdit,
    getList,
    delData,
  } = useCrudTable({
    listApi: getPage,
    delApi: delItem,
    openEditOverride: (record) => btnRef.current?.editModal(record),
  });

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "租户名称", dataIndex: "name" },
    {
      title: "租户状态",
      dataIndex: "status",
      render: (_, record) => (
        <Tag color={colorMap[record.status]}>{statusMap[record.status]}</Tag>
      ),
    },
    { title: "联系方式", dataIndex: "contact" },
    { title: "联系地址", dataIndex: "address" },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => delData(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <Wrap
      className="tenant-container"
      getData={getList}
      columns={columns}
      rowSelection={rowSelection}
      tableData={tableData}
      pagination={{
        current: page.current,
        pageSize: page.pageSize,
        total: page.total,
        onChange: pagiChange,
        showSizeChanger: true,
        showTotal: () => `共 ${page.total} 条`,
      }}
      Btn={
        <TenantBtn ref={btnRef} selectData={selectData} getList={getList} />
      }
    >
      <Form.Item label="租户名称" name="name">
        <Input placeholder="请输入租户名称" />
      </Form.Item>
      <Form.Item label="租户状态" name="status">
        <Select
          placeholder="请选择租户状态"
          style={{ width: 120 }}
          options={statusOptions}
        />
      </Form.Item>
    </Wrap>
  );
};

export default Tenant;