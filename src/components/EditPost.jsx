import {React,useState,useEffect} from 'react'
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom'
import ErrorPage from './essentials/ErrorPage';

function SubmitPost() {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [owner,setOwner] = useState(false);
    const { postID } = useParams();
    const navigate = useNavigate();

    function getUser(){
        axios({
          method : 'post',
          url : 'https://fakebook-server-khaykhun.onrender.com/is-owner',
          withCredentials : true,
          data : {
              postID : postID
          }
        })
        .then((response) => {
            setOwner(true);
            getPostData();
        }).catch(err => {
            console.log(err);
            setOwner(false);
            if(err.response.status === 403) window.alert("Only post owner can edit the post.");
            else if(err.response.status === 404) window.alert("Post not found.");
            else window.alert("Unknown error");
            navigate("/");
        })
    }

    function getPostData(){
      axios({
        method : 'post',
        url : 'https://fakebook-server-khaykhun.onrender.com/get-post-data',
        withCredentials : true,
        data : {
            postID : postID
        }
      })
      .then((response) => {
        setTitle(response.data.post.title);
        setContent(response.data.post.content);
      }).catch(err => {
        console.log(err);
        if(err.response.status === 403) window.alert("Only post owner can edit the post.");
        else if(err.response.status === 404) window.alert("Post not found.");
        else window.alert("Unknown error");
        navigate("/");
      })
    };
    useEffect(()=>{
        getUser();
    },[])
    
    function submit(){
        axios({
            method : 'patch',
            url : 'https://fakebook-server-khaykhun.onrender.com/submit-edited-post',
            withCredentials : true,
            data : {
                postID : postID,
                title : title,
                content : content
            }
          })
          .then((response) => {
            navigate("/fakebook/profile")
          })
          .catch((error) => {
            console.log(error);
        });
    }

  return <div className=''>
        {owner ? <div className='edit-post middle-component'>
            <h2>EditPost</h2>
            <input className="" 
            placeholder="title" 
                onChange={(e)=> {setTitle(e.target.value)}} 
                value={title}
            />
            <textarea className="" 
            placeholder="content" 
                onChange={(e)=> {setContent(e.target.value)}} 
                value={content}
            />
          <button onClick={submit} className="normal-button-ratio bg-[#1877F2] text-white">Done</button>
        </div> : <ErrorPage/>}
  </div>
}

export default SubmitPost