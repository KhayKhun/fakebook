import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function Welcome() {
  const [toggle, setToggle] = useState(true);

  const handleRegisterClick = () => {
    setToggle(true);
  };

  const handleLoginClick = () => {
    setToggle(false);
  };

  return (
    <div className='bg-teal-100 w-screen h-screen flex flex-col justify-center items-center'>
        <h1 className="logo text-3xl mb-[30px]">fakebook</h1>
        <div className='bg-white p-[20px] rounded-lg shadow-md w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw]'>
            <div className='border-teal-500 border w-full'>
                <button onClick={handleRegisterClick} className={`w-[50%] p-[10px] ${toggle ? "bg-teal-500 text-white" : ""}`}>Register</button>
                <button onClick={handleLoginClick} className={`w-[50%] p-[10px] ${!toggle ? "bg-teal-500 text-white" : ""}`}>Sign in</button>
            </div>
            {toggle ? <Register /> : <Login />}
        </div>
    </div>
  );
}

export default Welcome;

