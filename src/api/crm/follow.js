import service from "..";

const API_PREFIX = "/manage";

export function getPage(params) {
  return service({
    method: "get",
    url: API_PREFIX + "/customer/follow/list",
    params,
  });
}

export function delItem(ids) {
  return service({
    method: "post",
    url: API_PREFIX + "/customer/follow/delete",
    data: { ids },
  });
}

export function addItem(data) {
  return service({
    method: "post",
    url: API_PREFIX + "/customer/follow/add",
    data,
  });
}

export function editItem(data) {
  return service({
    method: "post",
    url: API_PREFIX + "/customer/follow/update",
    data,
  });
}
