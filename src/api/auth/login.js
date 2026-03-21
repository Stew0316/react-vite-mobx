import service from "..";

export function authCode() {
  return service({
    method: "get",
    url: "/auth/captcha",
    noMessage: true,
  });
}

export function submit(data) {
  return service({
    method: "post",
    url: "/auth/login",
    data,
  });
}
