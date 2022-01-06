import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import "./index.scss";
import Store from "./Redux/Store"
import { Provider } from 'react-redux';
const ParentElement=document.getElementById("root");

ReactDOM.render(
   <Provider store={Store}>
    <App/>
   </Provider>
    ,
    ParentElement
)
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN