import {React,useState} from 'react'
import axios from 'axios'

function Register() {
    const [registerN,setRegisterN] = useState("");
    const [registerP,setRegisterP] = useState("");

    function registerUser(){
        axios({
          method : 'post',
          url : 'http://localhost:3001/register',
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
      };
  return (
    <div className='welcome-form'>
      <h1>Create a new user</h1>
      <input name='username' placeholder='username' onChange={(e)=>{setRegisterN(e.target.value)}}/>
      <input name='password' placeholder='password' onChange={(e)=>{setRegisterP(e.target.value)}}/>
      <button onClick={registerUser}>Create user</button>
    </div>
  )
}

export default Register