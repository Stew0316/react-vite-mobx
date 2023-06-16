import { useState } from 'react'
import Header from '@/layout/header'
import Side from '@/layout/Side'
import Style from '@/style/Home.module.scss'
import { Outlet } from 'react-router'
function Home() {
  return (
    <div className={`${Style.Home}`}>
      <Header className='header'></Header>
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