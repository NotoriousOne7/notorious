import { loginFailure, loginStart, loginSuccess, logoutStart, logoutSuccess, logoutFailure,registerStart,registerSuccess,registerFailure, updateUserStart, updateUserSuccess, updateUserFailure} from "./userRedux"
import { userRequest, publicRequest } from "../requestMethods"
import { getOrderFailure, getOrderStart, getOrderSuccess } from "./orderRedux";

export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
}
export const logout = async (dispatch)=>{
    dispatch(logoutStart());
    try{
        const res = await publicRequest.delete("/auth/logout");
        dispatch(logoutSuccess());
    }catch(err){
        dispatch(logoutFailure());
    }
}
export const register = async (dispatch, user)=>{
    dispatch(registerStart());
    try{
        const res = await publicRequest.post("/auth/register", user);
        dispatch(registerSuccess());
    }catch(err){
        dispatch(registerFailure());
    }
}
export const addOrder = async (order) => {
    try {
      const res = await publicRequest.post(`/orders`, order);
    } catch (err) {
    }
  };
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const getOrder = async (dispatch, id) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get(`/orders/find/${id}`);
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};