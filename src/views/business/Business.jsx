import { Button, DatePicker, Form, Input, Space, Table, Tag, Switch, Popconfirm, Modal    } from 'antd';
import { EditOutlined,   } from '@ant-design/icons';
import { useState } from 'react';
const { RangePicker } = DatePicker;

function Business() {
  const [opend, setOpend] = useState(false)
  function open(data,val) {
    setOpend(true)
  }
  function onFinish(e) {
    console.log('onFinish', e)
  }
  
  function itemChange(e,val) {
    console.log(e,val)
  }
  function confirm(data) {
    console.log('fffff')
  }
  function cancel(data) {
    console.log('eeee')
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'advadv',
      dataIndex: 'advadv',
      render: (_, record) => (
        // react此处与vue有较大不同，vue是走的双向绑定加slot，react此处是视图与ui无关联，数据是分开的，通过返回值的形式来手动改变数据
        <Space size="middle">
          <span onClick={() => open(_, record)}>
            <EditOutlined />
          </span>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() =>confirm(record)}
            onCancel={() =>cancel(record)}
            okText="Yes"
            cancelText="No"
          >
            <span>Delete</span>
          </Popconfirm>
          
          <Switch checkedChildren="开" unCheckedChildren="关" onChange={(e) => itemChange(e,record)}></Switch>
        </Space>
      )
    }
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    
  ]
  return (
    <>
      <Form
        layout='inline'
        
        onFinish={onFinish}
      >
        <Form.Item 
          label="名称" 
          rules={[{ required: true, message: '请输入名称'}]}
          name='name'
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item 
          label="日期" 
          rules={[{ required: true, message: '请选择时间',}]}
          name='time'
        >
          <RangePicker />
        </Form.Item>
        <Form.Item >
          <Button>重置</Button>
          <Button htmlType="submit" type="primary">查询</Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
      <Modal title="Basic Modal" open={opend} onOk={() => setOpend(false)} onCancel={() => setOpend(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default Business;