import { Button, Form, Input, Table, Select, Modal, Pagination } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Wrap from "@/layout/Wrap";
import DictBtn from "./DictBtn";
import { getParent, delItem } from "@/api/system/dict";
import dayjs from "dayjs";
import { delConfirm } from "@/utils/feedBack";
const Dict = () => {
  const [tableData, setTableData] = useState([]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [modalData, setModalData] = useState({});
  const btnRef = useRef();
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
    getCheckboxProps: (record) => ({
      disabled: record.hasChildren, // 禁用 `hasChildren` 为 `true` 的行
    }),
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const delData = (record) => {
    delConfirm().then(() => {
      delItem(record.id).then(() => {
        getList();
      });
    });
  };
  const editData = (record) => {
    btnRef.current.editModal(record);
  }
  const pagiChange = (current, pageSize) => {
    console.log(11,current, pageSize);
  };
  const sizeChange = (current, size) => {
    console.log(22,current, size);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "字典编号",
      dataIndex: "key",
    },
    {
      title: "字典名称",
      dataIndex: "name",
      key: "id",
    },
    {
      title: '父级字典编号',
      dataIndex: 'code'
    },
    {
      title: "字典排序",
      dataIndex: "sort",
    },
    {
      title: "是否停用",
      dataIndex: "isSealed",
      render: (text, record, index) => {
        return record.isSealed ? "是" : "否";
      }
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: (text, record, index) => {
        return text
          ? dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
      },
    },
    {
      title: "修改时间",
      dataIndex: "updateTime",
      render: (text, record, index) => {
        return text
          ? dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss")
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
        rowKey="id"
        tableData={tableData}
        pagination={{
          current: page.current,
          pageSize: page.pageSize,
          total: page.total,
          onChange: pagiChange,
          onShowSizeChange: sizeChange,
          showSizeChanger: true,
          showTotal: (total) => `共 ${page.total} 条`,
        }}
        Btn={props => <DictBtn ref={btnRef} selectData={selectData} getList={() => getList()} modalData={modalData}  {...props}  />}
      >
        <Form.Item label="字典名称" name="name">
          <Input placeholder="请输入字典名称" />
        </Form.Item>
        <Form.Item label="字典编号" name="key">
          <Input placeholder="请输入字典编号" />
        </Form.Item>
      </Wrap>
      
    </>
  );
};

export default Dict;
