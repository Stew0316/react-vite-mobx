import { Button, DatePicker, Form, Input, Space, Table, Tag, Switch, Popconfirm, Modal, Select  } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useState } from 'react';
const Role = () => {
  const [tenantList, setTenantList] = useState([{ value: 'sample', label: <span>sample</span> }]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 60
    },
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
      render: (address) => (
        <>
          <Button icon={<EyeOutlined />} type="link">查看</Button>
          <Button icon={<EditOutlined />} type="link">编辑</Button>
          <Button icon={<DeleteOutlined />} type="link">删除</Button>
        </>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];
  function onFinish(e) {
    console.log('onFinish', e)
  }
  return (
    <div className="container">
      <Form
        layout='inline'
        className='base-form'
        onFinish={onFinish}
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
        <Form.Item >
          <Button className='reset'>重置</Button>
          <Button htmlType="submit" type="primary" className='submit'>查询</Button>
        </Form.Item>
      </Form>
      <div style={{marginBottom: '12px'}}>
        <Button icon={<PlusOutlined />} style={{marginRight: '8px'}} type="primary">新增</Button>
        <Button icon={<DeleteOutlined />}  type="primary" danger>删除</Button>
      </div>
      <div>
        <Table
          bordered={true}
          columns={columns}
          rowSelection={{
            ...rowSelection,
            checkStrictly,
          }}
          pagination={false}
          dataSource={data}
        />
      </div>
    </div>
  )
}

export default Role