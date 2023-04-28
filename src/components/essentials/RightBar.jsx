import {React,useState,useEffect} from 'react'
import axios from 'axios'
import User from '../../img/user.png'
import Search from '../../img/search.png'
import RightBarPeopleCard from '../RightBarPeopleCard'

function RightBar() {
    const [users,setUsers] = useState([]);
    const [search,setSearch] = useState("");

    function getUsers(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/get-users',
            withCredentials : true,
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(()=>{
        getUsers();
    },[])
    useEffect(() => {
        const cards = document.getElementsByClassName("right-bar-card");
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id.toLowerCase().includes(search.toLowerCase())) {
                cards[i].classList.remove("hidden")
                cards[i].classList.add("flex")
            } else {
                cards[i].classList.add("hidden")
                cards[i].classList.remove("flex")
            }
        }
    }, [search]);
  return (
    <div className='w-full sm:w-full h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
        <ul className='flex flex-col gap-[8px] p-[10px]'>
            <div className='flex justify-center items-center bg-white rounded-full gap-[3px]'>
                <img src={Search} className="w-[15px] h-[15px]"/>
                <input type="text" placeholder='Find users' className='w-[80%] p-[5px]'
                    onChange={(e)=>{setSearch(e.target.value)}}
                />
            </div>
            {/* .filter(user => user.username.toLowerCase()).includes(search) */}
            {
                users?.map(user => {
                    return <li key={user._id} id={user.username} className="right-bar-card"><RightBarPeopleCard user={user} /></li>
                })
            }
        </ul>
    </div>
  )
}

export default RightBar
