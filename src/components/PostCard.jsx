import {React,useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Buffer} from 'buffer';
import moment from 'moment'

import CommentCard from './CommentCard'
import User from '../img/user.png'
import Dots from '../img/dots.png'
import Heart from '../img/heart.png'
import Heart1 from '../img/heart1.png'
import Chat from '../img/chat.png'
import Send from '../img/send.png'
import Refresh from '../img/refresh.png'

function PostCard(prop) {
    const [activeComment,setActiveComment] = useState();
   
    const [data,setData] = useState();
    const [comment,setComment] = useState();
    const [comments,setComments] = useState([]);
    const [likes,setLikes] = useState([]);
    const [isLiked,setIsLiked] = useState(false);
    const [deleted,setDeleted] = useState(false);
    const [active,setActive] = useState(false);
    const [imageSrc,setImageSrc] = useState("");
  const [loading,setLoading] = useState(true);
    function getUserImage(){
      axios({
        method : 'get',
        url : `https://fakebook-server-khaykhun.onrender.com/users/${prop.data.userID}/image`
      })
      .then((response) => {
        if(response.data.image){
            setImageSrc(response.data.image);
        }
      })
      .catch((error) => console.error(error));
    }

    function getPostData(){
      axios({
        method : 'post',
        url : 'https://fakebook-server-khaykhun.onrender.com/get-post-data',
        data : {
          postID : prop.data._id,
        },
        withCredentials : true
      })
      .then((response) => {
          setData(response.data);
          setComments(response.data.post.comments);
          setLikes(response.data.post.likes);
          setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    function getIsLiked(){
      axios({
        method : 'post',
        url : 'https://fakebook-server-khaykhun.onrender.com/is-liked',
        data : {
          postID : prop.data._id
        },
        withCredentials : true
      })
      .then((response) => {
        setIsLiked(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

    function postLike(){
      axios({
        method : 'post',
        url : 'https://fakebook-server-khaykhun.onrender.com/post-like',
        data : {
          postID : data.post._id,
        },
        withCredentials : true
      })
      .then((response) => {
        setLikes(response.data.likes)
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) window.alert("Login first to give like");
        else window.alert("Unknown error in like");
      });
  }

    function postComment(){
        axios({
          method : 'post',
          url : 'https://fakebook-server-khaykhun.onrender.com/post-comment',
          data : {
            postID : data.post._id,
            comment : comment,
          },
          withCredentials : true
        })
        .then((response) => {
          getPostData()
          setActiveComment(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) window.alert("Login first to comment");
          else window.alert("Unknown error in comment");
        });
    }
    function deletePost(){
      axios({
        method : 'delete',
        url : 'https://fakebook-server-khaykhun.onrender.com/delete-post',
        data : {
          postID : data.post._id,
          ownerID : data.owner._id
        },
        withCredentials : true
      })
      .then((response) => {
        window.alert("deleted post")
        setDeleted(true)
      })
      .catch((error) => {
        if (error.response.status === 401) window.alert("Login required");
        if (error.response.status === 403) window.alert("Only post owner can delete the post!");
        else window.alert("Error on deleting the post :(");
      });
    }
    useEffect(()=>{
        getPostData();
      getUserImage();
    },[])
    getIsLiked();
    //---------------------------return-------------------------------------
  return (
    loading ? 
    
    <div className='flex'>Loading post <div className='loading w-[20px] h-[20px] border-[4px] border-t-blue-400 border-r-blue-300 border-b-blue-200 border-l-transparent rounded-full'/></div> 
    
    : !deleted ? 

    <div className='flex flex-col middle-component'>
      {/* //------------post owner and date--------------- */}
        <div className="flex justify-between">
          <div className='flex gap-[10px]'>
            <img src={imageSrc ? imageSrc : User} className="medium-img profile"/>
            <p className='flex flex-col'>
              <a href={`/fakebook/user/${data?.owner.username}`} className='post-username-font hover:cursor-pointer'>{data?.owner.username}</a>
              <span className='post-date-font'>{moment(data?.owner.registerDate).format('DD MMM YYYY')}</span>
            </p>
            {data?.post.edited ? <p>edited</p> : null}
          </div>
          {/* //--------------------------Option things-------------------------------------- */}
          <div className='flex gap-[5px]'>
            {/* Refresh */}
            <img src={Refresh} onClick={(event)=>{
              getPostData();
              event.target.classList.add('refresh')
              setTimeout(()=>{
                event.target.classList.remove('refresh')
              },1300)
            }} className="tiny-img hover:cursor-pointer"/>
            {/* 3 dots and options */}
            {prop.owner ? <div className='relative-options'>
              <img src={Dots}
                onClick={(event)=>{
                  event.target.parentElement.lastElementChild.classList.toggle('hidden');
                }}
              />
              <ul className='hidden'>
                <li><Link to={`/fakebook/edit/${data?.post._id}`}>Edit</Link></li>
                <li
                  onClick={deletePost}
                >Delete</li>
              </ul>
            </div> : null}
          </div>
        </div>
      

        {/* //-------------Post title and content--------------------- */}
        <div className='my-[20px]'>
          <h1 className='font-semibold text-lg'>{data?.post.title}</h1>
          <span>{data?.post.content}</span>
        </div>

        {/* //------------------Like and comment------------------------- */}
        <div className='flex justify-between w-full'><span>{likes?.length} Likes</span><span>{comments?.length} Comments</span></div>

        <div className='flex border border-x-0 border-y-[#aaa] items-center h-[35px] my-[6px]'>
              {/* Like */}
          <div className='w-[38%] h-full likeNcomment'
              onClick={postLike}
            >
              <img src={isLiked ? Heart1 : Heart} className="w-[20px] h-[20px] mr-[5px]"/>
              <span>{isLiked ? "Unlike" : "Like"}</span> 
          </div>
            {/* //----------Middle--------- */}
            <div className='h-[90%] w-[1px] bg-[#aaa]'/>
            {/* //----------Middle--------- */}
            {/* Comment */}
          <div className='w-full h-full likeNcomment'
            onClick={() => {
              setActiveComment(!activeComment)
            }}
          >
            <img src={Chat} className="w-[20px] h-[20px] mr-[5px]"/>
            <span>Comment</span>         
          </div>

        </div>

        {/* //---------------------------Compose comment------------------------------------- */}
        {activeComment ? <div id="myInput" className='items-center justify-center h-[40px] my-[10px] flex'>
          <input type="text" onChange={(e)=>{setComment(e.target.value)}} placeholder="write comment"
            className='border border-[#1877F2] rounded-xl rounded-r-none w-[70%] h-full px-[10px]'
          />
          <button onClick={postComment}
            className="border border-[#1877F2] rounded-xl rounded-l-none h-full w-[50px] flex justify-center items-center"
          ><img src={Send} className="tiny-img"/></button>
        </div> : null}

        {/* //-------------------------Comments--------------------------------------- */}
        <ul className='flex flex-col gap-[14px]'>
        {
            active ? 
              comments.sort((a,b)=>{return b.commentedDate - a.commentedDate})
              .map(comment => {
                return <CommentCard comment={comment} key={comment._id}/>
              }) 
            : 
              comments.sort((a,b)=>{return b.commentedDate - a.commentedDate})
              .slice(0,2)
              .map(comment => {
                return <CommentCard comment={comment} key={comment._id}/>
              }) 
        }
        </ul>
        {comments.length >=3 ?<hr /> : null}
        {comments.length >= 3 ?  <button onClick={()=>{setActive(!active)}}> {active ? "See less comments" : "See all comments"}</button> : null}
    </div> : <div className='flex justify-center items-center bg-red-300 text-white p-[10px] rounded-xl shadow-md'>Post deleted</div>
  )
}

export default PostCard