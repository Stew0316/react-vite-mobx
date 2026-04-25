import Dict from "@/views/system/dict/Dict";
import MenuSet from "@/views/system/MenuSet";
import Role from "@/views/system/role/Role";
import Users from "@/views/system/User/Users";
import Account from "@/views/system/Account";
import Dept from "@/views/system/dept/Dept";
import Tenant from "@/views/system/tenant/Tenant";

/**
 * key: menuTree 里 component 字段去掉首 /
 * value: 函数，接受 menu 对象，返回 React element（可按 menu.path 注入 props）
 *
 * 新增菜单时，在后台配置好 component 路径后，在此处添加对应映射即可。
 */
const componentMap = {
  "system/MenuSet": () => <MenuSet />,
  "system/User": () => <Users />,
  "system/Account": () => <Account />,
  "system/dict/Dict": (menu) =>
    menu.path === "/dictGlobal" ? <Dict key="dictGlobal" isGlobal /> : <Dict key="dict" />,
  "system/dept/Dept": () => <Dept />,
  "system/tenant/Tenant": () => <Tenant />,
  "permission/Role": () => <Role />,
};

export default componentMap;
