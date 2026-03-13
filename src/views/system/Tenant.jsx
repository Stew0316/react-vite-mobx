import Wrap from "@/layout/Wrap";
import { useState, useEffect } from "react";
import { getPage } from "@/api/system/tenant";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
const Tenant = () => {

  const [tableData, setTableData] = useState([]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [statusOptions, setStatusOptions] = useState([
    { value: 1, label: '启用' },
    { value: 0, label: '禁用' },
  ])

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
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  const getList = (params = {}) => {
    getPage({
      page: page.current,
      pageSize: page.pageSize,
      ...params,
    }).then((res) => {
      setPage((prevPage) => ({
        ...prevPage,
        total: res.total,
      }));
      setTableData(res.records);
    })
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // setSelectData(selectedRows);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.hasChildren, // 禁用 `hasChildren` 为 `true` 的行
    // }),
  };

  const pagiChange = (current, pageSize) => {
    page.current = current;
    page.pageSize = pageSize;
    getList();
  };
  useEffect(() => {
    getList();
  }, []);

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
      >

        <Form.Item label="租户名称" name="name">
          <Input placeholder="请输入租户名称" />
        </Form.Item>
        <Form.Item label="租户状态" name="租户状态">
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