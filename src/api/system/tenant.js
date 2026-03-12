import service from "..";

export function getPage(params) {
  return service({
    method: "get",
    url: "/tenant/list",
    params,
  });
}
