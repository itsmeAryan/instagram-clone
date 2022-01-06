import React,{useState,useEffect} from 'react'
import "./Usercomment.scss";
import Defaults from "../../Images/d.png";
import { Database } from '../../Firebase/DataBase';
const Usercomment = ({singledata }) => {
    
    const [commit, setCommit] = useState('');
    const [data, setdata] = useState([]);
    const [active,setactive]=useState()

    useEffect(() => {
        if (singledata[0]) {

            const id = singledata[1].userid;
            const post = singledata[0];
            const postid = singledata[2];
            const arr = [{ userid: id, post, postid }];
            setactive(singledata[1])
            setdata([...arr])
            
        }

    }, [singledata[0], singledata[1]]);
    const CommentHandler = () => {
        const id = active.userid;
        const avtar=active.imgurl;
        const name=active.name;
        const postid = data[0].postid;
        const post = data[0].post;
        const obj={
            commit,userID:id,
            avtar,
            name
        };
        const dev=[obj]
        Database.user_Post.doc(postid).update({
            comments:[...dev,...post.comments]
        }).then((x)=>{
        });
        
        setCommit('')
    }
    return (
        <div className='Comments'>
            <div className='grp'>
                <div className='face'>
                <div className='user-face'>
                    <img  src={active?active.imgurl:Defaults} alt='kl'/>
                </div>
                </div>
                <div className='input'>
                    <div className='check'>
                    <input placeholder='Add a comment...' type={"text"} value={commit} onChange={(e) => setCommit(e.target.value)}/>
                    </div>
                    <div className='commit'>
                        <span className='text' onClick={CommentHandler}>Post</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Usercomment
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN