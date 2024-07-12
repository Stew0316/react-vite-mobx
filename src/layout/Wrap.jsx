import { Form, Button, Table } from "antd"
import { useRef } from "react"
const Wrap = ({children, getData,columns,tableData = [], Btn, ...props}) => {
  const formRef = useRef()
  const onFinish = (values) => {
    getData(values)
  }
  // const data = [];
  const reset = () => {
    formRef.current.resetFields()
  }
  return (
    <div className={`container ${props.className}`}>
      <Form
        layout='inline'
        className='base-form'
        onFinish={onFinish}
        ref={formRef}
      >
        {children}
        <Form.Item >
          <Button className='reset' onClick={reset}>重置</Button>
          <Button htmlType="submit" type="primary" className='submit'>查询</Button>
        </Form.Item>
      </Form>
      {Btn}
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
          {...props}
          className=""
        />
      </div>
    </div>
  )
}


export default Wrap