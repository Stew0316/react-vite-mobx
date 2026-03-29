import Wrap from "@/layout/Wrap";
import { message } from "antd";
import { useRef, useState, useEffect } from "react";
import { getPage, delItem } from "@/api/system/tenant";
import { DeleteOutlined, EditOutlined, MenuOutlined } from "@ant-design/icons";
import TenantBtn from "./TenantBtn";
import useCrudTable from "@/hooks/useCrudTable";
import { getPermitId, savePermit } from "@/api/system/tenant";
import { getTree } from '@/api/system/menu';

const statusMap = { 1: "启用", 0: "禁用" };
const colorMap = { 1: "green", 0: "red" };

const statusOptions = [
  { value: 1, label: "启用" },
  { value: 0, label: "禁用" },
];

const Tenant = () => {
  const btnRef = useRef();

  const [perimitOpen, setPermitOpen] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [openData, setOpenData] = useState({});

  const {
    page,
    tableData,
    selectData,
    rowSelection,
    pagiChange,
    openEdit,
    getList,
    delData,
  } = useCrudTable({
    listApi: getPage,
    delApi: delItem,
    openEditOverride: (record) => btnRef.current?.editModal(record),
  });

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "租户名称", dataIndex: "name" },
    {
      title: "租户状态",
      dataIndex: "status",
      render: (_, record) => (
        <Tag color={colorMap[record.status]}>{statusMap[record.status]}</Tag>
      ),
    },
    { title: "联系方式", dataIndex: "contact" },
    { title: "联系地址", dataIndex: "address" },
    {
      title: "租户类型",
      render: (_, record) => {
        return record.userType == 1 ? "普通租户" : "管理员"
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Button icon={<MenuOutlined />} type="link" onClick={() => openPermit(record)}>菜单权限</Button>
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => delData(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  const getTreeData = async () => {
    const res = await getTree();
    setTreeData(res);
  }

  const openPermit = async (record) => {
    const res = await getPermitId(record.id);
    setCheckedKeys(res);
    setPermitOpen(true);
    setOpenData(record);

  }

  const treeCheck = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys);
  }

  const perimitOk = async () => {
    await savePermit({
      tenantId: openData.id,
      menuIds: checkedKeys,
    })
    message.success("权限分配成功");
    setPermitOpen(false);
  }

  const perimitCancel = () => {
    setPermitOpen(false);
  }

  useEffect(() => {
    getTreeData();
  }, [])

  return (
    <>
      <Wrap
        className="tenant-container"
        getData={getList}
        columns={columns}
        rowSelection={rowSelection}
        tableData={tableData}
        pagination={{
          current: page.current,
          pageSize: page.pageSize,
          total: page.total,
          onChange: pagiChange,
          showSizeChanger: true,
          showTotal: () => `共 ${page.total} 条`,
        }}
        Btn={
          <TenantBtn ref={btnRef} selectData={selectData} getList={getList} />
        }
      >
        <Form.Item label="租户名称" name="name">
          <Input placeholder="请输入租户名称" />
        </Form.Item>
        <Form.Item label="租户状态" name="status">
          <Select
            placeholder="请选择租户状态"
            style={{ width: 120 }}
            options={statusOptions}
          />
        </Form.Item>
      </Wrap>
      <Modal
        title="菜单权限设置"
        open={perimitOpen}
        onOk={perimitOk}
        onCancel={perimitCancel}
      >
        <Tree
          checkable
          onCheck={treeCheck}
          treeData={treeData}
          checkedKeys={checkedKeys}
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        />
      </Modal>
    </>
  );
};

export default Tenant;