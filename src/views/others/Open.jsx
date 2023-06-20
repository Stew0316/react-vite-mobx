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
          <div>Clock</div>
        </div>
        <div className="disc l2" onClick={() => navi('/others/tree')}>
          <div>Tree</div>
        </div>
        <div className="disc l3">
          <div>Profile</div>
        </div>
        <div className="disc l4">
          <div>Likes</div>
        </div>
        <div className="disc l5 toggle" ref={togRef} onClick={menuClick}>
          Menu
        </div>
      </nav>
    </div>
  )
}

export default Open