import Style from '@/style/Header.module.scss'

function Header(props) {
  
  return (
    <div className={`${Style.header} ${props.className}`}>
      这里是header
    </div>
  )
}

export default Header