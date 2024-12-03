import { Form, Button, Table, Pagination } from "antd"
import { useRef, useEffect, useState } from "react"
const Wrap = ({children, getData,columns,tableData = [], Btn, rowKey='id', ...props}) => {
  const formRef = useRef()
  const onFinish = (values) => {
    getData(values)
  }
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
      {Btn}
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered={true}
          rowKey={rowKey}
          {...props}
          className=""
        />
      </div>
    </div>
  )
}


export default Wrap