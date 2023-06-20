import { Outlet } from "react-router"
import Open from './Open'
import Style from '@/style/Others.module.scss'
// function Others() {
//   return (
//     <div>
      
//       <Outlet></Outlet>
//     </div>
//   )
// }
export function Component() {
  return (
    <div className={Style.others}>
      <Open className='open'></Open>
      <div className="outlet">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
// export default Others;