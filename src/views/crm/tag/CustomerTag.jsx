import Wrap from "@/layout/Wrap";
import { useRef } from "react";
import { getPage, delItem } from "@/api/crm/tag";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TagBtn from "./CustomerTagBtn";
import useCrudTable from "@/hooks/useCrudTable";
import PermButton from "@/components/PermButton";

const TagPage = () => {
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
    { title: "ID", dataIndex: "id", width: 80 },
    {
      title: "标签名称",
      dataIndex: "name",
      width: 150,
      render: (_, record) => <Tag color={record.color || "default"}>{record.name}</Tag>,
    },
    { title: "标签颜色", dataIndex: "color", width: 120 },
    { title: "排序", dataIndex: "sort", width: 80 },
    {
      title: "操作",
      dataIndex: "action",
      width: 160,
      fixed: "right",
      render: (_, record) => (
        <>
          <PermButton perm="crm:tag:edit" icon={<EditOutlined />} type="link" onClick={() => openEdit(record)}>
            编辑
          </PermButton>
          <PermButton perm="crm:tag:delete" icon={<DeleteOutlined />} type="link" danger onClick={() => delData(record)}>
            删除
          </PermButton>
        </>
      ),
    },
  ];

  return (
    <Wrap
      className="tag-container"
      getData={getList}
      columns={columns}
      rowSelection={rowSelection}
      tableData={tableData}
      scroll={{ x: 700 }}
      pagination={{
        current: page.current,
        pageSize: page.pageSize,
        total: page.total,
        onChange: pagiChange,
        showSizeChanger: true,
        showTotal: () => `共 ${page.total} 条`,
      }}
      Btn={<TagBtn ref={btnRef} selectData={selectData} getList={getList} />}
    >
      <Form.Item label="标签名称" name="name">
        <Input placeholder="请输入标签名称" />
      </Form.Item>
    </Wrap>
  );
};

export default TagPage;
