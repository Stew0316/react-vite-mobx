import Wrap from "@/layout/Wrap";
import { useRef, useMemo } from "react";
import { getPage, delItem } from "@/api/crm/customer";
import { DeleteOutlined, EditOutlined, ContactsOutlined, OrderedListOutlined } from "@ant-design/icons";
import CustomerBtn from "./CustomerBtn";
import useCrudTable from "@/hooks/useCrudTable";
import PermButton from "@/components/PermButton";
import { useDictArray, useDictObj } from "@/hooks/dict";

const Customer = () => {
  const btnRef = useRef();

  const customerLevelOptions = useDictArray("customer_level");
  const customerLevelMap = useDictObj("customer_level");
  const customerStatusMap = useDictObj("customer_status");
  const customerStatusOptions = useDictArray("customer_status");
  const customerSourceMap = useDictObj("customer_source");

  const customerLevelColorMap = useMemo(() => {
    const colorMap = {};
    if (!customerLevelOptions) return colorMap;
    customerLevelOptions.forEach(data => {
      try {
        colorMap[data.value] = JSON.parse(data.extraData).color;
      } catch (error) {
        console.log("error", error);
      }
    });
    return colorMap;
  }, [customerLevelOptions])

  const customerStatusColorMap = useMemo(() => {
    const colorMap = {};
    if (!customerStatusOptions) return colorMap;
    customerStatusOptions.forEach(data => {
      try {
        colorMap[data.value] = JSON.parse(data.extraData).color;
      } catch (error) {
        console.log("error", error);
      }
    });
    return colorMap;
  }, [customerStatusOptions])

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

  const openContacts = (record) => {
    btnRef.current?.openConfig(record);
  };

  const openFollow = (record) => {
    btnRef.current?.openFollow(record);
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "客户编号", dataIndex: "customerNo", width: 120 },
    { title: "客户名称", dataIndex: "customerName", width: 180 },
    { title: "简称", dataIndex: "shortName", width: 100 },
    {
      title: "等级",
      dataIndex: "level",
      width: 80,
      render: (_, record) => {
        return <Tag color={customerLevelColorMap[record.level]}>{customerLevelMap[record.level]}</Tag>
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      render: (_, record) => (
        <Tag color={customerStatusColorMap[record.status]}>{customerStatusMap[record.status]}</Tag>
      ),
    },
    {
      title: "来源",
      dataIndex: "source",
      width: 100,
      render: (_, record) => customerSourceMap[record.source] || "-"
    },
    { title: "国家", dataIndex: "country", width: 100 },
    { title: "城市", dataIndex: "city", width: 100 },
    { title: "网站", dataIndex: "website", width: 150 },
    { title: "备注", dataIndex: "remark", width: 150, ellipsis: true },
    {
      title: "操作",
      dataIndex: "action",
      width: 280,
      fixed: "right",
      render: (_, record) => (
        <>
          <PermButton perm="crm:customer:add" icon={<EditOutlined />} type="link" onClick={() => openEdit(record)}>
            编辑
          </PermButton>
          <PermButton perm="crm:customer:add" icon={<ContactsOutlined />} type="link" onClick={() => openContacts(record)}>
            联系人
          </PermButton>
          <PermButton perm="crm:customer:add" icon={<OrderedListOutlined />} type="link" onClick={() => openFollow(record)}>
            跟进
          </PermButton>
          <PermButton perm="crm:customer:delete" icon={<DeleteOutlined />} type="link" danger onClick={() => delData(record)}>
            删除
          </PermButton>
        </>
      ),
    },
  ];

  return (
    <Wrap
      className="customer-container"
      getData={getList}
      columns={columns}
      rowSelection={rowSelection}
      tableData={tableData}
      scroll={{ x: 1400 }}
      pagination={{
        current: page.current,
        pageSize: page.pageSize,
        total: page.total,
        onChange: pagiChange,
        showSizeChanger: true,
        showTotal: () => `共 ${page.total} 条`,
      }}
      Btn={
        <CustomerBtn ref={btnRef} selectData={selectData} getList={getList} />
      }
    >
      <Form.Item label="客户名称" name="customerName">
        <Input placeholder="请输入客户名称" />
      </Form.Item>
      <Form.Item label="客户编号" name="customerNo">
        <Input placeholder="请输入客户编号" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          placeholder="请选择状态"
          style={{ width: 120 }}
          options={customerStatusOptions}
          allowClear
        />
      </Form.Item>
      <Form.Item label="等级" name="level">
        <Select
          placeholder="请选择等级"
          style={{ width: 120 }}
          options={customerLevelOptions}
          allowClear
        />
      </Form.Item>
    </Wrap>
  );
};

export default Customer;
