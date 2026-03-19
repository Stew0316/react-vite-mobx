import service from "..";

export function getPage(params) {
  return service({
    method: "get",
    url: "/dict/type/list",
    params,
  });
}

export function delItem(ids) {
  return service({
    method: "post",
    url: "/dict/type/delete",
    data: {
      ids,
    },
  });
}

export function addItem(data) {
  return service({
    method: "post",
    url: "/dict/type/add",
    data: { ...data, tenantId: 6 },
  });
}

export function editItem(data) {
  return service({
    method: "post",
    url: "/dict/type/update",
    data: { ...data, tenantId: 6 },
  });
}

export function itemPage(params) {
  return service({
    method: "get",
    url: "/dict/item/list",
    params,
  });
}

export function itemDel(ids) {
  return service({
    method: "post",
    url: "/dict/item/delete",
    data: {
      ids,
    },
  });
}

export function itemAdd(data) {
  return service({
    method: "post",
    url: "/dict/item/add",
    data,
  });
}

export function itemEdit(data) {
  return service({
    method: "post",
    url: "/dict/item/update",
    data,
  });
}

export function getDictAll() {
  return service({
    method: "post",
    url: "/dict/type/all",
    data: { tenantId: 6 },
  });
}
