import { Button, message, Modal, Form, Input, InputNumber, Radio, Table, Row, Col  } from "antd";
import { delConfirm } from "@/utils/feedBack";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getParent, delItem, delBatch, addItem, editItem, getList as getChild } from "@/api/system/dict";
import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
const DictBtn = forwardRef(({ selectData, getList, ...props }, ref) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
  const [childForm] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (isEdit) {
        // 编辑
        setFormData(preValue => {
          return {
            ...preValue,
            ...values
          }
        })
        editItem({
          id: formData.id,
          ...values
        }).then((res) => {
          message.open({
            type: "success",
            content: "修改成功",
          });
          getList();
          form.resetFields();
          setIsModalOpen(false);
        });
      } else {
        // 新增
        addItem(values).then((res) => {
          message.open({
            type: "success",
            content: "添加成功",
          });
          getList();
          form.resetFields();
          setIsModalOpen(false);
        });
      }
      // 
    });
    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const add = () => {
    setIsModalOpen(true);
    setIsEdit(false);
  };
  const allDel = () => {
    if (selectData.length == 0)
      return message.open({
        type: "error",
        content: "请先选择一个字典",
      });
    delConfirm().then(() => {
      delBatch(selectData.map((item) => item.id)).then((res) => {
        message.open({
          type: "success",
          content: "删除成功",
        });
        getList();
      });
    });
  };
  const configDel = () => {
    if(configSelectData.length == 0) {
      return message.open({
        type: "error",
        content: "请先选择一个字典",
      });
    }
    delConfirm().then(() => {
      delBatch(configSelectData.map((item) => item.id)).then((res) => {
        message.open({
          type: "success",
          content: "删除成功",
        });
        getConfig()
      });
    });
  }

  // config数据区
  const [configForm] = Form.useForm();
  const [configOpen, setConfigOpen] = useState(false);
  const [configData, setConfigData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [configSelectData, setConfigSelectData] = useState([]);
  const [configEdit, setConfigEdit] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const getConfig = () => {
    getChild({
      parentId: configData.id,
      ...configForm.getFieldsValue()
    }).then((res) => {
      setTableData(res.records);
    })
  }
  const configAdd = () => {
    setConfigEdit(false);
    setConfigModalOpen(true);
  };
  const configConfirm = () => {
    childForm.validateFields().then((values) => {
      const data = {
        ...values,
        parentId: configData.id,
      }
      addItem(data).then((res) => {
        message.open({
          type: "success",
          content: "添加成功",
        });
        getConfig();
        childForm.resetFields();
        setConfigModalOpen(false);
      });
      console.log(values, configData);
    });
  }
  
  const reset = () => {
    configForm.resetFields();
    getConfig()
  };
  const searchConfig = values => {
    getConfig()
  }
  const configEditOp = (record) => {
    console.log(record);
    setConfigEdit(true);
    setConfigModalOpen(true);
    childForm.setFieldsValue(record);
    
  }
  const columns = [
    {
      title: '父级字典编号',
      code: 'code',
      render: () => (
        <>{configData.key}</>
      )
    },
    {
      title: "字典名称",
      dataIndex: "name",
    },
    {
      title: "字典编号",
      dataIndex: "key",
    },
    {
      title: "是否封存",
      dataIndex: "isSealed",
      render: (_, record) => {
        return record.isSealed == 0 ? "否" : "是";
      },
    },
    {
      title: "操作",
      width: '200px',
      render: (text, record, index) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => configEditOp(record)}>
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            onClick={() => {
              delConfirm().then(() => {
                delItem(record.id).then((res) => {
                  message.open({
                    type: "success",
                    content: "删除成功",
                  });
                  getConfig()
                });
              });
            }}
          >
            删除
          </Button>
        </>
      ),
    }
  ]
  useEffect(() => {
    if(configData.id) {
      getConfig();
    }
  }, [configData])
  useImperativeHandle(ref, () => ({
    editModal: (data) => {
      setIsModalOpen(true);
      setIsEdit(true);
      setFormData(data);
      form.setFieldsValue(data);
    },
    openConfig: (data) => {
      setConfigData(data);
      setConfigOpen(true);
      
    }
  }));
  return (
    <>
      <div style={{ marginBottom: "12px" }}>
        <Button
          icon={<PlusOutlined />}
          style={{ marginRight: "8px" }}
          type="primary"
          onClick={add}
        >
          新增
        </Button>
        <Button
          icon={<DeleteOutlined />}
          onClick={allDel}
          type="primary"
          danger
        >
          删除
        </Button>
      </div>
      <Modal
        title={configData.name+"-字典配置"}
        open={configOpen}
        footer={null}
        onCancel={() => setConfigOpen(false)}
        width={1000}
      >
        <Form
          className="base-form"
          labelCol={{span: 6}}
          layout="inline"
          form={configForm}
          onFinish={searchConfig}
        >
          <Form.Item
            label="字典编号"
            name="key"
          >
            <Input placeholder="请输入字典编号" />
          </Form.Item>
          <Form.Item
            label="字典名称"
            name="name"
          >
            <Input placeholder="请输入字典名称" />
          </Form.Item>
          
          <Form.Item >
            <Button className='reset' onClick={reset}>重置</Button>
            <Button htmlType="submit" type="primary" className='submit'>查询</Button>
          </Form.Item>
        </Form>
        <div style={{ marginBottom: "12px" }}>
          <Button
            icon={<PlusOutlined />}
            style={{ marginRight: "8px" }}
            type="primary"
            onClick={configAdd}
          >
            新增
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={configDel}
          >
            删除
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered={true}
          rowKey="id"
          pagination={false}
          style={{ minHeight: '400px', height: '100%' }}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              setConfigSelectData(selectedRows);
            },
          }}
        />
      </Modal>
      <Modal
        title={configEdit?"编辑":"新增"}
        open={configModalOpen}
        onCancel={() => {
          setConfigModalOpen(false);
          childForm.resetFields();
        }}
        width={800}
        onOk={configConfirm}
      >
        <Form
          className="base-form"
          labelCol={{span: 8}}
          layout="horizontal"
          form={childForm}
          initialValues={{
            code: configData.key,
            sort: 1,
            isSealed: false
          }}
        >
          <Row gutter={[0, 0]}>
            <Col span={12}>
              <Form.Item
                label="父级字典编号"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "请输入父级字典编号",
                    max: 50,
                  },
                ]}
              >
                <Input disabled placeholder="请输入父级字典编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="字典编号"
                name="key"
                rules={[
                  {
                    required: true,
                    message: "请输入字典编号",
                    max: 50,
                  },
                ]}
              >
                <Input placeholder="请输入字典编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="字典名称"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "请输入字典名称",
                  },
                  { max: 50, message: "最多50个字符" },
                ]}
              >
                <Input placeholder="请输入字典名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="字典排序"
                name="sort"
                rules={[
                  {
                    required: true,
                    message: "请输入字典排序",
                  },
                ]}
              >
                <InputNumber style={{width: '100%'}} min={1} placeholder="请输入字典排序" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="是否封存"
                name="isSealed"
                rules={[
                  {
                    required: true,
                    message: "请输入字典排序",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="字典备注"
                name="remark"
                labelCol={{span: 4}}
              >
                <Input.TextArea placeholder="请输入字典备注" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="额外参数"
                name="params"
                labelCol={{span: 4}}
              >
                <Input.TextArea placeholder="请输入额外参数" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form 
          className="base-form"
          labelCol={{span: 4}}
          initialValues={{
            sort: 1,
            isSealed: 0
          }}
          form={form}
        >
          <Form.Item
            label="字典编号"
            name="key"
            rules={[
              {
                required: true,
                message: "请输入字典编号",
                max: 50,
              },
            ]}
          >
            <Input placeholder="请输入字典编号" />
          </Form.Item>
          <Form.Item
            label="字典名称"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入字典名称",
                max: 50,
              },
            ]}
          >
            <Input placeholder="请输入字典名称" />
          </Form.Item>
          
          <Form.Item
            label="字典排序"
            name="sort"
            rules={[
              {
                required: true,
                message: "请输入字典排序",
                
              },
            ]}
          >
            <InputNumber min={1} placeholder="请输入字典排序" style={{
              width: '100%'
            }} />
          </Form.Item>
          <Form.Item
            label="是否停用"
            name="isSealed"
            rules={[
              {
                required: true,
                message: "请选择是否停用",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="额外参数"
            name="params"
          >
            <Input.TextArea placeholder="请输入额外参数，为一些意外情况添加" />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
          >
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default DictBtn;
