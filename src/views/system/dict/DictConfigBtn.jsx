import useTable from "@/hooks/table";
import useCrud from "@/hooks/crud";
import { itemDel, itemAdd, itemEdit, itemPage as getChild } from "@/api/system/dict";
import { forwardRef } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const DictConfigBtn = ({ configData, getList: _getList, ...props }) => {

  const {
    page,
    btnRef,
    tableData,
    selectData,
    checkStrictly,
    pagiChange,
    editData,
    getList,
    delData,
    rowSelection
  } = useTable({
    listApi: getChild, delApi: itemDel,
  });

  const {
    isEdit,
    isModalOpen,
    form,
    allDel,
    add,
    handleCancel,
    handleOk,
  } = useCrud({
    selectData,
    getList,
    delApi: itemDel,
    addApi: itemAdd,
    editApi: itemEdit,
    ref: btnRef
  })



  return (
    <>
      <Modal
        title={configData.name + "-字典配置"}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          className="base-form"
          labelCol={{ span: 6 }}
          layout="inline"
          form={form}
          onFinish={_getList}
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
          <Form.Item
            label="字典名称"
            name="name"
          >
            <Input placeholder="请输入字典名称" />
          </Form.Item>

          <Form.Item >
            {/* <Button className='reset' onClick={reset}>重置</Button> */}
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
            onClick={() => delData(record)}
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
      {/* <Modal
        title={configEdit ? "编辑" : "新增"}
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
          labelCol={{ span: 8 }}
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
                <InputNumber style={{ width: '100%' }} min={1} placeholder="请输入字典排序" />
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
                labelCol={{ span: 4 }}
              >
                <Input.TextArea placeholder="请输入字典备注" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="额外参数"
                name="params"
                labelCol={{ span: 4 }}
              >
                <Input.TextArea placeholder="请输入额外参数" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal> */}
    </>
  )
}

export default DictConfigBtn;