import React from 'react'
import "./Post_Image.scss"
import { Database, Storage } from "../../Firebase/DataBase"
import { v4 as uuid } from "uuid";
import Loader from '../../Loader';
import Default from "../../Images/d.png"
class Post_Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setting: false,
            animate: false,
            post: true,//flase se true ki
            fileinfo: [],
            text: '',
            like: false,
            commentbox: false,
            userobj: '',
            load: false,
            avtar: false
        }
        this.Close_Model = this.Close_Model.bind(this);

    }
    componentDidMount() {
        window.addEventListener("click", this.Close_Model);
        this.setState({
            post: this.props.open,
            userobj: this.props.user
        })
    };
    componentDidUpdate() {
        window.addEventListener("click", this.Close_Model)

    }
    componentWillUnmount() {
        window.removeEventListener("click", this.Close_Model)
    }
    Close_Model(e) {
        const reference = document.getElementById("model");
        const reference2 = document.getElementById("model2");

        if (e.target === reference || e.target === reference2) {
            reference.style.display = "none";
            this.props.set(false)
            this.setState({
                post: false,
                text: "",
                fileinfo: []
                ,
                commentbox: false
            })
        }

    }
    PostSave(data) {
        this.props.set(false)

        document.getElementById(data).style.display = "none";

    }
    Upload = async (data) => {
        const userobj = this.props.user || this.state.userobj;
        if (this.state.avtar === false) {
            const closeme = this.props;
            const text = this.state.text;
            if (this.state.fileinfo.length > 0) {
                this.setState({
                    load: true
                })
                const store = Storage.ref(`post/${this.props.user.id}/${uuid()}`).put(this.state.fileinfo[0])
                store.on("state_changed", fun1, fun2, fun3);
                function fun1(snapshot) {

                }
                function fun2(er) {
                }
                setTimeout(() => {
                    this.setState({
                        load: false
                    })
                }, 2000);
                function fun3() {
                    const ch = text === "" ? "hello media" : text;

                    store.snapshot.ref.getDownloadURL().then((x) => {
                        const names = new Date()
                        const create = names.toLocaleString();
                        const obj = {
                            likes: [],
                            comments: [],
                            userid: userobj.userid,
                            useravtar: userobj.imgurl,
                            title: ch,
                            place: userobj.place,
                            purl: x,
                            userName: userobj.name,
                            created_at: create
                        };

                        Database.user_Post.add(obj).then(ref => {
                            let exist = userobj.postids ? userobj.postids : [];
                            closeme.set(false)
                            Database.user_Auth.doc(userobj.userid).update({
                                postids: [...exist, ref.id]
                            }, (datas) => {

                            })
                        })
                    })
                }

            }
        } else {
 const closeme = this.props;
        if (this.state.fileinfo.length > 0) {
            this.setState({
                load:true
            })
            const store = Storage.ref(`post/${this.props.user.id}/${uuid()}`).put(this.state.fileinfo[0])
            store.on("state_changed", fun1, fun2, fun3);
            function fun1(snapshot) {
                
            }
            function fun2(er) {
            }
            setTimeout(() => {
                this.setState({
                    load:false
                })
            }, 3900);

            function fun3() {
             
                store.snapshot.ref.getDownloadURL().then((x) => {
                    
                    Database.user_Auth.doc(userobj.userid).update({
                        imgurl:x
                    })
                    closeme.set(false)
                })
            }

        }
        }
        this.setState({
            avtar: false
        })
       
    }
    render() {
        return (
            <div className="PostModel" id="model" style={{ display: this.props.open ? "flex" : "none" }}>
                {this.state.load && <Loader />}
                <div className="PostModel-Controller" id="model2"
                    style={{ display: this.props.open ? "flex" : "none" }}
                >
                    <div className="row">
                        <div className="owner">
                            <div className="modeltitle">
                                <span className="icon">
                                    <i class="fas fa-chevron-left"></i>
                                </span>
                                <span className="icons">
                                    <img  src={this.props.user?this.props.user.imgurl==="lol"?Default:this.props.user.imgurl:Default} alt="post model" />
                                </span>
                            </div>
                            <div className="post-conent">
                                <textarea value={this.state.text} onChange={(e) => {
                                    this.setState({
                                        text: e.target.value
                                    })
                                }} rows={7} cols={10} placeholder="whats in your mind" className="textarea" />
                            </div>
                            <div className="post-option">
                                <div className="all-option">
                                    <div className="sd">
                                        <input multiple onChange={(e) => {
                                            this.setState({
                                                fileinfo: [e.target.files[0]],
                                                avtar: false
                                            })
                                        }} type="file" accept="video/*, image/*" name="filo" />
                                        <label className="icon" htmlFor="filo">
                                            <i class="fas fa-image"></i>
                                        </label>
                                    </div>
                                    <div className="uploadme">
                                        <span className="icon">
                                            <i class="fas fa-camera"></i>
                                        </span>
                                    </div>
                                    <div className="uploadme">

                                        <span className="icon">
                                            <i class="fas fa-video"></i>
                                        </span>
                                    </div>
                                    <div className="sd">
                                        <input multiple onChange={(e) => {
                                            this.setState({
                                                fileinfo: [e.target.files[0]],
                                                avtar: "meta-avtar"
                                            })
                                        }} type="file" accept="image/*" name="filo" />
                                        <label className="icon" htmlFor="filo">
                                            <i class="far fa-user"></i>

                                        </label>

                                    </div>
                                </div>
                                <div className="Uploader">
                                    <div className="Btn" onClick={(data) => this.Upload("model")}>
                                        <span className="icon">
                                            <i class="fas fa-paper-plane"></i>
                                        </span>
                                        <span className="post">post</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post_Image
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN