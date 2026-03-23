import Wrap from "@/layout/Wrap";
import useCrudTable from "@/hooks/useCrudTable";
import { useDictArray } from "@/hooks/dict";
import { addItem, delItem, editItem, getTree } from "@/api/system/menu";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const MENU_TYPE_MAP = {
  1: "目录",
  2: "菜单",
  3: "按钮",
};

const MENU_TYPE_OPTIONS = [
  { label: "目录", value: 1 },
  { label: "菜单", value: 2 },
  { label: "按钮", value: 3 },
];

const STATUS_OPTIONS = [
  { label: "启用", value: 1 },
  { label: "禁用", value: 0 },
];

const BOOL_RADIO = [
  { label: "是", value: true },
  { label: "否", value: false },
];

const normalizeTreeResult = (res) => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.records)) return res.records;
  if (Array.isArray(res?.data)) return res.data;
  return [];
};

const buildParentOptions = (nodes = []) => {
  return nodes.map((node) => ({
    title: node.name,
    value: node.id,
    key: node.id,
    children: buildParentOptions(node.children || []),
  }));
};

const MenuSet = () => {
  const {
    tableData,
    rowSelection,
    getList,
    delData,
    batchDel,
    openAdd,
    openEdit,
    isModalOpen,
    isEdit,
    form,
    handleOk,
    handleCancel,
  } = useCrudTable({
    listApi: async ({ page: _page, pageSize: _pageSize, ...params }) => {
      const treeData = normalizeTreeResult(await getTree(params));
      return { records: treeData, total: treeData.length };
    },
    delApi: delItem,
    addApi: addItem,
    editApi: editItem,
    autoRequest: true,
  });

  const statusOptions = useDictArray("common_status");

  const columns = [
    {
      title: "菜单名称",
      dataIndex: "name",
      key: "name",
      width: 220,
    },
    {
      title: "菜单类型",
      dataIndex: "menu_type",
      width: 100,
      render: (value) => MENU_TYPE_MAP[value] || "-",
    },
    {
      title: "路由地址",
      dataIndex: "path",
      ellipsis: true,
    },
    {
      title: "组件路径",
      dataIndex: "component",
      ellipsis: true,
    },
    {
      title: "权限标识",
      dataIndex: "perms",
      ellipsis: true,
    },
    {
      title: "图标",
      dataIndex: "icon",
      width: 120,
    },
    {
      title: "排序",
      dataIndex: "sort",
      width: 80,
    },
    {
      title: "可见",
      dataIndex: "is_visible",
      width: 80,
      render: (value) => (
        <Tag color={value ? "green" : "red"}>{value ? "显示" : "隐藏"}</Tag>
      ),
    },
    {
      title: "缓存",
      dataIndex: "is_cache",
      width: 80,
      render: (value) => (value ? "是" : "否"),
    },
    {
      title: "外链",
      dataIndex: "is_frame",
      width: 80,
      render: (value) => (value ? "是" : "否"),
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 80,
      render: (value) => (
        <Tag color={value === 1 ? "green" : "red"}>
          {value === 1 ? "启用" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updated_time",
      width: 180,
      render: (text) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : ""),
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      fixed: "right",
      render: (_, record) => (
        <Space size={0}>
          <Button icon={<EditOutlined />} type="link" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            onClick={() => delData(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const btns = (
    <div style={{ marginBottom: 12 }}>
      <Button
        icon={<PlusOutlined />}
        style={{ marginRight: 8 }}
        type="primary"
        onClick={openAdd}
      >
        新增
      </Button>
      <Button icon={<DeleteOutlined />} onClick={batchDel} type="primary" danger>
        删除
      </Button>
    </div>
  );

  return (
    <>
      <Wrap
        getData={getList}
        Btn={btns}
        columns={columns}
        tableData={tableData}
        rowSelection={rowSelection}
        rowKey="id"
        pagination={false}
        defaultExpandAllRows
        scroll={{ x: 1500 }}
      >
        <Form.Item label="菜单名称" name="name">
          <Input placeholder="请输入菜单名称" allowClear />
        </Form.Item>
        <Form.Item label="菜单状态" name="status">
          <Select
            style={{ width: 180 }}
            placeholder="请选择菜单状态"
            options={statusOptions || STATUS_OPTIONS}
            allowClear
          />
        </Form.Item>
        <Form.Item label="菜单类型" name="menu_type">
          <Select
            style={{ width: 180 }}
            placeholder="请选择菜单类型"
            options={MENU_TYPE_OPTIONS}
            allowClear
          />
        </Form.Item>
      </Wrap>

      <Modal
        title={isEdit ? "编辑菜单" : "新增菜单"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        width={920}
      >
        <Form
          className="base-form"
          labelCol={{ span: 8 }}
          form={form}
          initialValues={{
            parent_id: null,
            menu_type: 1,
            sort: 0,
            is_visible: true,
            is_cache: false,
            is_frame: false,
            status: 1,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="上级菜单" name="parent_id">
                <TreeSelect
                  treeData={buildParentOptions(tableData)}
                  placeholder="请选择上级菜单"
                  allowClear
                  treeDefaultExpandAll
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="菜单名称"
                name="name"
                rules={[{ required: true, message: "请输入菜单名称" }]}
              >
                <Input placeholder="请输入菜单名称" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="菜单类型"
                name="menu_type"
                rules={[{ required: true, message: "请选择菜单类型" }]}
              >
                <Select options={MENU_TYPE_OPTIONS} placeholder="请选择菜单类型" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="菜单状态" name="status">
                <Select
                  options={statusOptions || STATUS_OPTIONS}
                  placeholder="请选择菜单状态"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="路由地址" name="path">
                <Input placeholder="请输入路由地址" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="组件路径" name="component">
                <Input placeholder="请输入组件路径" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="权限标识" name="perms">
                <Input placeholder="请输入权限标识" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="菜单图标" name="icon">
                <Input placeholder="请输入菜单图标" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="菜单排序" name="sort">
                <InputNumber min={0} precision={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="是否可见" name="is_visible">
                <Radio.Group options={BOOL_RADIO} optionType="button" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="是否缓存" name="is_cache">
                <Radio.Group options={BOOL_RADIO} optionType="button" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="是否外链" name="is_frame">
                <Radio.Group options={BOOL_RADIO} optionType="button" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="备注" name="remark" labelCol={{ span: 4 }}>
                <Input.TextArea rows={3} placeholder="请输入备注" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default MenuSet;