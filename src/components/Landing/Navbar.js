import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.scss"
import Post from './Post';
import RightSide from './RightSide';
import PostModel from "../Uploads.js/Post_Image";
import { Auth, Database } from "../../Firebase/DataBase"
import { connect } from "react-redux"
import * as Type_checker from "../../Redux/Action/Typo"

import Default from "../../Images/d.png"
const Navbar = (props) => {
    const [open, setopen] = useState(false);
    const [opeProfile, setProfile] = useState(false)
    const [userinfo, setuserinfo] = useState([]);
    const [Authid, setAuthid] = useState(props.id)
    const navigate = useNavigate(); const [err, seterr] = useState('');
    const [loading, setloading] = useState(false);
    const [active, setactive] = useState(false)
    useEffect(() => {
        const id = props.id.uid;
        Database.user_Auth.doc(id).onSnapshot((x) => {
            setuserinfo(x.data())
            setAuthid(props.id.uid)
        })
        const { loading, err, data, user } = props.Auth_Data;

        if (err) {
            seterr(err);
            setTimeout(() => {
                seterr('')
            }, 2000);
        } if (loading) {
            setloading(loading)
        }
        if (data === 'login success' || user !== null) {
        } else {
            if (user === null) {
                setactive(true)
            } else {
                setactive(false)
            }
        }

    }, [props.id, props.Auth_Data])
    const OpenModel = () => {
        setopen(!open)
    };


    return (
        <>

            <div className='Navbar'>

                <div className='Nvabra-Controller'>
                    <div className='row'>
                        <div className='dev'>
                            <div className='brand'>
                                <Link to="/home"><span>
                                    Social</span></Link>
                            </div>
                            {/* input class */}
                            <div className='navbar-input'>
                                <div className='input-parent'>
                                    <div className='input-icon'>
                                        <span className='texo'>
                                            <i class="fas fa-search"></i>
                                        </span>
                                    </div>
                                    <div className='input'>
                                        <input type={"text"} placeholder='Search' />
                                    </div>
                                </div>
                            </div>
                            {/* menu section */}
                            <div className='menu-sections'>
                                <div className='Controller'>
                                    <div className='icons one'>
                                        <span className='icons-menus'>
                                            <i class="fas fa-home"></i>
                                        </span>
                                    </div>
                                    <div className='icons two'>
                                        <span className='icons-menus'>
                                            <i class="far fa-paper-plane"></i>
                                        </span>
                                    </div>
                                    <div className='icons' onClick={OpenModel}>
                                        <span className='icons-menus'>
                                            <i class="far fa-plus-square"></i>
                                        </span>
                                    </div>
                                    <div className='icons three'>
                                        <span className='icons-menus'>
                                            <i class="far fa-compass"></i>
                                        </span>
                                    </div>
                                    <div className='icons'>
                                        <span className='icons-menus'>
                                            <i class="far fa-heart"></i>
                                        </span>
                                    </div>
                                    <div className='user-icon'>
                                        <Link to="/profile" onClick={(e) => {
                                            e.preventDefault()
                                            setProfile(!opeProfile)
                                        }}>
                                            <img style={{width:"100%"}} src={userinfo ? userinfo.imgurl === undefined ? Default : userinfo.imgurl === "lol" ? Default : userinfo.imgurl : Default} alt='ds' />
                                        </Link>
                                        <div className='Custom' style={{
                                            display: opeProfile ? "flex" : "none"
                                        }}>
                                            <div className='custom-controller'>
                                                <div className='box'>
                                                    <div className='dsdsdds' style={{display:"flex",width:"100%",margin:"0",padding:"0",borderRadius:"0"}} >
                                                        <Link className='profilo'  to="/profile" state={{userinfo}} style={{  textDecoration: "none", color: "black"}}>
                                                            <span className='icon'><i class="far fa-user-circle"></i></span>
                                                            <span className='text'>profile</span></Link>
                                                    </div>
                                                    <div className='profilo'>
                                                        <span className='icon'><i class="far fa-bookmark"></i></span>
                                                        <span className='text'>saved</span>
                                                    </div><div className='profilo'>
                                                        <span className='icon'><i class="fas fa-cog"></i></span>
                                                        <span className='text'>settings</span>
                                                    </div><div className='profilo'>
                                                        <span className='icon'><i class="fas fa-sync"></i></span>
                                                        <span className='text'>swictch accounts</span>
                                                    </div>

                                                </div>
                                                <div className='box2' onClick={props.Signout} >
                                                    <span className='logout'>Log Out</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='posts-manager'>
                <div className='posts-container'>
                    <div className="one">
                        {userinfo && <Post user={userinfo} />}

                    </div>
                    <div className='two'>
                       {userinfo && <RightSide user={userinfo} />}

                    </div>
                </div>
            </div>


            {/* we are using custom as modal  opener */}
            {/* <Custom /> */}
            {userinfo && <PostModel user={userinfo} set={setopen} open={open} />}

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        Auth_Data: state.Auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Signout: () => {
            try {
                Auth.signOut()
                dispatch({
                    type: Type_checker.Auth_Signout,
                })
            } catch (error) {
                dispatch({
                    type: Type_checker.Auth_Error,
                    payload: error.message
                })
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN