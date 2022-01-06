import React, { useState } from 'react'
import "./Comments.scss";
import Defaults from "../../Images/d.png";
import { Database } from '../../Firebase/DataBase';
const Comments = ({ user, post }) => {

    const [commit, setCommit] = useState('');
    const CommentHandler = () => {
        const obj = {
            commit, userID: user.userid,
            avtar: user.imgurl,
            name: user.name
        };
        const dev = [obj]
        Database.user_Post.doc(post.postid).update({
            comments: [...dev, ...post.comments]
        }).then((x) => {
        });

        setCommit('')
    }
    return (
        <div className='Comments'>
            <div className='grp'>
                <div className='face'>
                    <div className='user-face'>
                        <img src={user ? user.imgurl==="lol"?Defaults:user.imgurl : Defaults} alt='kl' />
                    </div>
                </div>
                <div className='input'>
                    <div className='check'>
                        <input placeholder='Add a comment...' type={"text"} value={commit} onChange={(e) => setCommit(e.target.value)} />
                    </div>
                    <div className='commit'>
                        <span className='text' onClick={CommentHandler}>Post</span>
                    </div>
                </div>

            </div>
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