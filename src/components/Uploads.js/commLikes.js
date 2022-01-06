import React, { useState, useEffect } from 'react'
import "./CommLikes.scss"
import { Database } from "../../Firebase/DataBase"
const CommLikes = ({ singledata }) => {
    const [like, setLike] = useState();
    const [data, setdata] = useState([]);
    const [total,setottal]=useState(0);
    useEffect(() => {
        if (singledata[0]) {

            const id = singledata[1].userid;
            const post = singledata[0];
            const postid = singledata[2];
            const check = post.likes.includes(id) ? true : false;
            setottal(post.likes.length);
            const arr = [{ userid: id, post, postid }];
            setdata([...arr])
            setLike(check);
        }

    }, [singledata[0], singledata[1]]);
    const likehandle = () => {
        const id = data[0].userid;
        const postid = data[0].postid;
        const post = data[0].post;
       

        if (like) {


            const arr = post.likes.filter((x) => x !== id);

            Database.user_Post.doc(postid).update({
                likes: [...arr]
            });
        } else {

            const arr = [...post.likes, id];
            Database.user_Post.doc(postid).update({
                likes: [...arr]
            });



        }
    }
    return (
       <>
        <div className='likes'>
            <div className='left'>
                <span className='icon' onClick={likehandle} ><i class={like ? "far fa-heart add" : "far fa-heart"} ></i></span>
                <span className='icon'><i class="far fa-comment"></i></span>
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

export default CommLikes
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN