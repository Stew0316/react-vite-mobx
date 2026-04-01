import service from "..";

const API_PREFIX = "/manage/user";

export function getPage(params) {
  return service({
    method: "get",
    url: API_PREFIX + "/list",
    params,
  });
}

export function delItem(ids) {
  return service({
    method: "post",
    url: API_PREFIX + "/delete",
    data: {
      ids,
    },
  });
}

export function addItem(data) {
  return service({
    method: "post",
    url: API_PREFIX + "/add",
    data,
  });
}

export function editItem(data) {
  return service({
    method: "post",
    url: API_PREFIX + "/update",
    data,
  });
}
