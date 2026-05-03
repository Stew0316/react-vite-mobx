import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { Button, Modal, Form, Input, Table, Select, Switch } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getPage, delItem, addItem, editItem } from "@/api/crm/contact";
import useCrudTable from "@/hooks/useCrudTable";
import { useDictArray, useDictObj } from "@/hooks/dict";

const CustomerContactDialog = forwardRef(({ configData }, ref) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentCustomerIdRef = useRef(null);
  const customerSexOptions = useDictArray("sex");
  const customerSexMap = useDictObj("sex");

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
    listApi: (params) => getPage({ customerId: currentCustomerIdRef.current, ...params }),
    delApi: delItem,
    addApi: addItem,
    editApi: editItem,
    autoRequest: false,
  });

  const handleAdd = () => {
    openAdd();
    form.setFieldsValue({ customerId: configData.id });
  };

  const handleEdit = (record) => {
    openEdit({ ...record, customerId: configData.id });
  };

  const onFinish = (values) => {
    getList(values);
  };

  useImperativeHandle(ref, () => ({
    openDialog: (customerId) => {
      currentCustomerIdRef.current = customerId;
      setDialogOpen(true);
      getList({ customerId });
    },
  }));

  const handleDialogCancel = () => {
    formRef.current?.resetFields();
    setDialogOpen(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "姓名", dataIndex: "name", width: 120 },
    {
      title: "性别",
      dataIndex: "gender",
      width: 80,
      render: (_, record) => customerSexMap[record.gender] || "-",
    },
    { title: "职位", dataIndex: "position", width: 120 },
    { title: "电话", dataIndex: "phone", width: 130 },
    { title: "邮箱", dataIndex: "email", width: 180 },
    { title: "WhatsApp", dataIndex: "whatsapp", width: 130 },
    { title: "微信", dataIndex: "wechat", width: 130 },
    {
      title: "主联系人",
      dataIndex: "isPrimary",
      width: 100,
      render: (_, record) => (record.isPrimary ? <Tag color="blue">是</Tag> : "否"),
    },
    {
      title: "操作",
      width: 210,
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
      <Modal
        title={`${configData.customerName ?? ""} - 联系人`}
        open={dialogOpen}
        footer={null}
        onCancel={handleDialogCancel}
        width={1300}
      >
        <Form
          className="base-form"
          layout="inline"
          onFinish={onFinish}
          ref={formRef}
          style={{ maxWidth: 'none' }}
        >
          <Form.Item label="联系人姓名" name="name">
            <Input placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item label="电话" name="phone">
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item>
            <Button onClick={reset} style={{ marginRight: "4px" }}>重置</Button>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
          </Form.Item>
        </Form>

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

        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          rowKey="id"
          rowSelection={rowSelection}
          pagination={{
            current: page.current,
            pageSize: page.pageSize,
            total: page.total,
            onChange: pagiChange,
            showSizeChanger: true,
            showTotal: () => `共 ${page.total} 条`,
          }}
        />
      </Modal>

      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form
          className="base-form"
          labelCol={{ span: 4 }}
          form={form}
          initialValues={{
            isPrimary: false,
          }}
        >
          <Form.Item name="id" hidden><Input /></Form.Item>
          <Form.Item name="customerId" hidden><Input /></Form.Item>

          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入联系人姓名", max: 100 }]}
          >
            <Input placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item label="性别" name="gender">
            <Select placeholder="请选择性别" options={customerSexOptions} />
          </Form.Item>
          <Form.Item label="职位" name="position">
            <Input placeholder="请输入职位" />
          </Form.Item>
          <Form.Item label="电话" name="phone">
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item label="WhatsApp" name="whatsapp">
            <Input placeholder="请输入WhatsApp" />
          </Form.Item>
          <Form.Item label="微信" name="wechat">
            <Input placeholder="请输入微信" />
          </Form.Item>
          <Form.Item label="主联系人" name="isPrimary" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default CustomerContactDialog;
