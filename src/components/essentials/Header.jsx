import {React,useState,useEffect} from 'react'
import Search from '../../img/search.png'
import User from "../../img/user.png"
import DownArrow from "../../img/down-arrow.png"
import MenuSlide from './MenuSlide'
import SideBar from './SideBar'

function Header(prop) {
  const [activeMenu,setActiveMenu] = useState(false);
  function toggleMenu(){
    setActiveMenu(!activeMenu);
  }
  return (
    <nav className='w-full fixed top-0 left-0 z-50'>
      <main className='w-full h-[10vh] bg-white shadow-sm flex justify-between items-center px-[20px]'>
      <h1 className="logo">fakebook</h1>
      <div className='flex items-center bg-gray-100 h-[80%] gap-[5px] px-[20px] sm:w-[400px] rounded-full'>
        <img src={Search} className="w-[15px] h-[15px]"/>
        <input type="text" placeholder='Search fakebook' className='bg-transparent hidden sm:flex'/>
      </div>
      <div className='relative hidden sm:flex rounded-full p-[3px] hover:cursor-pointer'
        onClick={toggleMenu}
      >
        <img src={prop?.img ? prop.img : User} className="small-img rounded-full"/>
        <img src={DownArrow} className="absolute right-0 bottom-[1px] w-[20px] h-[20px] p-[5px] bg-gray-200 rounded-full"/>
      </div>
      <div className={`${activeMenu ? "w-[25vw]" : "w-0"} fixed right-0 top-[11vh] z-30`}>
        <MenuSlide img={prop?.img ? prop.img : User} username={prop.username}/>
      </div>
    </main>
      <div className='side-bar-small'>
        <SideBar img={prop.img} username={prop.username}/>
      </div>
    </nav>
  )
}

export default Header