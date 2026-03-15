import { useState, useEffect, useRef } from "react";

import { delConfirm } from "@/utils/feedBack";

const useTable = ({ listApi, delApi, autoRequest = true }) => {
  const [tableData, setTableData] = useState([]);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const btnRef = useRef();

  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    if (autoRequest) {
      getList();
    }
  }, []);

  const getList = (params = {}) => {
    listApi({
      page: page.current,
      pageSize: page.pageSize,
      ...params,
    }).then((res) => {
      setPage((prevPage) => ({
        ...prevPage,
        total: res.total,
      }));
      setTableData(res.records);
    });
  };

  const delData = (record, key = "id") => {
    delConfirm().then(() => {
      delApi([record[key]]).then(() => {
        getList();
      });
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectData(selectedRows);
    },
  };

  const pagiChange = (current, pageSize) => {
    page.current = current;
    page.pageSize = pageSize;
    getList();
  };

  const editData = (record) => {
    btnRef.current.editModal(record);
  };

  return {
    tableData,
    checkStrictly,
    selectData,
    delData,
    rowSelection,
    btnRef,
    editData,
    pagiChange,
    getList,
    page,
    setTableData,
  };
};

export default useTable;
