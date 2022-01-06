import React, { useState } from 'react'
import "./Forgot.scss";
import Registerimg from '../../Images/Login/register1.jpg';
import { Auth } from "../../Firebase/DataBase";
import Loader from "../../Loader";
import Err from "../../Err";
import {useNavigate} from "react-router-dom"
export const Forgot = () => {
    const [email, setemail] = useState('');
    const [check, setcheck] = useState(false);
    const [load, setload] = useState(false);
    const [err, seterr] = useState('');
     const navigate=useNavigate();
    const SubmitDetails = () => {
        const emails = email;
        try {
            setload(true);
        Auth.sendPasswordResetEmail(emails).then((x) => {
                
                setload(false)
                navigate("/")
            })
        } catch(error) {
            seterr(error.message);
            setTimeout(() => {
                seterr('')
            }, 2000);
        }

    }
    return (
        <div className="Forgot">
            {load && <Loader />}
            {err !== '' && <Err ename={this.state.err} />}
            <div className="Forgot-controller">
                <div className="Forgot-row">
                    <div className="Forgot-left">
                        <div className="Left-parent">
                            <div className="Form-img">
                                <img src={Registerimg} alt="User form" />
                            </div>
                        </div>
                    </div>
                    <div className="Forgot-Right">
                        <div className="Meter">
                            <div className="Right-Parent">
                                <div className="Parent-title">
                                    <h1 className="text">
                                        Fortgot Password

                                    </h1>
                                </div>
                                <div className="Parent-form">

                                    <div className="Name-form Parent-child">
                                        <div className="Name-icon">
                                            <i class="far fa-envelope"></i>
                                        </div>
                                        <div className="Name-input">
                                            <input placeholder="your email" value={email} onChange={(e) => { setemail(e.target.value) }} type="email" name="email" id="email" />
                                        </div>
                                    </div>

                                    <div className="Check-form">
                                        <div className="Check-me">
                                            <input type="checkbox" onChange={(e) => { setcheck(e.target.checked) }} name="check" id="check" />
                                        </div>
                                        <div className="form-condition">
                                            <span className="text">accept term and condition</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="Submit-form">
                                    <div className="submitTo-click" onClick={
                                        check ? SubmitDetails : undefined}>
                                        forgot password

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

export default Forgot
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN