import {React,useState,useEffect} from 'react'
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import axios from 'axios'

//----------------------Import Components------------------------------------------
import Header from './components/essentials/Header'
import SideBar from './components/essentials/SideBar'
import RightBar from './components/essentials/RightBar'
import ErrorPage from './components/essentials/ErrorPage'
import LoadingComponent from './components/essentials/Loading'
import Home from './components/Home'
import Welcome from './components/Welcome';
import User from './components/User'
import Profile from './components/Profile'
import SubmitPost from './components/SubmitPost'
import EditPost from './components/EditPost'

function App() {

  const [authed,setAuthed] = useState(false);
  const [Loading,setLoading] = useState(true);

  const [user,setUser] = useState();
  const [imageSrc,setImageSrc] = useState("");

  const authedRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home img={imageSrc} username={user?.username}/>,
    },
    {
      path: "/profile",
      element: <Profile img={imageSrc}/>,
    },
    {
      path: "/friends",
      element: <RightBar/>,
    },
    {
      path: "/user/:username",
      element: <User/>,
    },
    {
      path: "/submit",
      element: <SubmitPost/>,
    },
    {
      path: "/edit/:postID",
      element: <EditPost/>,
    },
    {
      path: "*",
      element: <ErrorPage/>,
    }
  ]);
  
const notAuthedRouter = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

    function fetchUser(){
      setLoading(true);
        axios({
        method : 'get',
        url : 'https://fakebook-server-khaykhun.onrender.com/user-only',
        withCredentials : true
        })
        .then((response) => {
            setUser(response.data)
            setAuthed(true)
            setLoading(false)
        })
        .catch((error) => {
          if(error.response.status === 401) console.log("not authenticated");
          else console.log(error)
          setLoading(false);
        });
    };
    useEffect(() => {
        fetchUser()
    },[])
function getUserImage(){
      axios({
        method : 'get',
        url : `https://fakebook-server-khaykhun.onrender.com/users/${user._id}/image`
      })
      .then((response) => {
          if(response.data.image){
              setImageSrc(response.data.image);
          }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    useEffect(() => {
        if (user) {
          getUserImage();
        }
      }, [user]);   

  return (
    <>
    {Loading ? <LoadingComponent />
    : authed ? 
    <div className='bg-gray-100 p-0 m-0 overflow-x-hidden flex w-screen items-center flex-col'>
      <Header img={imageSrc} username={user.username}/>
      <div className='h-[90vh] mt-[10vh] sm:flex fixed left-0 top-0 sm:w-[10vw] lg:w-[25vw]'>
        <SideBar img={imageSrc} username={user.username}/>
      </div>
      <div className='w-[98vw] sm:w-[90vw] min-h-screen md:w-[60vw] lg:w-[45vw] mt-[21vh] sm:mt-[11vh]'>
        <RouterProvider router={authedRouter}/>
      </div>
      <div className='hidden lg:flex w-[25vw] fixed top-[10vh] right-0'>
        <RightBar />
      </div>
    </div>
    :
    <div>
        <RouterProvider router={notAuthedRouter}/>
    </div>}
    </>
  )
}

export default App