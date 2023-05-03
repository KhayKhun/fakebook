import {React,useState,useEffect} from 'react'
import User from '../img/user.png'
import axios from 'axios';

function RightBarPeopleCard(prop) {
    const [imageSrc,setImageSrc] = useState();
    const user = prop.user
    
    function getUserImage(){
        axios({
          method : 'get',
          url : `https://fakebook-server-khaykhun.onrender.com/users/${user._id}/image`
        })
        .then((response) => {
            if(response.data.image){
                setImageSrc(response.data.image);
            }
        })
        .catch((error) => {
          if(error.response.status == 404) return;
          else console.log(error)
        });
      }
      useEffect(()=>{
        getUserImage();
      },[])
    return (
    <a href={`/user/${user.username}`} className="sidebar-card p-[10px] items-center font-semibold z-0">
        <div className='border-[3px] border-[#3287f7] rounded-full p-[3px] relative'>
            <img src={imageSrc ? imageSrc : User} className="small-img profile border-none p-0" />
            <div className='w-[15px] h-[15px] bg-green-400 rounded-full absolute bottom-[-3px] right-[-3px] border-[3px] border-gray-100'/>
        </div>
        <p>{user.username}</p>
    </a>
  )
}

export default RightBarPeopleCard
