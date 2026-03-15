
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useState } from "react";
import Wrap from "@/layout/Wrap";
import DictBtn from "./DictBtn";
import { getPage, delItem } from "@/api/system/dict";
import dayjs from "dayjs";
import useTable from "@/hooks/table";
import { SOURCE_SYSTEM_MAP } from "@/constant/system";


const Dict = () => {

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

  const [statusMap] = useState({
    1: '启用',
    0: '禁用',
  })

  const configDict = (record) => {
    btnRef.current.openConfig(record);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "字典编号",
      dataIndex: "code",
    },
    {
      title: "字典名称",
      dataIndex: "name",
    },
    {
      title: "来源系统",
      dataIndex: "sourceSystem",
      render: (text, record) => {
        return SOURCE_SYSTEM_MAP[record.sourceSystem]
      }
    },
    {
      title: "外部平台字典名称",
      dataIndex: "externalName",
    },
    {
      title: "外部平台字典编码",
      dataIndex: "externalCode",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text, record) => {
        return <Tag key={record.status} color={record.status == 1 ? 'green' : 'red'} >{statusMap[record.status]}</Tag>
      }
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      render: (text, record, index) => {
        return text
          ? dayjs(record.createdTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
      },
    },
    {
      title: "修改时间",
      dataIndex: "updatedTime",
      render: (text, record, index) => {
        return text
          ? dayjs(record.updatedTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
      },
    },
    {
      title: "操作",
      dataIndex: "address",
      width: 380,
      render: (text, record, index) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => editData(record)}>
            编辑
          </Button>
          <Button icon={<DeleteOutlined />} type="link" onClick={() => configDict(record)}>
            字典配置
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
        className="container"
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
        Btn={<DictBtn ref={btnRef} selectData={selectData} getList={() => getList()} />}
      >

        <Form.Item label="字典编号" name="key">
          <Input placeholder="请输入字典编号" />
        </Form.Item>
        <Form.Item label="字典名称" name="name">
          <Input placeholder="请输入字典名称" />
        </Form.Item>
      </Wrap>

    </>
  );
};

export default Dict;
