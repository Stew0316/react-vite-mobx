import { getTenantAll } from "@/api/system/tenant"
import { useEffect, useMemo, useState } from "react"
import { useAuthStore } from "@/store/authStore";
import { X_Tenant_Id } from "@/constant/storage";

const TenantChang = () => {

  const [tenantList, setTenantList] = useState([]);
  const userInfo = useAuthStore((state) => state.userInfo);
  const [tenantSelect, setTenantSelect] = useState(null);
  const setEffctTenantId = useAuthStore((state) => state.setEffctTenantId);

  const getList = async () => {
    const res = await getTenantAll();
    setTenantList(res);
  }

  const changeData = (value) => {
    setTenantSelect(value);
    sessionStorage.setItem(X_Tenant_Id, value);
    setEffctTenantId(value);
    // window.location.reload();
  }

  useEffect(() => {
    if (userInfo && userInfo.hasOwnProperty('tenantId')) {
      setTenantSelect(userInfo.tenantId);
    }
    const storageTenantId = sessionStorage.getItem(X_Tenant_Id);
    if (storageTenantId) {
      setTenantSelect(Number(storageTenantId));
    }
  }, [userInfo])

  useEffect(() => {
    getList();
  }, [])

  return (
    <div className="ml-2">
      <span className="mr-2">修改租户</span>
      <Select
        value={tenantSelect}
        placeholder="切换租户"
        style={{ width: 120 }}
        fieldNames={{ label: 'name', value: 'id' }}
        options={tenantList}
        onChange={changeData}
      ></Select>
    </div>
  )
}

export default TenantChang