import service from "..";

export function getUserInfo() {
  return service({
    method: "get",
    url: "/auth/userInfo",
    noMessage: true,
  });
}
