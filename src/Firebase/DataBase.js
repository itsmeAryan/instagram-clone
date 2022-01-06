import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
const key=process.env.REACT_APP_APIKEY;
const auths=process.env.REACT_APP_AUTH_DOMAINauthDomain;
const porjetc=process.env.REACT_APP_PROJETC_IDprojectId;
const store=process.env.REACT_APP_STORAGE_BUCKET;
const messge=process.env.REACT_APP_MESSAGE_SENDER;
const appi=process.env.REACT_APP_APP_ID;


const firebaseConfig = {
  apiKey: key,
  authDomain: auths,
  projectId: porjetc,
  storageBucket:store,
  messagingSenderId: messge,
  appId:appi
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export const Auth = firebase.auth();
export const Storage = firebase.storage();
export const Database = {
  user_Auth: firestore.collection("userAuth"),
  getTime: firebase.firestore.FieldValue.serverTimestamp,
  user_Post: firestore.collection("userPost")
}
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN