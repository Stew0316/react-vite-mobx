import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { delItem, addItem, editItem } from "@/api/crm/customer";
import useCrudTable from "@/hooks/useCrudTable";
import PermButton from "@/components/PermButton";
import CustomerContactDialog from "./CustomerContactDialog";
import CustomerFollowDialog from "./CustomerFollowDialog";
import { useDictArray } from "@/hooks/dict";
import dayjs from "dayjs";

const CustomerBtn = forwardRef(({ selectData, getList }, ref) => {
  const contactDialogRef = useRef();
  const followDialogRef = useRef();
  const [configData, setConfigData] = useState({});
  const customerLevelOptions = useDictArray("customer_level");
  const customerStatusOptions = useDictArray("customer_status");
  const customerSouceOptions = useDictArray("customer_source");
  const countryOptions = useDictArray("country");
  const [cityOptions, setCityOptions] = useState([]);

  const {
    isEdit,
    isModalOpen,
    form,
    openAdd,
    openEditModal,
    handleCancel,
    handleOk,
    batchDel,
  } = useCrudTable({
    listApi: () => Promise.resolve({ records: [], total: 0 }),
    delApi: delItem,
    addApi: addItem,
    editApi: editItem,
    autoRequest: false,
    onSuccess: getList,
    externalSelectData: selectData,
  });

  const countryChange = (data) => {
    form.setFieldsValue({ city: undefined });
    if (!data) {
      setCityOptions([]);
      return;
    }
    setCityOptions(countryOptions.find(item => item.value == data)?.children || []);
  }

  useImperativeHandle(ref, () => ({
    editModal: (record) => {
      openEditModal({
        ...record,
        nextFollowTime: record.nextFollowTime ? dayjs(record.nextFollowTime) : undefined,
      });
    },
    openConfig: (data) => {
      setConfigData(data);
      contactDialogRef.current?.openDialog(data.id);
    },
    openFollow: (data) => {
      setConfigData(data);
      followDialogRef.current?.openDialog(data.id);
    },
  }));

  return (
    <>
      <div className="btns">
        <PermButton perm="crm:customer:add" className="btn" type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          新增
        </PermButton>
        <PermButton perm="crm:customer:delete" type="primary" danger icon={<DeleteOutlined />} onClick={batchDel}>
          删除
        </PermButton>
      </div>

      <CustomerContactDialog ref={contactDialogRef} configData={configData} />
      <CustomerFollowDialog ref={followDialogRef} configData={configData} />

      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={940}
      >
        <Form className="base-form" labelCol={{ span: 6 }} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="客户名称"
                name="customerName"
                rules={[{ required: true, message: "请输入客户名称", max: 255 }]}
              >
                <Input placeholder="请输入客户名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="客户编号"
                name="customerNo"
                rules={[{ required: true, message: "请输入客户编号", max: 64 }]}
              >
                <Input placeholder="请输入客户编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="简称" name="shortName">
                <Input placeholder="请输入简称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="客户等级" name="level">
                <Select placeholder="请选择客户等级" options={customerLevelOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态" name="status">
                <Select placeholder="请选择状态" options={customerStatusOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="来源" name="source">
                <Select placeholder="请选择来源" options={customerSouceOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="国家" name="country">
                <Select
                  placeholder="请选择来源"
                  options={countryOptions}
                  allowClear={true}
                  onChange={(e) => countryChange(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="城市" name="city">
                <Select
                  placeholder="请选择来源"
                  options={cityOptions}
                  allowClear={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="地址" name="address">
                <Input placeholder="请输入地址" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="网站" name="website">
                <Input placeholder="请输入网站" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="时区" name="timezone">
                <Input placeholder="请输入时区" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="税号" name="taxNo">
                <Input placeholder="请输入税号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="下次跟进时间" name="nextFollowTime">
                <DatePicker showTime style={{ width: "100%" }} placeholder="请选择下次跟进时间" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="备注" name="remark">
                <Input.TextArea rows={3} placeholder="请输入备注" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
});

export default CustomerBtn;
