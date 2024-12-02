import { Button, message, Modal, Form, Input, InputNumber, Radio  } from "antd";
import { delConfirm } from "@/utils/feedBack";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { getParent, delItem, delBatch, addItem, editItem } from "@/api/system/dict";
import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { flushSync } from "react-dom";
const DictBtn = forwardRef(({ selectData, getList, ...props }, ref) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
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
  useImperativeHandle(ref, () => ({
    editModal: (data) => {
      setIsModalOpen(true);
      setIsEdit(true);
      setFormData(data);
      form.setFieldsValue(data);
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
