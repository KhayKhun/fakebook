import {React,useState,useEffect} from 'react'
import moment from 'moment';
import Dots from '../img/dots.png';
import axios from 'axios';
import User from '../img/user.png';
import { Buffer } from "buffer";
import {useNavigate} from 'react-router-dom'
function CommentCard(prop) {
  const navigate = useNavigate();

  const [exist,setExist] = useState(true)
  const [user,setUser] = useState();
  const [imageSrc,setImageSrc] = useState("");
  const comment = prop.comment

  function getUserImage(){
    axios({
      method : 'get',
      url : `http://localhost:3001/users/${comment.commenterID}/image`
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

    function getCommenter(){
      axios({
        method : 'post',
        url : 'http://localhost:3001/get-user-by-id',
        data : {
          userID : comment?.commenterID
        }
      })
      .then(response => {
        setUser(response.data)
      })
      .catch(err => {
        console.log(err)
      });
    }

    function deleteComment(){
      axios({
        method : 'delete',
        url : 'http://localhost:3001/delete-comment',
        data : {
          commentID : comment._id
        },
        withCredentials : true,
      })
      .then(response => {
        console.log(response.data)
        setExist(false)
      })
      .catch(err => {
        console.log(err)
        if(err.response.status === 403) window.alert("Only comment owner can delete comment");
        else if (err.response.status === 401) {
          window.alert("session expired.Login again");
          navigate("/")
        }
        else window.alert("unknown error")
      });
    }
    useEffect(()=>{
      getCommenter();
    },[])
    useEffect(()=>{
      getUserImage();
    },[])

  return <> 
  {exist ? <li key={comment._id} className="flex gap-[5px]">
      <img src={imageSrc ? imageSrc : User} className="small-img profile"/>
      <div className="">  
        <div className='bg-gray-100 flex flex-col gap-[3px] rounded-lg p-[10px]'>
          <p className='text-black text-md font-semibold'>{
            user?.username ? user.username : "Loading"
            }</p>
          <hr className='bg-gray-300 w-[80%]'/>
          <p className='text-gray-700'>{comment.comment}</p>
        </div>
        <span className='text-sm text-gray-500'>{moment(comment?.commentedDate).format('DD MMM YYYY')}</span>
      </div>
      
      <div className='relative-options mt-[10px]'>
              <img src={Dots}
                onClick={(event)=>{
                  event.target.parentElement.lastElementChild.classList.toggle('hidden');
                }}
              />
              <ul className='hidden'>
                <li className=''
                  onClick={deleteComment}
                >Delete</li>
              </ul>
            </div>
    </li> : null}
    </>
}

export default CommentCard