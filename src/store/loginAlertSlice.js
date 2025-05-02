
import { createSlice } from '@reduxjs/toolkit';

const loginAlertSlice = createSlice({

    name: "loginAlert",

    initialState: {
        isLoginAlertOpen: false
    },


    reducers: {

        openLoginAlert: (state) => {

            state.isLoginAlertOpen = true
        },
        closeLoginAlert: (state) => {

            state.isLoginAlertOpen = false
        }

    }


})


export const { openLoginAlert, closeLoginAlert } = loginAlertSlice.actions;
export default loginAlertSlice.reducer;