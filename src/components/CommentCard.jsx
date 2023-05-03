import {React,useState,useEffect} from 'react'
import moment from 'moment';
import Dots from '../img/dots.png';
import axios from 'axios';
import User from '../img/user.png';
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
      url : `https://fakebook-server-khaykhun.onrender.com/users/${comment.commenterID}/image`
    })
    .then((response) => {
      if(response.data.image){
          setImageSrc(response.data.image);
      }
    })
    .catch((error) => {if(error.response.status === 404) return
    else console.log(error)
    });
  }

    function getCommenter(){
      axios({
        method : 'post',
        url : 'https://fakebook-server-khaykhun.onrender.com/get-user-by-id',
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
        url : 'https://fakebook-server-khaykhun.onrender.com/delete-comment',
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
          navigate("/fakebook/")
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