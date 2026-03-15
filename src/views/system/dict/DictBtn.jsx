import { Button, message, Modal, Form, Input, InputNumber, Radio, Table, Row, Col } from "antd";
import { delConfirm } from "@/utils/feedBack";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { delItem, itemDel, addItem, editItem, itemPage as getChild } from "@/api/system/dict";
import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import useCrud from "@/hooks/crud";
import useTable from "@/hooks/table";
import { SOURCE_SYSTEM_OPTIONS, SOURCE_SYSTEM_DEFAULT } from "@/constant/system";
import DictConfigBtn from "./DictConfigBtn";

const DictBtn = forwardRef(({ selectData, getList, ...props }, ref) => {

  const {
    isEdit,
    isModalOpen,
    form,
    allDel,
    add,
    handleCancel,
    handleOk,
    setFormData
  } = useCrud({
    selectData,
    getList,
    delApi: delItem,
    addApi: addItem,
    editApi: editItem,
    ref
  })
  const [childForm] = Form.useForm();
  const configDel = () => {
    if (configSelectData.length == 0) {
      return message.open({
        type: "error",
        content: "请先选择一个字典",
      });
    }
    delConfirm().then(() => {
      itemDel(configSelectData.map((item) => item.id)).then((res) => {
        message.open({
          type: "success",
          content: "删除成功",
        });
        getConfig()
      });
    });
  }

  const {
    page,
    btnRef,
    tableData,
    setTableData,
    // selectData,
    checkStrictly,
    pagiChange,
    editData,
    // getList,
    delData,
    rowSelection
  } = useTable({
    listApi: getChild, delApi: delItem,
  });

  const [configData, setConfigData] = useState({});
  // config数据区
  const [configForm] = Form.useForm();
  const [configOpen, setConfigOpen] = useState(false);
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
    if (configData.id) {
      getConfig();
    }
  }, [configData])
  useImperativeHandle(ref, () => ({
    ...ref.current,
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
      <DictConfigBtn configData={configData}></DictConfigBtn>
      <Modal
        title={isEdit ? "编辑" : "新增"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          className="base-form"
          labelCol={{ span: 8 }}
          initialValues={{
            status: 1,
            sourceSystem: SOURCE_SYSTEM_DEFAULT
          }}
          form={form}
        >
          <Form.Item
            label="字典编号"
            name="code"
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
            label="外部平台字典类型编码"
            name="externalCode"
          >
            <Input placeholder="请输入外部平台字典类型编码" />
          </Form.Item>
          <Form.Item
            label="外部平台字典类型名称"
            name="externalName"
          >
            <Input placeholder="请输入外部平台字典类型名称" />
          </Form.Item>
          <Form.Item
            label="是否启用"
            name="status"
            rules={[
              {
                required: true,
                message: "请选择是否启用",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="来源"
            name="sourceSystem"
            rules={[
              {
                required: true,
                message: "请选择来源",
              },
            ]}
          >
            <Select
              placeholder="请选择租户状态"
              style={{ width: 120 }}
              options={SOURCE_SYSTEM_OPTIONS}
            ></Select>
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
