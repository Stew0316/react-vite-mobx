import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Modal, Form, Input, Table, Row, Col, Switch, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { itemPage, itemDel, itemAdd, itemEdit } from "@/api/system/dict";
import useCrudTable from "@/hooks/useCrudTable";
import { useDictStore } from "@/store/dict";

const statusOptions = [
  { label: "启用", value: 1 },
  { label: "禁用", value: 0 },
];

const sourceSystemOptions = [{ label: "本平台", value: "self" }];

const DictConfigDialog = forwardRef(({ configData }, ref) => {
  const dictStore = useDictStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentTypeIdRef = useRef(null);

  // 这个弹窗内部是一套完整独立的增删改查，用一个 useCrudTable 实例管理
  const {
    page,
    tableData,
    selectData,
    rowSelection,
    pagiChange,
    getList,
    delData,
    batchDel,
    openAdd,
    openEdit,
    isEdit,
    isModalOpen,
    form,
    handleOk,
    handleCancel,
    formRef,
    reset,
  } = useCrudTable({
    listApi: (params) => itemPage({ typeId: currentTypeIdRef.current, ...params }),
    delApi: itemDel,
    addApi: itemAdd,
    editApi: itemEdit,
    autoRequest: false,
  });

  // 新增时自动带入当前字典类型 ID
  const handleAdd = () => {
    openAdd();
    form.setFieldsValue({ typeId: configData.id });
  };

  // 编辑时带入 typeId
  const handleEdit = (record) => {
    openEdit({ ...record, typeId: configData.id });
  };

  // 搜索
  const onFinish = (values) => {
    getList(values);
  };

  // 暴露给父组件 DictBtn：打开弹窗并加载对应字典项列表
  useImperativeHandle(ref, () => ({
    openDialog: (typeId) => {
      currentTypeIdRef.current = typeId;
      setDialogOpen(true);
      getList({ typeId });
    },
  }));

  const handleDialogCancel = () => {
    formRef.current?.resetFields();
    setDialogOpen(false);
  };

  const columns = [
    { title: "字典ID", dataIndex: "id" },
    { title: "父级字典ID", dataIndex: "parentId" },
    { title: "字典名称", dataIndex: "label" },
    { title: "字典编号", dataIndex: "value" },
    { title: "字典层级", dataIndex: "levelNum" },
    { title: "字典排序", dataIndex: "sort" },
    { title: "来源系统", dataIndex: "sourceSystem" },
    {
      title: "是否默认项",
      dataIndex: "isDefault",
      render: (_, record) => (record.isDefault ? "是" : "否"),
    },
    {
      title: "是否启用",
      dataIndex: "status",
      render: (_, record) => (record.status === 0 ? "否" : "是"),
    },
    { title: "额外数据", dataIndex: "extraData" },
    { title: "备注", dataIndex: "remark" },
    {
      title: "操作",
      width: 200,
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => handleEdit(record)}
          >
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
    },
  ];

  return (
    <>
      {/* 字典配置主弹窗 */}
      <Modal
        title={`${configData.name ?? ""} - 字典配置`}
        open={dialogOpen}
        footer={null}
        onCancel={handleDialogCancel}
        width={1400}
      >
        {/* 搜索表单 */}
        <Form
          className="base-form"
          labelCol={{ span: 6 }}
          layout="inline"
          onFinish={onFinish}
          ref={formRef}
        >
          <Form.Item label="字典编号" name="value">
            <Input placeholder="请输入字典编号" />
          </Form.Item>
          <Form.Item label="字典名称" name="label">
            <Input placeholder="请输入字典名称" />
          </Form.Item>
          <Form.Item label="字典状态" name="status">
            <Select
              placeholder="请选择字典状态"
              style={{ width: 200 }}
              options={dictStore.dictArrObject.product_status}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={reset}>重置</Button>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
          </Form.Item>
        </Form>

        {/* 操作按钮 */}
        <div style={{ margin: "12px 0" }}>
          <Button
            icon={<PlusOutlined />}
            style={{ marginRight: "8px" }}
            type="primary"
            onClick={handleAdd}
          >
            新增
          </Button>
          <Button icon={<DeleteOutlined />} type="primary" danger onClick={batchDel}>
            删除
          </Button>
        </div>

        {/* 字典项表格 */}
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          rowKey="id"
          rowSelection={rowSelection}
          style={{ minHeight: 400 }}
          pagination={{
            current: page.current,
            pageSize: page.pageSize,
            total: page.total,
            onChange: pagiChange,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共 ${page.total} 条`,
          }}
        />
      </Modal>

      {/* 新增 / 编辑字典项弹窗 —— 嵌套在配置弹窗外层，避免 z-index 问题 */}
      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          className="base-form"
          labelCol={{ span: 8 }}
          layout="horizontal"
          form={form}
          initialValues={{ levelNum: 1, sort: 1, isDefault: false, status: 1, sourceSystem: "self" }}
        >
          {/* 隐藏字段 */}
          <Form.Item name="id" hidden><Input /></Form.Item>
          <Form.Item name="typeId" hidden><Input /></Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item
                label="字典名称"
                name="label"
                rules={[{ required: true, message: "请输入字典名称", max: 50 }]}
              >
                <Input placeholder="请输入字典名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="字典编号"
                name="value"
                rules={[{ required: true, message: "请输入字典编号", max: 50 }]}
              >
                <Input placeholder="请输入字典编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="字典状态"
                name="status"
                rules={[{ required: true, message: "请选择字典状态" }]}
              >
                <Select
                  placeholder="请选择字典状态"
                  style={{ width: "100%" }}
                  options={statusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="字典排序"
                name="sort"
                rules={[{ required: true, message: "请输入字典排序" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} placeholder="请输入字典排序" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="来源系统"
                name="sourceSystem"
                rules={[{ required: true, message: "请选择来源系统" }]}
              >
                <Select
                  placeholder="请选择来源系统"
                  style={{ width: "100%" }}
                  options={sourceSystemOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="是否默认项"
                name="isDefault"
                rules={[{ required: true, message: "请选择是否默认项" }]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="外部平台字典项编码" name="externalCode">
                <Input placeholder="请输入外部平台字典项编码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="外部平台字典项名称" name="externalName">
                <Input placeholder="请输入外部平台字典项名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="备注" name="remark">
                <Input.TextArea placeholder="请输入备注" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="额外数据" name="extraData">
                <Input.TextArea placeholder="请输入额外数据" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
});

export default DictConfigDialog;