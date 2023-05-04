import {React,useState} from 'react'
import axios from 'axios'

function Register() {
    const [registerN,setRegisterN] = useState("");
    const [registerP,setRegisterP] = useState("");

    function registerUser(){
      
      if(registerN.length <= 4 || registerN.length > 20) window.alert("Username must be 5 to 20 characters")
      else if(registerP.length <= 4 || registerP.length > 20) window.alert("Password must be 5 to 20 characters")
      else{
        axios({
          method : 'post',
          url : 'https://fakebook-server-khaykhun.onrender.com/register',
          data : {
            username : registerN,
            password : registerP
          },
          withCredentials : true
        })
        .then((response) => {
          if(response.status === 200) window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          if(error.response.status === 409) window.alert("Username already taken");
          else window.alert('Unknown Error');
        });
      }
      };
  return (
    <form className='welcome-form'>
      <h1>Create a new user</h1>
      <input name='username' placeholder='username' onChange={(e)=>{setRegisterN(e.target.value)}}/>
      <input name='password' autoComplete='current-password' type="password" placeholder='password' onChange={(e)=>{setRegisterP(e.target.value)}}/>
      <button onClick={registerUser}>Create user</button>
    </form>
  )
}

export default Register