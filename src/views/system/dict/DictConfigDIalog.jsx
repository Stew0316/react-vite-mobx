import { forwardRef, useImperativeHandle } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useCrud from "@/hooks/crud";
import useTable from "@/hooks/table";
import { itemPage, itemDel, itemAdd, itemEdit } from "@/api/system/dict"
import { delConfirm } from "@/utils/feedBack";
import { useDictStore } from "@/store/dict";


const DictConfigDIalog = forwardRef(({ configData, ...props }, ref) => {

  const dictStore = useDictStore();
  const [dialogModalOpen, setDialogModalOpen] = useState(false);

  const {
    page,
    btnRef,
    formRef,
    reset,
    tableData,
    selectData,
    checkStrictly,
    pagiChange,
    editData,
    getList,
    delData,
    rowSelection,
  } = useTable({
    listApi: itemPage,
    delApi: itemDel,
    autoRequest: false
  });

  const source_system = [
    {
      label: '本平台',
      value: 'self'
    }
  ]

  const {
    isEdit,
    setIsEdit,
    isModalOpen,
    setIsModalOpen,
    form,
    allDel,
    add,
    handleCancel,
    handleOk,
    setFormData
  } = useCrud({
    selectData,
    getList,
    delApi: itemDel,
    addApi: itemAdd,
    editApi: itemEdit,
    ref
  });

  const columns = [
    {
      title: '字典ID',
      dataIndex: 'id',
    },
    {
      title: '父级字典id',
      code: 'parentId',
    },
    {
      title: "字典名称",
      dataIndex: "label",
    },
    {
      title: "字典编号",
      dataIndex: "value",
    },
    {
      title: "字典层级",
      dataIndex: "levelNum",
    },
    {
      title: "字典排序",
      dataIndex: "sort",
    },
    {
      title: "来源系统",
      dataIndex: "sourceSystem",
    },
    {
      title: "是否默认项",
      dataIndex: "isDefault",
      render: (_, record) => {
        return !record.isDefault ? "否" : "是";
      },
    },
    {
      title: "是否启用",
      dataIndex: "status",
      render: (_, record) => {
        return record.status == 0 ? "否" : "是";
      },
    },
    {
      title: "额外数据",
      dataIndex: 'extraData',
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
    {
      title: "操作",
      width: '200px',
      render: (text, record, index) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => configEditData(record)}>
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            onClick={() => delData(record)}
          >
            删除
          </Button>
        </>
      ),
    }
  ]

  const configEditData = (record) => {
    // console.log(record)
    form.setFieldsValue({ ...record, typeId: configData.id })
    setIsEdit(true);
    setIsModalOpen(true);
  }

  const onFinish = (data) => {
    getList(data)
  }

  useImperativeHandle(ref, () => {
    return {
      openDialog: (typeId) => {
        setDialogModalOpen(true)
        getList({ typeId })
      }
    }
  })

  const dialogCancel = () => {
    // form.resetFields()
    formRef.current.resetFields()
    setDialogModalOpen(false)
  }

  return (
    <>
      <Modal
        title={configData.name + "-字典配置"}
        open={dialogModalOpen}
        footer={null}
        onCancel={dialogCancel}
        width={1400}
      >
        <Form
          className="base-form"
          labelCol={{ span: 6 }}
          layout="inline"
          onFinish={onFinish}
          ref={formRef}
        >
          <Form.Item
            label="字典编号"
            name="value"
          >
            <Input placeholder="请输入字典编号" />
          </Form.Item>
          <Form.Item
            label="字典名称"
            name="label"
          >
            <Input placeholder="请输入字典名称" />
          </Form.Item>
          <Form.Item
            label="字典状态"
            name="status"
          >
            <Select
              placeholder="请选择字典状态"
              style={{ width: 200 }}
              options={dictStore.dictArrObject.product_status}
            ></Select>
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
            onClick={add}
          >
            新增
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={allDel}
          >
            删除
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered={true}
          rowKey="id"
          pagination={{
            current: page.current,
            pageSize: page.pageSize,
            total: page.total,
            onChange: pagiChange,
            hideOnSinglePage: false,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共 ${page.total} 条`,
          }}
          style={{ minHeight: '400px', height: '100%' }}
          rowSelection={rowSelection}
        />

      </Modal>
      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onCancel={handleCancel}
        width={1000}
        onOk={handleOk}
      >
        <Form
          className="base-form"
          labelCol={{ span: 8 }}
          layout="horizontal"
          form={form}
          initialValues={{
            levelNum: 1,
            sort: 1
          }}
        >
          <Row gutter={[0, 0]}>
            <Col span={12}>
              <Form.Item
                label="字典名称"
                name="label"
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
            </Col>
            <Col span={12}>
              <Form.Item
                label="字典编号"
                name="value"
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

          </Row>
          <Row gutter={[0, 0]}>
            <Col span={12}>
              <Form.Item
                label="字典层级"
                name="levelNum"
                rules={[
                  {
                    required: true,
                    message: "请输入字典层级",
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} placeholder="请输入字典层级" />
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
                <InputNumber min={1} style={{ width: '100%' }} placeholder="请输入字典排序" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="来源系统"
                name="sourceSystem"
                rules={[
                  {
                    required: true,
                    message: "请选择来源系统",
                  },
                ]}
              >
                <Select
                  placeholder="请选择来源系统"
                  style={{ width: '100%' }}
                  options={source_system}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="是否默认项"
                name="isDefault"
                rules={[
                  {
                    required: true,
                    message: "请选择是否默认项",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch></Switch>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="外部平台字典项编码"
                name="externalCode"
              >
                <Input placeholder="请输入外部平台字典项编码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="外部平台字典项名称"
                name="externalName"
              >
                <Input placeholder="请输入外部平台字典项名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="备注"
                name="remark"
              >
                <Input.TextArea placeholder="请输入备注" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="额外数据"
                name="extraData"
              >
                <Input.TextArea placeholder="请输入额外数据" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
});

export default DictConfigDIalog;