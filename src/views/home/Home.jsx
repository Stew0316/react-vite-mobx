import { useState } from 'react'
import HeaderBar from '@/layout/Header'
import Side from '@/layout/Side'
import Style from '@/style/Home.module.scss'
import { Outlet } from 'react-router'
function Home() {
  return (
    <div className={`${Style.Home}`}>
      <HeaderBar className='header'></HeaderBar>
      <div className='wrap'>
        <Side className='side'></Side>
        <div className='route'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}
export default Home