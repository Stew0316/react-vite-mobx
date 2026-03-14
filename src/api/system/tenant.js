import service from "..";

export function getPage(params) {
  return service({
    method: "get",
    url: "/tenant/list",
    params,
  });
}

export function delItem(ids) {
  return service({
    method: "post",
    url: "/tenant/delete",
    data: {
      ids,
    },
  });
}

export function addItem(data) {
  return service({
    method: "post",
    url: "/tenant/add",
    data,
  });
}

export function editItem(data) {
  return service({
    method: "post",
    url: "/tenant/update",
    data,
  });
}
