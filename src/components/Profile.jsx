import {React,useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import NoPostsYet from './NoPostsYet'
import moment from 'moment';
import UserImg from '../img/user.png';
import Edit from '../img/edit-text.png';
import Dots from '../img/dots.png';
import UploadImage from './UploadImage';

function Profile(prop) {
    const [data,setData] = useState();
    const [posts,setPosts] = useState([]);
    const [totalLikes,setTotalLikes] = useState(0);
    const navigate = useNavigate();
    const [togglePost,setTogglePost] = useState(true);
    const [authenticated,setAuthenticated] = useState(false);

    function getUser(){
      axios({
        method : 'get',
        url : 'http://localhost:3001/user',
        withCredentials : true
      })
      .then((response) => {
        setData(response.data.user);
        setPosts(response.data.posts)
        setAuthenticated(true);

        let likes = 0;
        response.data.posts.map(post => {
          likes += post.likes.length
          setTotalLikes(likes);
        })
      }).catch(err => {setAuthenticated(false)});
    };

    function Logout(){
      axios({
        method : 'post',
        url : 'http://localhost:3001/logout',
        withCredentials : true
      }).then(response => {
        window.alert("Logouted successfully")
        navigate("/fakebook/")
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
    }
  
    useEffect(()=>{
      getUser()
    },[]);
    return (
      <div className='w-full'>
        {
          authenticated ? (
            <div className='flex flex-col gap-[10px]'>
              {/* //------------------Username and top info------------------------------ */}
              <div className='middle-component w-full rounded-b-none'>
                {/* Part 1 */}
                <div className='flex justify-between gap-[10px]'>
                  <img src={prop?.img ? prop.img : UserImg} className='large-img profile' />
                  <div className='w-[90%]'>
                    <div className='flex justify-between w-full'>
                      <span className='font-semibold text-xl'>{data?.username}</span>
                        {/* //--------------------------Option things-------------------------------------- */}
                        <div className='relative-options'>
                          <img src={Dots}
                            onClick={(event)=>{
                              event.target.parentElement.lastElementChild.classList.toggle('hidden');
                            }}
                          />
                          <ul className='hidden'>
                            <li className=''
                              onClick={Logout}
                            >Log Out</li>
                          </ul>
                        </div>
                    </div>
                    <span className='text-gray-600 text-sm font-semibold'>Joined on ( {data?.registerDate ? moment(data.registerDate).format('DD MMM YYYY') : "20 Apr 2023"} )</span>
                  </div>
                </div>
                {/* Part 2 */}
                <hr className='my-[5px]'/>
                  <h1 className='font-semibold mb-[8px]'>Upload profile picture :</h1>
                  <UploadImage />
              </div>
              
              <a href='/fakebook/submit' className='middle-component rounded-none flex justify-between'>
                <span className='w-[70%] bg-gray-100 rounded-full flex justify-center items-center p-[4px]'>What's on your mind?</span>
                <button className='w-[27%] bg-[#1877F2] hover:bg-[#165ab3] text-white normal-button-ratio flex justify-center items-center text-sm md:text-lg'>
                    <img src={Edit} className="tiny-img"/>
                    Create A Post</button>
              </a>
              {/* Post filter */}
              <div className='middle-component rounded-t-none mb-[7px]'>
                <div className='flex justify-between'>
                  <h1>My Posts</h1>
                  <p>{posts.length} Posts , {totalLikes} Likes</p>
                </div>
                <hr className='bg-gray-500 h-[1.3px] mt-[10px]'/>
                <div className='flex justify-center h-[30px]'>
                  <button className={`w-1/2 h-full border-x-0 ${togglePost ? "border-b border-r border-r-[#1877f2] border-b-[#1877f2] shadow-md rounded-bl-lg bg-blue-50" : null}`}
                    onClick={()=>{setTogglePost(true)}}
                  >By Time</button>
                  <button className={`w-1/2 h-full border-x-0 ${togglePost  ? null : "border-b border-l border-l-[#1877f2] border-b-[#1877f2] shadow-md rounded-br-lg bg-blue-50"}`}
                    onClick={()=>{setTogglePost(false)}}
                  >Most Liked</button>
                </div>
              </div>
              <ul className='flex flex-col gap-[10px]'>
              {
                togglePost ? 
                posts.sort((a,b)=> {
                  return (b.date - a.date)
                }).map(p=> <PostCard owner={true} data={p} key={p._id}/>)
                :
                posts.sort((a,b)=> {
                  return (b.likes.length - a.likes.length)
                }).map(p=> <PostCard owner={true} data={p} key={p._id}/>)
              }
              {
                posts.length === 0 ? <NoPostsYet/> : null
              }
              </ul>
            </div>

          
          ) : <></>
        }
      </div>
    )
}

export default Profile