import React, { useEffect, useState } from 'react'
import Registerimg from '../../Images/Login/register1.jpg';
import { Link,useNavigate } from "react-router-dom";
import "./Login.scss";
import Google from '../../Images/Login/google.png'
import Facebook from '../../Images/Login/facebook.png'
import { Auth } from "../../Firebase/DataBase"
import { connect } from "react-redux";
import * as Type_Cheker from "../../Redux/Action/Typo";
import Loader from '../../Loader';
import Err from '../../Err';
export const Login = (props) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [check, setcheck] = useState(false);
    const navigate=useNavigate()
    useEffect(() => {
        const { loading, err, data, user } = props.Auth_Data;

        if (err) {
            seterr(err);
            setTimeout(() => {
                seterr('')
            }, 2000);
        } if (loading) {
            setloading(loading)
        } if (data === 'login success' || user !== null) {
            navigate("/home")
        }
    }, [props.Auth_Data])
        const [err, seterr] = useState('');
    const [loading, setloading] = useState(false);

    const SubmitDetails = async () => {
        
        const obj = {
            email, password

        }
        props.Auth(obj)



    }


    return (
        <div className="Login">
            {(loading && props.Auth_Data.loading) && <Loader />}
            {err && <Err ename={err} />}
            <div className="Login-controller">
                <div className="Login-row">
                    <div className="Login-left">
                        <div className="Left-parent">
                            <div className="Form-img">
                                <img src={Registerimg} alt="User form" />
                            </div>
                        </div>
                    </div>
                    <div className="Login-Right">
                        <div className="Meter">
                            <div className="Right-Parent">
                                <div className="Parent-title">
                                    <h1 className="text">
                                        Login into your account
                                    </h1>
                                </div>
                                <div className="Parent-form">
                                    <div className="Name-form Parent-child">
                                        <div className="Name-icon">
                                            <i class="far fa-envelope"></i>
                                        </div>
                                        <div className="Name-input">
                                            <input placeholder="your email" value={email} onChange={(e) => { setemail(e.target.value) }} type="email" name="name" id="name" />
                                        </div>
                                    </div>

                                    <div className="Name-form Parent-child">
                                        <div className="Name-icon">
                                            <i class="fas fa-lock"></i>
                                        </div>
                                        <div className="Name-input">
                                            <input placeholder="your password" value={password} onChange={(e) => { setpassword(e.target.value) }} type="text" name="password" id="password" />
                                        </div>
                                    </div>

                                </div>
                                <div className="Check-form">
                                    <div className="Check-me">
                                        <input type="checkbox" onChange={(e) => { setcheck(e.target.checked) }} name="check" id="check" />
                                        <span className="text">accept</span>

                                    </div>
                                    <div className="forget-pass">
                                        <span className="text">
                                            <Link to="/forgot">forgot your password?</Link>
                                        </span>
                                    </div>
                                </div>
                                <div className="Submit-form">
                                    <div className="submitTo-click" onClick={
                SubmitDetails}>
                                        Login

                                    </div>
                                </div>
                                <div className="not-user">
                                    <div className="striver">
                                        <span className="text">dont have account</span>
                                        <span className="lol-text"><Link to="/signup">register</Link></span>
                                    </div>
                                </div>
                                <div className="register-social">
                                    <div className="Sign-google">
                                        <div className="google-icon">
                                            <img src={Google} alt="google auth" />
                                        </div>
                                        <div className="google-text">
                                            <span className="text">sign in with google</span>
                                        </div>
                                    </div>
                                    <div className="Sign-google  fb">
                                        <div className="google-icon">
                                            <img alt="facebook auth" src={Facebook} />
                                        </div>
                                        <div className="google-text">
                                            <span className="text">sign in with facebook </span>
                                        </div>
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


const mapStateToProps = (state) => {
    return {
        Auth_Data: state.Auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Auth: (obj) => {
            dispatch({
                type: Type_Cheker.Auth_Loading
            });
            try {
                const { email, password } = obj;
                if (email === '' || password === '') {
                    dispatch({
                        type: Type_Cheker.Auth_Error,
                        payload: "fields cant be empty"
                    })
                } else {
                    Auth.signInWithEmailAndPassword(email, password)
                    dispatch({
                        type: Type_Cheker.Auth_Data
                    })
                }

            } catch (error) {
                dispatch({
                    type: Type_Cheker.Auth_Error,
                    payload: error.message
                })
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN