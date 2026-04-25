import { useAuthStore } from "@/store/authStore";

const PermButton = ({ perm, children, ...props }) => {
  const permissions = useAuthStore(s => s.userInfo?.permissions ?? []);
  if (perm && !permissions.includes(perm)) return null;
  return <Button {...props}>{children}</Button>;
};

export default PermButton;