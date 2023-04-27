import {React,useState} from 'react'
import axios from 'axios'
function Login() {
    const [loginN,setLoginN] = useState("")
    const [loginP,setLoginP] = useState("")

    function loginUser(){
      axios({
        method : 'post',
        url : 'http://localhost:3001/login',
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
        console.log(error);
        if(error.response.status === 401) window.alert("Login failed.Please check your username and password again.")
        else setError('Unknow Error');
      });
    };
  return (
    <div className='welcome-form'>
      <h1>Log in user</h1>
      <input name='username' placeholder='username' onChange={(e)=>{setLoginN(e.target.value)}}/>
      <input name='password' placeholder='password' onChange={(e)=>{setLoginP(e.target.value)}}/>
      <button onClick={loginUser}>Log in</button>
    </div>
  )
}

export default Login