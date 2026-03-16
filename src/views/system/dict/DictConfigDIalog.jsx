import { forwardRef, useImperativeHandle } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useCrud from "@/hooks/crud";
import useTable from "@/hooks/table";
import { itemPage, itemDel, itemAdd, itemEdit } from "@/api/system/dict"
import { delConfirm } from "@/utils/feedBack";
const DictConfigDIalog = forwardRef(({ configData, ...props }, ref) => {

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

  const {
    isEdit,
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

  const onFinish = (data) => {
    console.log(data)
  }

  useImperativeHandle(ref, () => {
    return {
      openDialog: () => {
        setIsModalOpen(true)
        getList({ typeId: configData.id })
      }
    }
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
          onFinish={onFinish}
          ref={formRef}
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
          rowSelection={rowSelection}
        />
      </Modal>
    </>
  )
});

export default DictConfigDIalog;