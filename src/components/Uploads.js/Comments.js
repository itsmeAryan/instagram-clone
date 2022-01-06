import React, { useEffect, useState } from 'react'
import "./Comments.scss"
import Carousel from "../Carousel";
import Usercomment from './Usercomment';
import { useLocation ,useNavigate} from "react-router-dom";
import { Database } from '../../Firebase/DataBase';
import Defaults from "../../Images/d.png";
import Likeer from "./commLikes"
const Comments = () => {
    const [data, setdata] = useState([]);
    const location = useLocation();
    const navigate=useNavigate()
    useEffect(() => {

        if(location.state===null || location.state===undefined){
            navigate("/home");
        }
        else{
            const { post, userid } = location.state;
        
        
        Database.user_Post.doc(post).onSnapshot((s) => {
            const arr = [s.data(), userid,post]
            setdata([...arr])
        })
        }


    }, [location.state])
    return (
        <div className='game'>
            {data && <div className='Comment-Dailog'>

                <div className='Comment-Controller'>
                    <div className='row'>
                        <div className='left'>
                            {data && <Carousel h={true} post={data[0]} />}
                        </div>
                        {/* right is going to created  */}
                        <div className='right'>
                            <div className='user-icon'>
                                <div className='left'>
                                    <div className='img'>
                                        <div className='circle'>
                                            <img  src={data[0]?data[0].useravtar==="lol"?Defaults:data[0].useravtar:Defaults} alt='devo' />
                                        </div>
                                    </div>
                                    <div className='icon-name'>
                                        <span className='name'> {data[0]?data[0].userName:"anonymous"} </span>
                                        <span className='Follow'>Follow</span>
                                    </div>
                                </div>
                                <div className='right'>
                                    <span className='icon'>
                                        <i class="fas fa-ellipsis-h"></i>
                                    </span>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='owner'>
                                    <div className='left'>
                                        <div className='img'>
                                            <div className=' circle'>
                                                <img  src={data[0]?data[0].useravtar==="lol"?Defaults:data[0].useravtar:Defaults} alt='devo' />
                                            </div>
                                        </div>
                                        <div className='icon-name'>
                                            <span className='name'><strong>{data[0]?data[0].userName:"anonymous"}</strong>  {data[0]?data[0].title:"social is amazing"} </span>
                                        </div>
                                    </div>
                                    {/* people comments */}

                                    {data[0] && data[0].comments.map((c,index) => (
                                        <div className='people' key={`${c.userID}/${index}`}  >
                                            <div className='left sd'>
                                                <div className='img'>
                                                    <div className=' circle'>
                                                        <img src={c?c.avtar==="lol"?Defaults:c.avtar:Defaults} alt='devo' />
                                                    </div>
                                                </div>
                                                <div className='icon-name'>
                                                    <span className='name'><strong>{c.name}</strong> {c.commit}</span>
                                                </div>
                                            </div>
                                            <div className='Right'>
                                                <span>
                                                    <i class="far fa-heart"></i>
                                                </span>
                                            </div>
                                        </div>
                                    ))}



                                </div>
                            </div>
                            {/* like box */}
                            {data &&<Likeer  singledata={data} />}
                            {/* <div className='likes'>
                                <div className='left'>
                                    <span className='icon'><i class="far fa-heart" ></i></span>
                                    <span className='icon'><i class="far fa-comment"></i></span>
                                    <span className='icon'><i class="far fa-paper-plane"></i></span>

                                </div>
                                <div className='right'>
                                    <span className='kop'><i class="far fa-bookmark"></i></span>
                                </div>
                            </div> */}
                            {data && <Usercomment singledata={data} />}
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Comments
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN