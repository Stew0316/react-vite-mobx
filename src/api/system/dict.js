import service from "..";

const API_PREFIX = "/manage";

export function getPage(params) {
  return service({
    method: "get",
    url: API_PREFIX + "/dict/type/list",
    params,
  });
}

export function delItem(ids) {
  return service({
    method: "post",
    url: API_PREFIX + "/dict/type/delete",
    data: {
      ids,
    },
  });
}

export function addItem(data) {
  return service({
    method: "post",
    url: API_PREFIX + "/dict/type/add",
    data,
  });
}

export function editItem(data) {
  return service({
    method: "post",
    url: API_PREFIX + "/dict/type/update",
    data,
  });
}

export function itemPage(params) {
  return service({
    method: "get",
    url: API_PREFIX + "/dict/item/list",
    params,
  });
}

export function itemDel(ids) {
  return service({
    method: "post",
    url: API_PREFIX + "/dict/item/delete",
    data: {
      ids,
    },
  });
}

export function itemAdd(data) {
  return service({
    method: "post",
    url: API_PREFIX + "/dict/item/add",
    data,
  });
}

export function itemEdit(data) {
  return service({
    method: "post",
    url: API_PREFIX + "/dict/item/update",
    data,
  });
}

export function getDictAll() {
  return service({
    method: "post",
    url: API_PREFIX + "/dict/type/all",
  });
}
