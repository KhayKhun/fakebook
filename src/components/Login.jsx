import {React,useState} from 'react'
import axios from 'axios'
function Login() {
    const [loginN,setLoginN] = useState("")
    const [loginP,setLoginP] = useState("")

    function loginUser(){
        axios({
          method : 'post',
          url : 'https://fakebook-server-khaykhun.onrender.com/login',
          data : {
            username : loginN,
            password : loginP
          },
          withCredentials : true
        })
        .then((response) => {
          if(response.status === 200) window.location.reload();
        })
        .catch((error) => {
          if(error?.response?.status === 401) window.alert("Login failed.Please check your username and password again.")
          else window.alert('Unknow Error');
        });
    };
  return (
    <form className='welcome-form'>
      <h1>Log in user</h1>
      <input name='username' autoComplete='username' placeholder='username' onChange={(e)=>{setLoginN(e.target.value)}}/>
      <input name='password' autoComplete='current-password' type="password" placeholder='password' onChange={(e)=>{setLoginP(e.target.value)}}/>
      <button onClick={loginUser}>Log in</button>
    </form>
  )
}

export default Login