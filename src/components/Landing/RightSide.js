import React, { useState, useEffect } from 'react'
import "./RightSide.scss";
import User from "../../Images/d.png"
import { Database } from '../../Firebase/DataBase';
import { Link } from 'react-router-dom';
const RightSide = ({ user }) => {
    const [you, setuser] = useState();
    const [aluser, setaluser] = useState([]);
    useEffect(() => {
        if (user) {
            Database.user_Auth.onSnapshot((x)=>{
                const meter=[]
                x.forEach((doc)=>{
                    meter.push(doc.data())
                })
                setaluser([...meter])
            })
            setuser(user)
        }
    }, [user])

    return (
        <div className='RightSide'>
            <div className='Right_Side-Controller'>
                <div className='row'>

                    <div className='User-self'>
                        <div className='half'>
                            <div className='left'>
                                <div className='user-img'>
                                    <img   src={user?user.imgurl==="lol"?User:user.imgurl:User} alt='devo' />
                                </div>
                                <div className='user-info'>
                                    <span className='bs'>{user?user.name:"anonymous"}</span>
                                    <span className='simple'>{user?user.place:"india"}</span>
                                </div>
                            </div>
                            <div className='switch'>
                                <Link to="/profile">Switch</Link>
                            </div>
                        </div>
                    </div>
                    <div className='suggested'>
                        <div className='half'>
                            <div className='suggest'>
                                <div className='texts'>
                                    <span>suggestin for you</span>
                                </div>
                                <div className='textsa'>
                                    <Link to="/">See All</Link>
                                </div>
                            </div>
                           {aluser&& aluser.map((l,index)=>( <div className='people' key={`${l.userid}/${index}`}>
                                <div className='left'>
                                    <div className='people-img'>
                                        <img src={l.imgurl==="lol"?User:l.imgurl} alt='people' />
                                    </div>
                                    <div className='peole-info'>
                                        <span className='one'>{l.name}</span>
                                        <span className='one2'>{l.place}</span>
                                    </div>
                                </div>
                                <div className='"follow'>
                                    <Link to={`/user-profile/${l.userid}`} >Follow</Link>
                                </div>
                            </div>))}
                          
                        </div>
                    </div>
                    <div className='timer'>
                        <div className='linksh'>
                            <li><Link to="/">about</Link></li>
                            <li><Link to="/">top</Link></li>
                            <li><Link to="/">Locations</Link></li>
                            <li><Link to="/">privacy</Link></li>
                            <li><Link to="/">help</Link></li>

                        </div>
                    </div>
                    <div className='footer'>
                        <span>@ 2021 social from Aryan</span>
                    </div>

                </div></div>
        </div>
    )
}

export default RightSide
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN