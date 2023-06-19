import Style from '@/style/Header.module.scss'
const name = import.meta.env.VITE_NAME
function Header(props) {
  
  return (
    <div className={`${Style.header} ${props.className}`}>
      <div className='left'>
        <img src="/fac.jpg" alt="" />
        <span>{name}</span>
      </div>
      <div className='right'>
        dvad
      </div>
    </div>
  )
}

export default Header