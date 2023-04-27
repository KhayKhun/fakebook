import {React,useState,useEffect} from 'react'
import User from '../img/user.png'
import axios from 'axios';
import {Buffer} from 'buffer';
function RightBarPeopleCard(prop) {
    const [imageSrc,setImageSrc] = useState();
    const user = prop.user
    
    function getUserImage(){
        axios({
          method : 'get',
          url : `http://localhost:3001/users/${user._id}/image`
        })
        .then((response) => {
            if(response.data.image){
                const base64Image = Buffer.from(response.data.image, "binary").toString("base64");    
                const dataUrl = `data:${response.data.contentType};base64,${base64Image}`;
                setImageSrc(dataUrl);
            }
        })
        .catch((error) => console.error(error));
      }
      useEffect(()=>{
        getUserImage();
      },[])
    return (
    <a href={`/fakebook/user/${user.username}`} className="sidebar-card p-[10px] items-center font-semibold z-0">
        <div className='border-[3px] border-[#3287f7] rounded-full p-[3px] relative'>
            <img src={imageSrc ? imageSrc : User} className="small-img profile border-none p-0" />
            <div className='w-[15px] h-[15px] bg-green-400 rounded-full absolute bottom-[-3px] right-[-3px] border-[3px] border-gray-100'/>
        </div>
        <p>{user.username}</p>
    </a>
  )
}

export default RightBarPeopleCard
