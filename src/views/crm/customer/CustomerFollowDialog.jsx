import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { Button, Modal, Form, Input, Table, Select, DatePicker } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getPage, delItem, addItem, editItem } from "@/api/crm/follow";
import useCrudTable from "@/hooks/useCrudTable";
import { useDictArray, useDictObj } from "@/hooks/dict";
import dayjs from "dayjs";

const CustomerFollowDialog = forwardRef(({ configData }, ref) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentCustomerIdRef = useRef(null);
  const followTypeOptions = useDictArray("follow_type");
  const followTypeMap = useDictObj("follow_type");
  const followResultOptions = useDictArray("follow_result");
  const followResultMap = useDictObj("follow_result");

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
    openEdit({
      ...record,
      customerId: configData.id,
      nextFollowTime: record.nextFollowTime ? dayjs(record.nextFollowTime) : undefined,
    });
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
    {
      title: "跟进方式",
      dataIndex: "followType",
      width: 100,
      render: (_, record) => followTypeMap[record.followType] || record.followType,
    },
    { title: "跟进内容", dataIndex: "content", width: 300, ellipsis: true },
    {
      title: "跟进结果",
      dataIndex: "followResult",
      width: 100,
      render: (_, record) => {
        if (!record.followResult) return "-";
        return <Tag color="blue">{followResultMap[record.followResult] || record.followResult}</Tag>;
      },
    },
    {
      title: "下次跟进时间",
      dataIndex: "nextFollowTime",
      width: 170,
      render: (_, record) =>
        record.nextFollowTime ? dayjs(record.nextFollowTime).format("YYYY-MM-DD HH:mm") : "-",
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      width: 170,
      render: (_, record) =>
        record.createdTime ? dayjs(record.createdTime).format("YYYY-MM-DD HH:mm") : "-",
    },
  ];

  return (
    <>
      <Modal
        title={`${configData.customerName ?? ""} - 跟进记录`}
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
          style={{ maxWidth: "none" }}
        >
          <Form.Item label="跟进方式" name="followType">
            <Select placeholder="请选择跟进方式" style={{ width: 150 }} options={followTypeOptions} allowClear />
          </Form.Item>
          <Form.Item label="跟进结果" name="followResult">
            <Select placeholder="请选择跟进结果" style={{ width: 150 }} options={followResultOptions} allowClear />
          </Form.Item>
          <Form.Item>
            <Button onClick={reset} style={{ marginRight: "4px" }}>重置</Button>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
          </Form.Item>
        </Form>

        <div style={{ margin: "12px 0" }}>
          <Button icon={<PlusOutlined />} style={{ marginRight: "8px" }} type="primary" onClick={handleAdd}>
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
        width={640}
      >
        <Form className="base-form" labelCol={{ span: 6 }} form={form}>
          <Form.Item name="id" hidden><Input /></Form.Item>
          <Form.Item name="customerId" hidden><Input /></Form.Item>

          <Form.Item
            label="跟进方式"
            name="followType"
            rules={[{ required: true, message: "请选择跟进方式" }]}
          >
            <Select placeholder="请选择跟进方式" options={followTypeOptions} />
          </Form.Item>
          <Form.Item
            label="跟进内容"
            name="content"
            rules={[{ required: true, message: "请输入跟进内容" }]}
          >
            <Input.TextArea rows={4} placeholder="请输入跟进内容" />
          </Form.Item>
          <Form.Item label="跟进结果" name="followResult">
            <Select placeholder="请选择跟进结果" options={followResultOptions} />
          </Form.Item>
          <Form.Item label="下次跟进时间" name="nextFollowTime">
            <DatePicker showTime style={{ width: "100%" }} placeholder="请选择下次跟进时间" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default CustomerFollowDialog;
