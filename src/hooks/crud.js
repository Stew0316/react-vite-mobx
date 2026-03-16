import { useState, useEffect, useRef, useImperativeHandle } from "react";
import { message } from "antd";
import { delConfirm } from "@/utils/feedBack";

const useCrud = ({
  selectData,
  getList,
  delApi,
  addApi,
  editApi,
  editKey = "id",
  ref,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const allDel = () => {
    if (selectData.length == 0)
      return message.open({
        type: "error",
        content: "请先选择一条记录",
      });
    delConfirm().then(() => {
      delApi(selectData.map((item) => item.id)).then((res) => {
        message.open({
          type: "success",
          content: "删除成功",
        });
        getList();
      });
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (isEdit) {
        // 编辑
        setFormData((preValue) => {
          return {
            ...preValue,
            ...values,
          };
        });
        editApi({
          [editKey]: formData[editKey],
          ...values,
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
        addApi(values).then((res) => {
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

  const add = () => {
    setIsEdit(false);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    editModal: (data) => {
      setIsModalOpen(true);
      setIsEdit(true);
      setFormData(data);
      form.setFieldsValue(data);
    },
  }));

  return {
    allDel,
    isEdit,
    isModalOpen,
    form,
    add,
    handleCancel,
    handleOk,
    setFormData,
    setIsModalOpen,
  };
};

export default useCrud;
