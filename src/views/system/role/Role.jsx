import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import Wrap from '@/layout/Wrap';
import useCrudTable from '@/hooks/useCrudTable';
import RoleBtn from './RoleBtn';
import { getList as getData, delItem, getPermitTree, assignMenus } from '@/api/system/role';
import { useDictObj, useDictArray } from '@/hooks/dict';
import { getTree } from '@/api/system/menu';
import { message } from 'antd';

const Role = () => {

  const btnRef = useRef();
  const statusObj = useDictObj("common_status");
  const statusOptions = useDictArray("common_status");
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
    getList,
    delData,
    openEdit,
  } = useCrudTable({
    listApi: getData,
    delApi: delItem,
    openEditOverride: (record) => btnRef.current?.editModal(record),
  });

  const getTreeData = async () => {
    const res = await getTree();
    setTreeData(res);
  }


  const openPermit = async (record) => {
    setPermitOpen(true);
    const res = await getPermitTree(record.id)
    setOpenData(record);
    setCheckedKeys(res);
  }

  const perimitOk = async () => {
    await assignMenus({
      roleId: openData.id,
      menuIds: checkedKeys,
    })
    message.success("权限分配成功");
    setPermitOpen(false);
  }

  const perimitCancel = () => {
    setPermitOpen(false);
  }

  const treeCheck = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '角色排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === 1 ? 'green' : 'red'}>
          {statusObj?.[record.status]}
        </Tag>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 380,
      render: (text, record, index) => (
        <>
          <Button icon={<EditOutlined />} type="link" onClick={() => openEdit(record)}>编辑</Button>
          <Button icon={<MenuOutlined />} type="link" onClick={() => openPermit(record)}>菜单权限</Button>
          <Button icon={<DeleteOutlined />} type="link" onClick={() => delData(record)}>删除</Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getTreeData();
  }, [])

  return (
    <>
      <Wrap
        className="container"
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
          <RoleBtn ref={btnRef} selectData={selectData} getList={getList} />
        }
      >
        <Form.Item
          label="角色名称"
          name='name'
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item
          label="角色编码"
          name='code'
        >
          <Input placeholder="请输入角色编码" />
        </Form.Item>
        <Form.Item
          label="角色状态"
          name='status'
        >
          <Select placeholder="请选择角色状态" style={{ width: 120 }} options={statusOptions}></Select>
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
  )
}

export default Role