import React from 'react'
import axios from 'axios';

function MenuSlide(prop) {
    function Logout(){
        axios({
          method : 'post',
          url : 'https://fakebook-server-khaykhun.onrender.com/logout',
          withCredentials : true
        }).then(response => {
          window.alert("Logouted successfully")
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          window.location.reload();
        });
      }
  return (
    <div className='bg-white rounded-l-lg w-full p-[20px] flex flex-col gap-[20px]'>
        <a href='/profile' className='flex gap-[10px] items-center'>
            <img src={prop?.img ? prop.img : User} className="small-img rounded-full"/>
            <p className='font-semibold'>{prop.username}</p>
        </a>
        <button className='normal-button-ratio border border-[#1877f2] text-[#1877f2] hover:bg-[#1877f2] hover:text-white' 
        onClick={Logout}>Log Out</button>
    </div>
  )
}

export default MenuSlide