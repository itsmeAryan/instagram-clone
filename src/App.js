import React, { useState, useEffect } from 'react'
import { BrowserRouter as Browser, Routes as Switcher, Route, Navigate } from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Errorpage from './components/Auth/Errorpage';
import Forgot from './components/Auth/Forgot';
import Navbar from './components/Landing/Navbar';
import Profile from "./components/UserPRo/Profile"
import Comment from "./components/Uploads.js/Comments"
import { Auth } from "./Firebase/DataBase";
import { connect } from "react-redux";
import SignleUser from './components/Singleuser/SignleUser';
function App(props) {
    const [user, setuser] = useState(null);

    useEffect(() => {

        const data = Auth.onAuthStateChanged((s) => {
            if (user !== s) {
                setuser(s);
                props.exist(s)
            }

        });
        return () => {
            data();
        };
    }, [user]);
    return (

        <Browser>
            <Switcher>

                <Route path="*" element={<Errorpage />} />
                <Route path="/user-profile/:id" element={<SignleUser />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/home" element={user ? <Navbar id={user} /> : <Navigate to="/" />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/comment-post" element={<Comment />} />


            </Switcher>

        </Browser>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        exist: (data) => {
            dispatch({
                type: "Exist",
                payload: data,
            });
        },
    };
};
export default connect(null, mapDispatchToProps)(App);
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN