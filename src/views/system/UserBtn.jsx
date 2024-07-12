import { Button, Flex, Drawer, Form, Input, Collapse, Select, Col, Row, DatePicker, TreeSelect, message  } from "antd";
import SelfBtn from "@/layout/SelfBtn";
import { useState } from "react"
import { DownloadOutlined, UploadOutlined, UnlockOutlined, SettingOutlined, ReloadOutlined, UserOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
const { SHOW_PARENT } = TreeSelect;

const UserBtn = ({userOption, selectData,...props}) => {
  const [addOpen, setAddOpen] = useState(false);
  // const [messageApi, contextHolder] = message.useMessage();
  const [tenant, setTenant] = useState([
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
  ]);
  const addFoot = <Flex wrap gap="small" className="dialog-foot">
    <Button type="primary">确定</Button>
    <Button onClick={() => setAddOpen(false)}>取消</Button>
  </Flex>
  const addItems = [
    {
      key: '1',
      label: '基础信息',
      children: <>
        <Form.Item
          name={['user', 'name']}
          label="所属租户"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
            placeholder="请选择所属租户"
            options={tenant}
          />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="登录账号"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="用户平台"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={userOption}
                style={{width: '100%'}}
                placeholder="请选择用户平台"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="密码"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="确认密码"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
      </>,
    },
    {
      key: '2',
      label: '详细信息',
      children: <>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="用户昵称"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="用户姓名"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="手机号码"
              rules={[
                {
                  pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="电子邮箱"
              rules={[
                {
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="用户性别"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: '1',
                    label: '男',
                  },
                  {
                    value: '2',
                    label: '女',
                  },
                  {
                    value: '3',
                    label: '未知',
                  }
                ]}
                style={{width: '100%'}}
                placeholder="请选择用户性别"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="用户生日"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" style={{width: '100%'}} />
            </Form.Item>
          </Col>
        </Row>
      </>,
    },
    {
      key: '3',
      label: '职责信息',
      children: <>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="用户编号"
            >
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="所属角色"
            >
              <TreeSelect treeCheckable={true} showCheckedStrategy={SHOW_PARENT} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="所属部门"
            >
              <TreeSelect treeCheckable={true} showCheckedStrategy={SHOW_PARENT} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'name']}
              label="所属岗位"
            >
              <TreeSelect treeCheckable={true} showCheckedStrategy={SHOW_PARENT} />
            </Form.Item>
          </Col>
        </Row>
      </>,
    },
  ]
  const rowDel = () => {
    console.log('删除', selectData)
    if(selectData.length == 0) return message.warning('请选择要删除的数据')
    props.getData()
  }
  return (
    <div className="btns">
      <Button type="primary" className="btn" icon={<PlusOutlined />} onClick={() => setAddOpen(true)}>新增</Button>
      <Button type="primary" danger className="btn" icon={<DeleteOutlined />} onClick={rowDel}>删除</Button>
      <Button className="btn" icon={<UserOutlined />}>角色配置</Button>
      <Button className="btn" icon={<ReloadOutlined />}>密码重置</Button>
      <Button className="btn" icon={<SettingOutlined />}>平台配置</Button>
      <Button className="btn" icon={<UnlockOutlined />}>账号解封</Button>
      <SelfBtn color="#3dc263" className="btn" text="导入" icon={<UploadOutlined />}></SelfBtn>
      <SelfBtn color="#e6a23c" btn={<Button type="primary" className="btn"><DownloadOutlined /> 导出</Button>}></SelfBtn>
      <Drawer title="新增" open={addOpen} width={1100} footer={addFoot} onClose={() => setAddOpen(false)}>
        <Form>
          <Collapse defaultActiveKey={['1','2','3']} ghost items={addItems} />
        </Form>
      </Drawer>
    </div>
  )

}

export default UserBtn;