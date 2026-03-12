import Wrap from "@/layout/Wrap";
import { useState, useEffect } from "react";
import { getPage } from "@/api/system/tenant";

const Tenant = () => {

  const [tableData, setTableData] = useState([]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "字典编号",
      dataIndex: "key",
    },
  ];

  const getList = (params = {}) => {
    getPage({
      page: page.current,
      pageSize: page.pageSize,
      ...params,
    }).then((res) => {
      console.log(res)
    })
    // getParent({
    //   page: page.current,
    //   pageSize: page.pageSize,
    //   ...params,
    //   parentId: -1
    // }).then((res) => {
    //   setPage((prevPage) => ({
    //     ...prevPage,
    //     total: res.total, // 将 newCurrentValue 替换为你想要的新值
    //   }));
    //   // setTableData(res.records);
    // });
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

        <Form.Item label="字典编号" name="key">
          <Input placeholder="请输入字典编号" />
        </Form.Item>
        <Form.Item label="字典名称" name="name">
          <Input placeholder="请输入字典名称" />
        </Form.Item>
      </Wrap>

    </>
  )
}

export default Tenant;