import React, { useEffect, useState } from 'react'
import "../UserPRo/Profile.scss";
import { Link, useParams ,useNavigate} from 'react-router-dom';

import { Database } from "../../Firebase/DataBase";
import Default from "../../Images/d.png"
const SingleUser = () => {
    const [data, setdata] = useState([]);
    const [user, setuser] = useState()
    const [likes, setlikes] = useState(0)
    const [comment, setcomment] = useState(0)

    const { id } = useParams();
const Navigate=useNavigate()
    useEffect(() => {
        const userid = id;
        if(id===null || id===undefined){
            Navigate("/home");
        }
        Database.user_Auth.doc(userid).onSnapshot((k) => {
if(!k.exists){
    Navigate("/home")
}else{
            setuser(k.data())
            const postids = k.data().postids;
            const arr = [];
            {
                postids && postids.map((x) => {

                    Database.user_Post.doc(x).onSnapshot((d) => {
                        arr.push(d.data())
                        setdata([...arr])
                        return;
                    })



                })
            }
        }
        })
    }, [id]);
    useEffect(() => {
        if (data.length > 0) {
            const get=data.map(x=>x.likes.length).reduce((x,y)=>x+y);
        setlikes(get);
        const get2=data.map(x=>x.comments.length).reduce((x,y)=>x+y);
setcomment(get2);
        }

    }, [data]);
return (
    <div className='UserProfile'>
        <div className='profile-controller'>
            <div className='row'>
                <div className='ImAvtar'>
                    <div className='parents'>
                        <div className='imgs'>
                            <div className='Rouns' style={{ overflow: "hidden" }}>
                                <img src={user ? user.imgurl ? user.imgurl === "lol" ? Default : user.imgurl : Default : Default} alt='sider' />
                            </div>
                        </div>
                        <div className='user-datas'>
                            {/* user img and back option */}
                            <div className='name'>
                                <div className='n'>
                                    <span className='text'>{user ? user.name : "Anonymous"}</span>
                                </div>
                                <div className='back'>
                                    <Link to="/home" style={{ color: "white" }}>
                                        <span className='="back2'>
                                            Back
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            {/* email */}
                            <div className='email'>
                                <span><strong>place</strong>:{user ? user.place : "India"}</span>
                            </div>
                            {/* likes and friends */}
                            <div className='total'>
                                <div className='all'>
                                    <div className='meta-likes'>
                                        <div className='sider'>
                                            <span>
                                                <i class="far fa-heart"></i>
                                            </span>
                                            <span className='tap'>Total likes:</span>
                                        </div>
                                        <div className='righter'>
                                            <span>{likes?likes:0}</span>
                                        </div>
                                    </div>
                                    <div className='meta-likes'>
                                        <div className='sider'>
                                            <span>
                                            <i class="far fa-comment-alt"></i>
                                            </span>
                                            <span className='tap'>Total comments:</span>
                                        </div>
                                        <div className='righter'>
                                            <span>{comment?comment:0}</span>
                                        </div>
                                    </div>
                                    <div className='meta-likes'>
                                        <div className='sider'>
                                            <span>
                                            <i class="fas fa-image"></i>
                                            </span>
                                            <span className='tap'>Total posts:</span>
                                        </div>
                                        <div className='righter'>
                                            <span>{user ? user.postids ? user.postids.length : "no post" : "no post"}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='line'></div>
                <div className='All_posts'>
                    <div className='All-container'>

                    </div>
                </div>
                <div className='All_posts'>
                    <div className='All-container'>

                        <div className='Alls'>


                           {data && data.map((x)=>(
                                <div className='upload'>
                                <div className='imgs'>
                                    <img src={x?x.purl:Default} alt='sider' />
                                </div>
                                <div className='main'>
                                    <div className='left'>
                                        <span><i class="far fa-heart"></i></span>
                                        <span>{x?x.likes.length:0}</span>
                                    </div>
                                    <div className='left'>
                                        <span>
                                            <i class="far fa-comment-alt"></i>
                                        </span>
                                        <span>{x?x.comments.length:0}</span>
                                    </div>



                                </div>
                            </div>
                           ))}



                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default SingleUser;
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN