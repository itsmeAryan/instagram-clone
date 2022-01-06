import {createStore,combineReducers,applyMiddleware} from "redux";
import Thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import Auth_Reducer from "./Reducers/Auth";
const middle=[Thunk];
const All_REducers=combineReducers({
    Auth:Auth_Reducer
});
const Store =createStore(All_REducers,composeWithDevTools(applyMiddleware(...middle)));
export default Store;
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN