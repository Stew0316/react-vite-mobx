import { Button, Form, Input, Table, Select, Modal, Pagination } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import Wrap from "@/layout/Wrap";
import DictBtn from "./DictBtn";
import { getParent, delItem } from "@/api/system/dict";
import dayjs from "dayjs";
const { confirm } = Modal;
const Dict = () => {
  const [tenantList, setTenantList] = useState([
    { value: "sample", label: <span>sample</span> },
  ]);
  const [tableData, setTableData] = useState([]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const getList = (params = {}) => {
    getParent({
      page: page.current,
      pageSize: page.pageSize,
      ...params,
    }).then((res) => {
      setPage((prevPage) => ({
        ...prevPage,
        total: res.total, // 将 newCurrentValue 替换为你想要的新值
      }));
      setTableData(res.records);
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectData(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const delData = (record) => {
    console.log(record);
    confirm({
      title: "是否确定删除?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        delItem(record.id).then(() => {
          getList();
        });
      },
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "字典编号",
      dataIndex: "key",
      key: "id",
    },
    {
      title: "字典名称",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "字典排序",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "启用",
      dataIndex: "isSealed",
      key: "isSealed",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (text, record, index) => {
        return text
          ? dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
      },
    },
    {
      title: "修改时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text, record, index) => {
        return text
          ? dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
      },
    },
    {
      title: "操作",
      dataIndex: "address",
      key: "address",
      width: 280,
      render: (text, record, index) => (
        <>
          <Button icon={<EditOutlined />} type="link">
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            onClick={() => delData(record)}
          >
            删除
          </Button>
          <Button icon={<DeleteOutlined />} type="link">
            字典配置
          </Button>
        </>
      ),
    },
  ];

  const view = (text, record, index) => {
    console.log(text, record, index);
  };
  const visibleChange = (value) => {
    setVisible(value);
  };
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
        pagination={false}
        Btn={<DictBtn selectData={selectData} />}
      >
        <Form.Item label="字典名称" name="name">
          <Input placeholder="请输入字典名称" />
        </Form.Item>
        <Form.Item label="字典编号" name="key">
          <Input placeholder="请输入字典编号" />
        </Form.Item>
      </Wrap>
      <div style={{ display: "flex", "justify-content": "flex-end" }}>
        <Pagination
          total={page.total}
          showSizeChanger
          showQuickJumper
          page={page.current}
          pageSize={page.pageSize}
          showTotal={(total) => `共 ${page.total} 条`}
        ></Pagination>
      </div>
    </>
  );
};

export default Dict;
