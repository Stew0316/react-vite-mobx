import { useState, useEffect, useRef, useImperativeHandle } from "react";
import { Form, message } from "antd";
import { delConfirm } from "@/utils/feedBack";

/**
 * useCrudTable
 *
 * @param {Function} options.listApi            列表接口
 * @param {Function} options.delApi             删除接口
 * @param {Function} options.addApi             新增接口
 * @param {Function} options.editApi            编辑接口
 * @param {string}  [options.editKey="id"]      主键字段名
 * @param {boolean} [options.autoRequest=true]  初始化是否自动请求
 * @param {object}  [options.defaultPage]       默认分页
 * @param {Ref}     [options.ref]               useImperativeHandle 用
 * @param {Function}[options.onSuccess]         增删改成功后的额外回调（如通知父组件刷新）
 * @param {Array}   [options.externalSelectData] 从外部注入的已选数据（父组件控制选中的场景）
 * @param {Function}[options.openEditOverride]  覆盖默认的 openEdit（表格和弹窗不在同一组件时）
 * @param {object}  [options.defaultParams={}]  固定查询参数，每次请求（含翻页、重置）都会带上
 */
const useCrudTable = ({
  listApi,
  delApi,
  addApi,
  editApi,
  editKey = "id",
  autoRequest = true,
  defaultPage = { current: 1, pageSize: 10 },
  defaultParams = {},
  ref,
  onSuccess,
  externalSelectData,
  openEditOverride,
}) => {
  // ─── 表格状态 ────────────────────────────────────────────────────────────────
  const [tableData, setTableData] = useState([]);
  const [internalSelectData, setInternalSelectData] = useState([]);
  const [page, setPage] = useState({ ...defaultPage, total: 0 });

  // 优先使用外部注入的 selectData（DictBtn 场景：选中状态由父组件 Dict 管理）
  const selectData = externalSelectData ?? internalSelectData;

  // ─── 弹窗 / 表单状态 ─────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  // 用 ref 存当前编辑行的主键，避免 setState 异步读到旧值
  const editKeyValueRef = useRef(null);

  // 搜索表单 ref
  const formRef = useRef();

  // ─── 初始化 ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (autoRequest) getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── 列表 ────────────────────────────────────────────────────────────────────
  const getList = (params = {}) => {
    listApi({
      page: page.current,
      pageSize: page.pageSize,
      ...defaultParams,
      ...params,
    }).then((res) => {
      setPage((prev) => ({ ...prev, total: res.total }));
      setTableData(res.records);
    });
  };

  const pagiChange = (current, pageSize) => {
    setPage((prev) => ({ ...prev, current, pageSize }));
    getList({ page: current, pageSize, ...defaultParams });
  };

  const reset = () => {
    formRef.current?.resetFields();
    getList({
      page: defaultPage.current,
      pageSize: defaultPage.pageSize,
      ...defaultParams,
    });
  };

  // ─── 选择 ────────────────────────────────────────────────────────────────────
  const rowSelection = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setInternalSelectData(selectedRows);
    },
  };

  // ─── 删除 ────────────────────────────────────────────────────────────────────
  const delData = (record) => {
    delConfirm().then(() => {
      delApi([record[editKey]]).then(() => {
        message.success("删除成功");
        onSuccess?.();
        getList({ ...defaultParams });
      });
    });
  };

  const batchDel = () => {
    if (selectData.length === 0) {
      message.error("请先选择一条记录");
      return;
    }
    delConfirm().then(() => {
      delApi(selectData.map((item) => item[editKey])).then(() => {
        message.success("删除成功");
        setInternalSelectData([]);
        onSuccess?.();
        getList({ ...defaultParams });
      });
    });
  };

  // ─── 弹窗 ────────────────────────────────────────────────────────────────────
  const openAdd = () => {
    setIsEdit(false);
    editKeyValueRef.current = null;
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (record) => {
    // 如果外部传了 override（表格和弹窗不在同一组件），走外部逻辑
    if (openEditOverride) {
      openEditOverride(record);
      return;
    }
    setIsEdit(true);
    editKeyValueRef.current = record[editKey];
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // 供通过 ref 暴露 editModal 的场景直接调用
  const openEditModal = (record) => {
    setIsEdit(true);
    editKeyValueRef.current = record[editKey];
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const request = isEdit
        ? editApi({
            ...defaultParams,
            [editKey]: editKeyValueRef.current,
            ...values,
          })
        : addApi({ ...defaultParams, ...values });

      request.then(() => {
        message.success(isEdit ? "修改成功" : "添加成功");
        form.resetFields();
        setIsModalOpen(false);
        onSuccess?.();
        getList({ ...defaultParams });
      });
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // ─── 暴露给父组件 ────────────────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    editModal: openEdit,
  }));

  return {
    // 表格
    tableData,
    setTableData,
    page,
    pagiChange,
    rowSelection,
    selectData,
    formRef,

    // 增删改
    openAdd,
    openEdit,
    openEditModal,
    editData: openEdit,
    delData,
    batchDel,

    // 弹窗 / 表单
    isModalOpen,
    isEdit,
    form,
    handleOk,
    handleCancel,

    // 工具
    getList,
    reset,
  };
};

export default useCrudTable;
