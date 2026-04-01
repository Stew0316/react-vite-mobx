import Wrap from "@/layout/Wrap";
import { useState, useMemo, useRef, useEffect } from "react";
import style from "@/style/User.module.scss";
import { getTree } from "@/api/system/dept";
import { getPage, delItem } from "@/api/system/user";
import { RollbackOutlined, DeleteOutlined, EyeOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import UserBtn from "./UserBtn";
import useCrudTable from "@/hooks/useCrudTable";
import { useDictObj, useDictArray } from "@/hooks/dict";

const Users = () => {

  const [treeData, setTreeData] = useState([]);
  const [deptId, setDeptId] = useState();
  const btnRef = useRef();
  const wrapRef = useRef();  // 添加 Wrap 组件的 ref

  const dictObj = useDictObj('common_status');
  const statusOptions = useDictArray("common_status");

  // 使用 useMemo 让 defaultParams 响应式更新
  const defaultParams = useMemo(() => ({ deptId }), [deptId]);

  const {
    page,
    tableData,
    selectData,
    rowSelection,
    pagiChange,
    openEdit,
    getList,
    delData,
    setTableData
  } = useCrudTable({
    autoRequest: false,
    listApi: getPage,
    delApi: delItem,
    defaultParams,
    openEditOverride: (record) => btnRef.current?.editModal(record),
  })

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return dictObj[record.status]
      }
    },
    {
      title: '用户类型',
      render: (_, record) => {
        return record.userType == 1 ? "普通用户" : "管理员"
      }
    },
    {
      title: '所属部门',
      dataIndex: 'deptName',
      key: 'deptName',
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'name',
      width: 400,
      render: (text, record, index) => (
        <>
          <Button icon={<EyeOutlined />} type="link">查看</Button>
          <Button icon={<RollbackOutlined />} type="link">重置密码</Button>
          <Button icon={<UserAddOutlined />} type="link">分配角色</Button>
          <Button icon={<EditOutlined />} type="link" onClick={() => openEdit(record)}>编辑</Button>
          <Button danger icon={<DeleteOutlined />} type="link" onClick={() => delData(record)}>删除</Button>
        </>
      ),
    },
  ]

  const searchChange = (data) => {
    console.log(data);
  }

  const getDept = async () => {
    const res = await getTree({
      status: 1
    })
    setTreeData(res);
  }

  const treeSelect = (selectedKeys, info) => {
    const selectKey = selectedKeys[0];
    setDeptId(selectKey);
    setTableData([]);
    getList({ deptId: selectKey });
    wrapRef.current?.resetFields();
  };

  useEffect(() => {
    getDept()
  }, [])

  return (
    <div className={`${style.user}`}>
      <div className="left">
        <div className="top">
          <Input placeholder="输入关键字进行过滤" onChange={searchChange} allowClear></Input>
          <Tree
            className="tree"
            treeData={treeData}
            fieldNames={{
              title: 'name',
              key: 'id',
            }}
            onSelect={treeSelect}
          />
        </div>
      </div>
      <Wrap
        ref={wrapRef}
        className="right"
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
          <UserBtn ref={btnRef} selectData={selectData} getList={getList} />
        }
      >
        <Form.Item
          label="用户名称"
          name='username'
        >
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item
          label="手机号码"
          name='phone'
        >
          <Input placeholder="请输入手机号码" />
        </Form.Item>
        <Form.Item
          label="状态"
          name='status'
        >
          <Select
            style={{ width: 180 }}
            placeholder="请选择用户状态"
            options={statusOptions}
            allowClear
          />
        </Form.Item>
      </Wrap>
    </div>
  );
};

export default Users;
