import {React,useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate,useParams,Link } from 'react-router-dom';
import PostCard from './PostCard';
import NoPostsYet from './NoPostsYet';
import moment from 'moment';
import UserImg from '../img/user.png';
import Dots from '../img/dots.png';
import ErrorPage from './essentials/ErrorPage';
import LoadingComponent from './essentials/Loading';

function User() {
  const [imageSrc,setImageSrc] = useState("");
    const { username } = useParams();
    const [data,setData] = useState();
    const [posts,setPosts] = useState([]);
    const [totalLikes,setTotalLikes] = useState(0);
    const navigate = useNavigate();
    const [togglePost,setTogglePost] = useState(true);
    const [authenticated,setAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(true);

    function getUserImage(){
      axios({
        method : 'get',
        url : `https://fakebook-server-khaykhun.onrender.com/${data._id}/image`
      })
      .then((response) => {
        if(response.data.image) setImageSrc(response.data.image);
        setLoading(false);
      })
      .catch((error) => {
        if(error.response.status === 404) return
        else console.log(error)
      });
    }

    function getUser(){
      axios({
        method : 'post',
        url : 'https://fakebook-server-khaykhun.onrender.com/get-profile-or-user',
        data : {
          username : username
        },
        withCredentials : true
      })
      .then((response) => {
        if(response.data === "owner"){
          navigate("/profile")
        }else{
          setData(response.data.user);
          setPosts(response.data.posts)
          setAuthenticated(true);
  
          let likes = 0;
          response.data.posts.map(post => {
            likes += post.likes.length
            setTotalLikes(likes);
          })
        }
      }).catch(err => {
        if(error.response.status === 404) return
        else console.log(error)
        setLoading(false);
        setError(true);
      });
    };
    useEffect(()=>{
        getUser()
    },[]);
    useEffect(()=>{
      if(data){
        getUserImage()
      }
    },[data]);
  
    return (
      <div className='w-full'>
        {
          authenticated ? (
            <div className='flex flex-col gap-[10px]'>
              {/* //------------------Username and top info------------------------------ */}
              <div className='middle-component w-full rounded-b-none'>
                {/* Part 1 */}
                <div className='flex justify-between gap-[10px]'>
                <Link to={imageSrc}><img src={imageSrc ? imageSrc: UserImg} className='large-img profile' /></Link>
                  <div className='w-full'>
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
                            <li
                              onClick={()=>{}}
                            >Block User</li>
                          </ul>
                        </div>
                    </div>
                    <span className='text-gray-600 text-sm font-semibold'>Joined on ( {data?.registerDate ? moment(data.registerDate).format('DD MMM YYYY') : "20 Apr 2023"} )</span>
                  </div>
                </div>
              </div>
              {/* Post filter */}
              <div className='middle-component rounded-t-none mb-[7px]'>
                <div className='flex justify-between'>
                  <h1>{data?.username}'s Posts</h1>
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
                }).map(p=> <PostCard data={p} key={p._id}/>)
                :
                posts.sort((a,b)=> {
                  return (b.likes.length - a.likes.length)
                }).map(p=> <PostCard data={p} key={p._id}/>)
              }
              {
                posts.length === 0 ? <NoPostsYet/> : null
              }
              </ul>
            </div>

          
          ) : loading? <LoadingComponent/> : <ErrorPage/>
        }
      </div>
    )
}

export default User