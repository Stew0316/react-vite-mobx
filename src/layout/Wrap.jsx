import { Form, Button, Table } from "antd"
import { useRef } from "react"

// defaultParams：固定参数，每次查询（含重置）都会带上，不会被表单覆盖
const Wrap = ({ children, getData, columns, tableData = [], Btn, rowKey = 'id', defaultParams = {}, ...props }) => {
  const formRef = useRef()

  const onFinish = (values) => {
    getData({ ...defaultParams, ...values })
  }

  const reset = () => {
    formRef.current.resetFields()
    getData({ ...defaultParams })
  }

  return (
    <div className={`container ${props.className ?? ''}`}>
      <Form
        layout='inline'
        className='base-form'
        onFinish={onFinish}
        ref={formRef}
      >
        {children}
        <Form.Item>
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