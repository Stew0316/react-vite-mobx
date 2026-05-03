import Wrap from "@/layout/Wrap";
import { getPage } from "@/api/crm/assignLog";
import useCrudTable from "@/hooks/useCrudTable";
import dayjs from "dayjs";

const AssignLog = () => {
  const {
    page,
    tableData,
    pagiChange,
    getList,
  } = useCrudTable({
    listApi: getPage,
    delApi: () => Promise.resolve(),
  });

  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "客户名称", dataIndex: "customerName", width: 180 },
    { title: "原负责人", dataIndex: "fromUserName", width: 120 },
    { title: "新负责人", dataIndex: "toUserName", width: 120 },
    { title: "分配原因", dataIndex: "reason", width: 250, ellipsis: true },
    {
      title: "分配时间",
      dataIndex: "createdTime",
      width: 170,
      render: (_, record) => (record.createdTime ? dayjs(record.createdTime).format("YYYY-MM-DD HH:mm") : "-"),
    },
  ];

  return (
    <Wrap
      className="assign-log-container"
      getData={getList}
      columns={columns}
      tableData={tableData}
      scroll={{ x: 1000 }}
      pagination={{
        current: page.current,
        pageSize: page.pageSize,
        total: page.total,
        onChange: pagiChange,
        showSizeChanger: true,
        showTotal: () => `共 ${page.total} 条`,
      }}
    >
      <Form.Item label="客户名称" name="customerName">
        <Input placeholder="请输入客户名称" />
      </Form.Item>
    </Wrap>
  );
};

export default AssignLog;
