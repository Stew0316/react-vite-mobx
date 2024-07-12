import Wrap from "@/layout/Wrap";
import { useState, useMemo, useRef } from "react";
import style from "@/style/User.module.scss";
import { Input, Tree, Button, Form, Select } from "antd";
import { PlusOutlined, DeleteOutlined,EyeOutlined, EditOutlined } from "@ant-design/icons";
import UserBtn from "./UserBtn";
const { Search } = Input;
const x = 3;
const y = 2;
const z = 1;
const defaultData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || defaultData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: key,
      key,
    });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({
      key,
      title: key,
    });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const columns = [
  {
    title: '登录账号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '所属租户',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '用户姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '所属角色',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '所属部门',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '用户平台',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'name',
    key: 'name',
    render: (text, record, index) => (
      <>
        <Button icon={<EyeOutlined />} type="link">查看</Button>
        <Button icon={<EditOutlined />} type="link">编辑</Button>
        <Button icon={<DeleteOutlined />} type="link">删除</Button>
      </>
    ),
  },
]
const Users = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [tableData, setTableData] = useState([{key: 1}]);
  const [selectData, setSelectData] = useState([]);
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const searchChange = (e) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };
  const rowChange = (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    setSelectData(selectedRows);
  }
  const getData = () => {
    console.log('getData');
  }
  const treeData = useMemo(() => {
    const loop = (data) =>
      data.map((item) => {
        const strTitle = item.title;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span key={item.key}>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span key={item.key}>{strTitle}</span>
          );
        if (item.children) {
          return {
            title,
            key: item.key,
            children: loop(item.children),
          };
        }
        return {
          title,
          key: item.key,
        };
      });
    return loop(defaultData);
  }, [searchValue]);
  const [userOption, setUserOption] = useState([
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'Yiminghe',
      label: 'yiminghe',
    },
  ])
  return (
    <div className={`${style.user}`}>
      <div className="left">
        <div className="top">
          <Input placeholder="输入关键字进行过滤" onChange={searchChange} allowClear></Input>
          <Tree
            onExpand={onExpand}
            autoExpandParent={autoExpandParent}
            expandedKeys={expandedKeys}
            treeData={treeData}
          />
        </div>
      </div>
      <Wrap 
        className="right"
        columns={columns}
        tableData={tableData}
        Btn={
          <UserBtn 
            getData={getData}
            userOption={userOption}
            selectData={selectData}
          />
        }
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => rowChange(selectedRowKeys, selectedRows),
          type: 'checkbox',
        }}
      >
        <Form.Item
          label="登录账号" 
          name='name'
          key='1'
        >
          <Input placeholder="请输入登录账号" />
        </Form.Item>
        <Form.Item
          label="用户名称" 
          name='name1'
          key='2'
        >
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item
          label="用户平台" 
          name='name2'
          key='3'
        >
          <Select
            options={userOption}
            style={{width: 200}}
            placeholder="请选择用户平台"
          />
        </Form.Item>
      </Wrap>
    </div>
  );
};

export default Users;
