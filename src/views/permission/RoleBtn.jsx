import { Button, message } from 'antd';
import { delConfirm } from "@/utils/feedBack";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
const RoleBtn = ({selectData}) => {
  const allDel = () => {
    if(selectData.length == 0) return message.open({
      type: 'error',
      content: '请先选择一个角色'
    })
    delConfirm().then(() => {
      console.log('ok')
    }).catch(() => {
      console.log('cancel')
    })
  }
  return (
    <>
      <div style={{marginBottom: '12px'}}>
        <Button icon={<PlusOutlined />} style={{marginRight: '8px'}} type="primary">新增</Button>
        <Button icon={<DeleteOutlined />} onClick={allDel} type="primary" danger>删除</Button>
      </div>
    </>
  )
}

export default RoleBtn;