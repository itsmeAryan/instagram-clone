import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Database } from "../../Firebase/DataBase"
import "./Like.scss"
const Likes = ({ user, post }) => {
    const [like, setLike] = useState();
    const [total,setottal]=useState(0);

    useEffect(() => {
        const id = user.userid;
        const check = post.likes.includes(id) ? true : false;
        setottal(post.likes.length);
        setLike(check);

    }, [post, user]);
    const likehandle = () => {
        if (like) {
            const arr = post.likes.filter((x) => x !== user.userid);

            Database.user_Post.doc(post.postid).update({
                likes: [...arr]
            });
        } else {
            const arr = [...post.likes, user.userid];
            Database.user_Post.doc(post.postid).update({
                likes: [...arr]
            });

        }
    }
    return (
        <>
          <div className='likes'>
            <div className='left'>
                <span className='icon' onClick={likehandle}><i class={like ? "far fa-heart add" : "far fa-heart"} ></i></span>
                <span className='icon'><Link to="/comment-post" state={{ post: post.postid, userid: user }} style={{ color: "black" }}>
                    <i class="far fa-comment"></i></Link></span>
                <span className='icon'><i class="far fa-paper-plane"></i></span>

            </div>
            <div className='right'>
                <span className='kop'><i class="far fa-bookmark"></i></span>
            </div>
        </div>
        <div className='likes morphin' style={{
            padding:" 0.7rem 1rem"
        }}>
            likes {total}
        </div>
        </>
      
    )
}


export default Likes
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN