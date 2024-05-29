import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

export const delConfirm = (content = '是否确认删除？') => {
  return new Promise((resolve, reject) => {
    confirm({
      title: "删除",
      icon: <ExclamationCircleFilled />,
      content,
      onOk() {
        resolve();
      },
      onCancel() {
        reject();
      }
    })
  })
}