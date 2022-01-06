import React, { useState, useEffect } from 'react'
import "./Post.scss"
import Carousel from '../Carousel'
import { Database } from "../../Firebase/DataBase"
import Likes from './Likes'
import Comments from './Comments';
import Defaults from "../../Images/d.png";
import Loader from '../../Loader'
import { useNavigate } from 'react-router-dom'
const Post = ({ user }) => {
    const [msg, setmsg] = useState("");
    const [posts, setpost] = useState();
    const [openser, setopenser] = useState();
    const  Navi=useNavigate()
    useEffect(() => {
        const data = Database.user_Post.onSnapshot((x) => {
            const arr = []
            x.forEach((doc) => {
                const obj = { ...doc.data(), postid: doc.id };
                arr.push(obj)
            })
            setpost(arr)
        });
        return () => {
            data()
        }
    }, [user])
    const DeletePost = (postid) => {
        if(user.postids){
            const check=user.postids.filter(x=>x===postid);
            if(check.length>0){
                const left=user.postids.filter(x=>x!==postid);
                Database.user_Auth.doc(user.userid).update({
                    postids:[...left]
                })
        Database.user_Post.doc(postid).delete()
                
            }
        }
    }
    const downloadImg = (img) => {
        const a = document.createElement("a");
        a.href = img;
        a.download="search";
        a.click()
    };
  function  fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
        }
      
        document.body.removeChild(textArea);
      }
    const Copy=()=>{
        const text=window.document.documentURI;;
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
          }
          navigator.clipboard.writeText(text).then(function() {
            setmsg("copied");
            setTimeout(() => {
                setmsg('')
                setopenser('')
            }, 2000);
          }, function(err) {
            setmsg("cant copy")
            setTimeout(() => {
                setmsg('')
                
            }, 2000);
          });
    }
    const Redirect=(s)=>{
        Navi(`/user-profile/${s}`)
    }
    return (
        <>
            {(posts === undefined && user) || (posts === null && user) ? <Loader /> :

                posts.map((x,index) => (
                    <div className='Post-data' key={`${x.userid}/${index}`}>
                        <div className='post-Controller'>
                            <div className='post-row'>
                                <div className='All'>
                                    {msg!==''&&<div className='Strong' style={{display:"flex",opacity:"1"}}>
                                        <span>{msg}</span>
                                    </div>}
                                    <div className='user-details'>
                                        <div className='left'>
                                            <div className='user-avtar'>

                                                <img onClick={(S)=>Redirect(x.userid)}  src={x?x.useravtar==="lol"?Defaults:x.useravtar : Defaults} alt='avtar' />
                                            </div>
                                            
                                            <div className='user-basic'>
                                                <span className='name'>{x.userName}</span>
                                                <span className='mumbai'>{x.place}</span>
                                            </div>
                                        </div>
                                        <div className='right'>
                                            <span className='click' onClick={() => {
                                                setopenser(x.postid)
                                            }} >
                                                <i class="fas fa-ellipsis-h"></i>
                                            </span>
                                            <div className='Post' style={{ display: openser === x.postid ? "flex" : "none" }}>
                                                <div className='Post-controller'>
                                                    <div className='box'>
                                                        <div className='profilo' onClick={(sd) => DeletePost(x.postid)}>
                                                            <span className='icon'><i class="far fa-trash-alt"></i></span>
                                                            <span className='text'>delete</span>
                                                        </div>
                                                        <div className='profilo'>
                                                            <span className='icon'><i class="far fa-bookmark"></i></span>
                                                            <span className='text'>saved</span>
                                                        </div><div className='profilo' onClick={()=>{
                                                            Navi("/profile")
                                                        }}>
                                                            <span className='icon'><i class="fas fa-cog"></i></span>
                                                            <span className='text'>settings</span>
                                                        </div>
                                                        <div className='profilo' onClick={(d) => downloadImg(x.purl)}>
                                                            <span className='icon'><i class="fas fa-download"></i></span>
                                                            <span className='text'>download</span>
                                                        </div>
                                                        <div className='profilo' onClick={(e)=>Copy(x.purl)}>
                                                            <span className='icon'><i class="far fa-copy"></i></span>
                                                            <span className='text'>copy</span>
                                                        </div>
                                                        <div className='profilo' onClick={() => setopenser('')}>
                                                            <span className='icon'><i class="fas fa-ban"></i></span>
                                                            <span className='text'>cancel</span>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {posts && <Carousel post={x} />
                                    }
                                    {posts &&
                                        <Likes user={user} post={x} />
                                    }
                                    {x &&
                                        <Comments user={user} post={x} />}
                                </div>
                            </div>
                        </div>
                    </div>
                ))



            }
        </>

    )
}

export default Post
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN