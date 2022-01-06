import React, { useState, useEffect } from 'react'
import "./Register.scss";
import Registerimg from '../../Images/Login/register1.jpg';
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import {
    Auth, Database,
    Storage
} from "../../Firebase/DataBase";
import * as Type_Cheker from "../../Redux/Action/Typo";
import Loader from "../../Loader";
import { v4 as uuid } from 'uuid';
import Err from "../../Err"
const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');const navigate=useNavigate()
    useEffect(() => {
        const {loading ,err,data,user} = props.Auth_Data;
        
        if (err) {
            seterr(err);
            setTimeout(() => {
                seterr('')
            }, 2000);
        } if (loading) {
            setloading(loading)
        } if (data==='login success' || user!==null) {
            navigate("/home")
        }



    }, [props.Auth_Data])
    const [name, setname] = useState('');
    const [check, setCheck] = useState(false);
    const [file, setfile] = useState([]);
    const [err, seterr] = useState('');
    const [loading, setloading] = useState(false);
    const [place,setplace]=useState("")

    const SIgnUp = () => {
        const obj = {
            email, password,
            name,
            file,
            cpassword
            ,place
        }

        props.Auth(obj)
    }

    return (
        <div className="Registration">
            {(loading && props.Auth_Data.loading) && <Loader />}
            {err && <Err ename={err} />}
            <div className="Registration-controller">
                <div className="Registration-row">
                    <div className="Registration-left">
                        <div className="Left-parent">
                            <div className="Form-img">
                                <img src={Registerimg} alt="User form" />
                            </div>
                        </div>
                    </div>
                    <div className="Registration-Right">
                        <div className="Meter">
                            <div className="Right-Parent">
                                <div className="Parent-title">
                                    <h1 className="text">
                                        sign up
                                    </h1>
                                </div>
                                <div className="Parent-form">
                                    <div className="Name-form Parent-child">
                                        <div className="Name-icon">
                                            <i class="fas fa-user"></i>
                                        </div>
                                        <div className="Name-input">
                                            <input placeholder="your name" value={name} onChange={(e) => {
                                                setname(e.target.value)
                                            }} type="text" name="name" id="name" />
                                        </div>
                                    </div>
                                    <div className="Name-form Parent-child">
                                        <div className="Name-icon">
                                            <i class="far fa-envelope"></i>
                                        </div>
                                        <div className="Name-input">
                                            <input placeholder="your email" value={email} onChange={(e) => {
                                                setEmail(e.target.value)
                                            }} type="email" name="email" id="email" />
                                        </div>
                                    </div>
                                    <div className="Name-form Parent-child">
                                        <div className="Name-icon">
                                            <i class="fas fa-lock"></i>
                                        </div>
                                        <div className="Name-input">
                                            <input placeholder="your password" value={password} onChange={(e) => {
                                                setpassword(e.target.value)
                                            }} type="text" name="password" id="password" />
                                        </div>
                                    </div>
                                    <div className="Name-form Parent-child">
                                        <div className="Name-icon">
                                            <i class="fas fa-lock"></i>
                                        </div>
                                        <div className="Name-input">
                                            <input placeholder="confirm password" value={cpassword} onChange={(e) => {
                                                setcpassword(e.target.value)
                                            }} type="text" name="cpassword" id="cpassword" />
                                        </div>
                                    </div>
                                    <div className="Name-form Parent-child">
                                        <div className="Name-icon">
                                        <i class="fas fa-globe"></i>
                                        </div>
                                        <div className="Name-input">
                                            <input placeholder="your place" value={place} onChange={(e) => {
                                                setplace(e.target.value)
                                            }} type="email" name="place" id="place" />
                                        </div>
                                    </div>
                                    <div className="Name-form Parent-child">
                                        <div className="Name-input">
                                            <input style={{ opacity: "0", zIndex: "111" }} onChange={(e) => {
                                                setfile([e.target.files[0]])

                                            }} type="file" accept=" image/*" name="filo" />
                                            <label style={{ width: "100%", position: "absolute", top: "0", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: "2rem", fontWeight: "bolder", background: "white" }} className="icon" htmlFor="filo">
                                                upload profile
                                            </label>
                                        </div>
                                    </div>
                                    <div className="Check-form">
                                        <div className="Check-me">
                                            <input type="checkbox" onChange={(e) => { setCheck(e.target.checked) }} name="check" id="check" />
                                        </div>
                                        <div className="form-condition">
                                            <span className="text">accept term and condition</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="Submit-form">
                                    <div disable={loading} className="submitTo-click" onClick={
                                        check ? SIgnUp : undefined}>
                                        Register

                                    </div>
                                </div>
                                <div className="not-user">
                                    <div className="striver">
                                        <span className="text">dont have account</span>
                                        <span className="lol-text"><Link to="/">Login</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


// for reducer
const mapStateToProps = (state) => {
    return {
        Auth_Data: state.Auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Auth: async (obj) => {
            dispatch({
                type: Type_Cheker.Auth_Loading
            });
            try {
                const { email, password, name, file, cpassword ,place} = obj
                if (password !== cpassword) {
                    dispatch({
                        type: Type_Cheker.Auth_Error,
                        payload: "password does not match"
                    })
                } else if (password === '') {

                    dispatch({
                        type: Type_Cheker.Auth_Error,
                        payload: "password is empty"
                    })
                }
                else if (file.size / (1024 * 1024) > 100) {

                    dispatch({
                        type: Type_Cheker.Auth_Error,
                        payload: "file size is greater than 100 mb"
                    })
                }
                else if (name === '') {

                    dispatch({
                        type: Type_Cheker.Auth_Error,
                        payload: "name does not empty"
                    })
                } else {
                    if (file.length>0) {
                        const data = await Auth.createUserWithEmailAndPassword(email, password);
                        const store = Storage.ref(`userimg/${uuid()}`).put(file[0])
                        store.on("state_changed", fun1, fun2, fun3);
                        function fun1(snapshot) {
                            
                            
                        }
                        function fun2(er) {
                        }
                        async function fun3() {
                            const area=place===''?"india":place;
                            store.snapshot.ref.getDownloadURL().then((x) => {
                                const names = new Date()
                                const create = names.toLocaleString();
                                const userobj = {
                                    name,email,password,
                                    place:area,
                                    imgurl:x,
                                    userid:data.user.uid
                                    ,
                                    created_at: create
                                };
                                Database.user_Auth.doc(data.user.uid).set(userobj);
                                dispatch({
                                        type: Type_Cheker.Auth_Data
                                    })
                               
                            })
                        }
                        dispatch({
                            type: Type_Cheker.Auth_Data
                        })
                    }else{
                        const area=place===''?"india":place;
                        const data = await Auth.createUserWithEmailAndPassword(email, password);
                        const names = new Date()
                        const create = names.toLocaleString();
                        const userobj = {
                            name, email, password,
                            imgurl: "lol",
                            place:area,
                            userid: data.user.uid
                            ,
                            created_at: create
                        };
                       
                        Database.user_Auth.doc(data.user.uid).set(userobj).then((x)=>{
                            dispatch({
                                type: Type_Cheker.Auth_Data
                            })
                        });
                    }
                }

                // const names = new Date()
                // const create = names.toLocaleString()

                // 
                // 


                // 
            } catch (error) {

                dispatch({
                    type: Type_Cheker.Auth_Error,
                    payload: error.message
                })
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN