import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRef } from "react";
import Wrap from "@/layout/Wrap";
import DictBtn from "./DictBtn";
import { getPage, delItem } from "@/api/system/dict";
import dayjs from "dayjs";
import useCrudTable from "@/hooks/useCrudTable";
import { SOURCE_SYSTEM_MAP } from "@/constant/system";

const Dict = ({ isGlobal = false }) => {
  const btnRef = useRef();

  const {
    page,
    tableData,
    selectData,
    rowSelection,
    pagiChange,
    getList,
    delData,
    openEdit,
  } = useCrudTable({
    listApi: getPage,
    delApi: delItem,
    // isGlobal 作为固定参数注入，初始请求和后续查询都会带上
    defaultParams: { isGlobal },
    openEditOverride: (record) => btnRef.current?.editModal(record),
  });

  const configDict = (record) => {
    btnRef.current?.openConfig(record);
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "字典编号", dataIndex: "code" },
    { title: "字典名称", dataIndex: "name" },
    {
      title: "来源系统",
      dataIndex: "sourceSystem",
      render: (_, record) => SOURCE_SYSTEM_MAP[record.sourceSystem],
    },
    { title: "外部平台字典名称", dataIndex: "externalName" },
    { title: "外部平台字典编码", dataIndex: "externalCode" },
    {
      title: "状态",
      dataIndex: "status",
      render: (_, record) => (
        <Tag color={record.status === 1 ? "green" : "red"}>
          {record.status === 1 ? "启用" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      render: (text) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "",
    },
    {
      title: "修改时间",
      dataIndex: "updatedTime",
      render: (text) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "",
    },
    {
      title: "操作",
      width: 300,
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => openEdit(record)}
          >
            编辑
          </Button>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => configDict(record)}
          >
            字典配置
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            onClick={() => delData(record)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <Wrap
      className="container"
      getData={getList}
      columns={columns}
      rowSelection={rowSelection}
      tableData={tableData}
      defaultParams={{ isGlobal }}
      pagination={{
        current: page.current,
        pageSize: page.pageSize,
        total: page.total,
        onChange: pagiChange,
        showSizeChanger: true,
        showTotal: () => `共 ${page.total} 条`,
      }}
      Btn={
        <DictBtn
          ref={btnRef}
          isGlobal={isGlobal}
          selectData={selectData}
          getList={() => getList({ isGlobal })}
        />
      }
    >
      <Form.Item label="字典编号" name="code">
        <Input placeholder="请输入字典编号" />
      </Form.Item>
      <Form.Item label="字典名称" name="name">
        <Input placeholder="请输入字典名称" />
      </Form.Item>
    </Wrap>
  );
};

export default Dict;