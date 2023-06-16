import Style from '@/style/Side.module.scss'
function Side(props) {
  return (
    <div className={`${props.className} ${Style.sidebar}`}>
      这里是side
    </div>
  )
}

export default Side