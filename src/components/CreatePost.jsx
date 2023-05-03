import { React,useState,useEffect } from 'react';
import User from '../img/user.png';
import {Link} from 'react-router-dom'
function CreatePost(prop) {
  return (
    <Link to="/submit" className='middle-component flex flex-col gap-[10px]'>
        <div className='flex gap-[10px]'>
            <img src={prop.img ? prop.img : User} className="medium-img profile" />
            <div className='bg-gray-100 text-gray-600 p-[10px] rounded-full w-full'>
                What's on your mind, {prop?.username}?</div>
        </div>
        <hr />
        <button className='bg-[#1877F2] text-white rounded-lg p-[10px] font-semibold'>Create a post</button>
    </Link>
  )
}

export default CreatePost
