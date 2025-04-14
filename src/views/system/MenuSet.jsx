import Wrap from '@/layout/Wrap';
import { Button, Form, Input, Table, Select,   } from 'antd';
import { PlusOutlined, DeleteOutlined,EyeOutlined } from "@ant-design/icons";
const MenuSet = () => {
  const test = () => {
    console.log('test')
  }
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '路由地址',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '菜单图标',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '菜单编号',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '菜单别名',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '新窗口',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '菜单排序',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <>
          <Button icon={<EyeOutlined />} type="link">查看</Button>
          <Button icon={<EditOutlined />} type="link">编辑</Button>
          <Button icon={<DeleteOutlined />} type="link">删除</Button>
        </>
      ),
    },
  ];
  const Btns = <div style={{marginBottom: '12px'}}>
    <Button icon={<PlusOutlined />} style={{marginRight: '8px'}} type="primary">新增</Button>
    <Button icon={<DeleteOutlined />} onClick={test} type="primary" danger>删除</Button>
  </div>
  return (
    <>
      <Wrap
        getData={test}
        Btn={Btns}
        columns={columns}
      >
        <Form.Item 
          label="菜单名称" 
          name='name'
        >
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item
          label="菜单编号"
        >
          <Input placeholder="请输入菜单编号" />
        </Form.Item>
        <Form.Item
          label="菜单别名"
        >
          <Input placeholder="请输入菜单别名" />
        </Form.Item>
      </Wrap>
    </>
  )
}

export default MenuSet