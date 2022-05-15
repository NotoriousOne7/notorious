import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching = true;
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        logoutStart:(state)=>{
            state.isFetching = true;
        },
        logoutSuccess:(state)=>{
            state.isFetching = false;
            state.currentUser = null;
        },
        logoutFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        registerStart:(state)=>{
            state.isFetching = true;
        },
        registerSuccess:(state)=>{
            state.isFetching = false;
        },
        registerFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        updateUserStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess:(state, action)=>{
            state.isFetching = false;
        },
        updateUserFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure, registerStart, registerSuccess, registerFailure, updateUserFailure, updateUserStart, updateUserSuccess} = userSlice.actions
export default userSlice.reducer;