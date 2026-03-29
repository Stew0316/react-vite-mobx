import service from "..";

const API_PREFIX = "/manage/dept";

export function getTree(params) {
  return service({
    method: "get",
    url: API_PREFIX + "/tree",
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
