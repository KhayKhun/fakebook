import {React,useState} from 'react'

import User from '../../img/user.png';
import Home from '../../img/home.png';
import Friends from '../../img/friends.png';
import DownArrow from '../../img/down-arrow.png';
import MenuSlide from './MenuSlide';

function SideBar(prop) {
    const [activeMenu,setActiveMenu] = useState(false);

    function toggleMenu(){
      setActiveMenu(!activeMenu);
    }
  return (
    <div className='w-full h-full'>
        <ul className='flex gap-[8px] p-[10px] flex-row sm:flex-col justify-between sm:justify-start'>
            <div className='flex h-[40px]'>
                <a href="/" className="sidebar-card">
                    <img src={Home} className="tiny-img"/>
                    <p className='hidden lg:flex'>Home</p>
                </a>
            </div>
            <div className='flex h-[40px] lg:hidden'>
                <a href='/friends' className="sidebar-card">
                    <img src={Friends} className="tiny-img p-0"/>
                    <p className='hidden lg:flex'>Find Users</p>
                </a>
            </div>
            <div className='hidden sm:flex h-[40px]'>
                <a href="/profile" className="sidebar-card">
                    <img src={prop.img ? prop.img : User} className="tiny-img rounded-full p-0"/>
                    <p className='hidden lg:flex'>{prop.username} <span className='text-gray-600'>(My Profile)</span></p>
                </a>
            </div>
            {/* Menuslide for mobile size */}
            <div className='relative sm:hidden rounded-full p-[3px] hover:cursor-pointer'
                onClick={toggleMenu}
            >
                <img src={prop?.img ? prop.img : User} className="tiny-img sm:small-img rounded-full"/>
                <img src={DownArrow} className="absolute right-0 bottom-[1px] w-[20px] h-[20px] p-[5px] bg-gray-200 rounded-full"/>
            </div>
            <div className={`${activeMenu ? "w-screen sm:w-[25vw] " : "w-0"} fixed right-0 top-[20.2vh] sm:top-[11vh] z-30 shadow-md`}>
                <MenuSlide img={prop?.img ? prop.img : User} username={prop.username}/>
            </div>
        </ul>
    </div>
  )
}

export default SideBar