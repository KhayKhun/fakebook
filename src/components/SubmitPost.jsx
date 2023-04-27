import {React,useState,useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
function SubmitPost() {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();

    function submit(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/submit',
            withCredentials : true,
            data : {
              title : title,
              content : content
            }
          })
          .then((response) => {
            window.alert("Posted successfully")
            navigate('/profile');
          })
          .catch((error) => {
            console.log(error);
            navigate("/profile");
        });
    }

  return (
        <div className='edit-post middle-component'>
          <h2>SubmitPost</h2>
          <input name="title" placeholder="title" onChange={(e)=> {setTitle(e.target.value)}}/>
          <textarea name="content" placeholder="content" onChange={(e)=> {setContent(e.target.value)}}/>
          <button onClick={submit} className="normal-button-ratio bg-[#1877f2] text-white">Submit</button>
        </div>
  )
}

export default SubmitPost