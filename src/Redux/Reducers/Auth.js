import * as Type_Checker from "../Action/Typo";
const initial = {
  loading: false,
  data: "",
  err: "",
  user:null
};
const Auth_Reducer = (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case Type_Checker.Auth_Loading:
      return {
        ...state,
        loading: true,
      };
    case Type_Checker.Auth_Data:
      return {
        ...state,
        data: "login success",
        loading: false,
      };
    case Type_Checker.Auth_Error:
      return {
        ...state,
        data:'',
        loading: false,
        err: payload,
      };
    case Type_Checker.Auth_Signout:
      return {
        ...state,
        data: "user signout",
        loading: false,
      };
      case "Exist":
        return{
        ...state,
        loading:false,
        err:'',
        user:payload
      }

    default:
      return state;
  }
};

export default Auth_Reducer;
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN