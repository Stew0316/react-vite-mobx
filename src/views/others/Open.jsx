import { useEffect, useRef } from "react"
function Open(props) {
  const togRef = useRef()
  useEffect(() => {
    
  })
  return (
    <div className={`${props.className}`}>
      <nav className="top-right">
        <a className="disc l1">
          <div>Messages</div>
        </a>
        <a className="disc l2">
          <div>Photos</div>
        </a>
        <a className="disc l3">
          <div>Profile</div>
        </a>
        <a className="disc l4">
          <div>Likes</div>
        </a>
        <a className="disc l5 toggle" ref={togRef}>
          Menu
        </a>
      </nav>
    </div>
  )
}

export default Open