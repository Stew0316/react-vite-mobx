import { Button, Form, Input, Table, Select,   } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined, 
} from '@ant-design/icons';
import { useState } from 'react';
import Wrap from '@/layout/Wrap';
import RoleBtn from './RoleBtn';

const Role = () => {
  const [tenantList, setTenantList] = useState([{ value: 'sample', label: <span>sample</span> }]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [visible, setVisible] = useState(false);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectData(selectedRows)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属租户',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '角色别名',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '角色排序',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      width: 280,
      render: (text, record, index) => (
        <>
          <Button icon={<EyeOutlined />} type="link" onClick={() => view(text, record, index)}>查看</Button>
          <Button icon={<EditOutlined />} type="link">编辑</Button>
          <Button icon={<DeleteOutlined />} type="link">删除</Button>
        </>
      ),
    },
  ];
  
  const view = (text, record, index) => {
    console.log(text, record, index)
  }
  const test = (value) => {
    console.log(value)
  }
  const visibleChange = (value) => {
    setVisible(value)
  }
  return (
    <>
      <Wrap 
        className="container"
        getData={test}
        columns={columns}
        rowSelection={{
          ...rowSelection,
          checkStrictly,
        }}
        pagination={false}
        Btn={<RoleBtn selectData={selectData} />}
      >
        <Form.Item 
          label="角色名称" 
          name='name'
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item 
          label="租户" 
          name='tenant'
        >
          <Select 
            placeholder="请选择租户"
            allowClear
            style={{ width: 120 }}
            options={tenantList} 
          />
        </Form.Item>
        <Form.Item 
          label="角色别名" 
          name='name1'
        >
          <Input placeholder="请输入角色别名" />
        </Form.Item>
      </Wrap>
    </>
  )
}

export default Role