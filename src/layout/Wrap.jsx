import { Form, Button, Table, Pagination } from "antd"
import { useRef, useEffect, useState } from "react"
const Wrap = ({children, getData,columns,tableData = [], Btn, ...props}) => {
  const formRef = useRef()
  const [formVal, setFormVal] = useState({})
  const onFinish = (values) => {
    setFormVal(values)
    getData(values)
  }
  // const data = [];
  const reset = () => {
    formRef.current.resetFields()
    getData()
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
      {typeof Btn === "function" ? Btn({ customParam: 'test', formVal: formVal }) : Btn}
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered={true}
          {...props}
          className=""
        />
      </div>
    </div>
  )
}


export default Wrap