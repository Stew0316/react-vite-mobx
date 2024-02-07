import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
function Open(props) {
  const togRef = useRef()
  const navi = useNavigate()
  const [opend, setOpend] = useState(false)
  function menuClick() {
    setOpend(!opend)
  }
  useEffect(() => {

  })
  return (
    <div className={`${props.className}`}>
      <nav className={`top-right ${opend ? 'open' : ''}`}>
        <div className="disc l1" onClick={() => navi('/others')}>
          <div>时钟</div>
        </div>
        <div className="disc l2" onClick={() => navi('/others/tree')}>
          <div>树</div>
        </div>
        <div className="disc l3">
          <div>Profile</div>
        </div>
        <div className="disc l4" onClick={() => navi('/home')}>
          <div>返回</div>
        </div>
        <div className="disc l5 toggle" ref={togRef} onClick={menuClick}>菜单</div>
      </nav>
    </div>
  )
}

export default Open