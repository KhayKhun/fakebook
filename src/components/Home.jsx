import {React,useState,useEffect} from 'react'
import axios from 'axios'
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import LoadingComponent from './essentials/Loading';
function Home(prop) {
    const [posts,setPosts] = useState([]);

    function fetchPosts(){
        axios({
          method : 'get',
          url : 'http://localhost:3001/posts-for-home',
          withCredentials : true
        })
        .then((response) => {
            setPosts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      };
      useEffect(()=>{
        fetchPosts();
      },[])

  return (
    <div className='w-full flex flex-col gap-[20px]'>
      <CreatePost img={prop.img} username={prop.username}/>
        {
            posts ? posts.sort((a,b)=> {
              return (b.date - a.date)
            }).map(p=> <PostCard data={p} key={p._id}/>) : <LoadingComponent/>
        }
    </div>
  )
}

export default Home