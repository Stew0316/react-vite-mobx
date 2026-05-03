import service from "..";

const API_PREFIX = "/manage";

export function getPage(params) {
  return service({
    method: "get",
    url: API_PREFIX + "/customer/assignLog/list",
    params,
  });
}
