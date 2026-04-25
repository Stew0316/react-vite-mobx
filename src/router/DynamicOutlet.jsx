import { useLocation } from "react-router";
import { useAuthStore } from "@/store/authStore";
import componentMap from "./componentMap";

/**
 * 递归提取 menuTree 中所有叶子节点（menuType === 2，有 component 的节点）
 */
const flattenMenuTree = (tree) => {
  const result = [];
  tree?.forEach((item) => {
    if (item.menuType === 1 && item.component) {
      result.push(item);
    }
    if (item.children?.length) {
      result.push(...flattenMenuTree(item.children));
    }
  });
  return result;
};

/**
 * 动态路由出口
 * 根据当前 URL 路径，在 menuTree 中找到对应菜单项，再通过 componentMap 渲染对应组件。
 * 不需要在 router/index.jsx 里逐条写系统路由，只需添加 <Route path="*" element={<DynamicOutlet />} />
 */
const DynamicOutlet = () => {
  const location = useLocation();
  const userInfo = useAuthStore((state) => state.userInfo);

  const flatMenus = flattenMenuTree(userInfo?.menuTree);

  // location.pathname 形如 "/home/dict"，menu.path 形如 "/dict"
  const currentPath = location.pathname.replace(/^\/home/, "");

  const matched = flatMenus.find((m) => m.path === currentPath);

  if (!matched?.component) return null;

  const factory = componentMap[matched.component.slice(1)];
  if (!factory) return null;

  return factory(matched);
};

export default DynamicOutlet;
