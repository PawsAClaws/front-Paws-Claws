import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const getUserData = createAsyncThunk("users/fetchUsers", async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get("https://backend-online-courses.onrender.com/api/v1/user", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return res?.data?.data;

})





const userSlice = createSlice({


    name: "users",
    initialState: {
        user: [],
        isLoading: false,
        isError: false,

    },

    extraReducers: builder => {


        builder
            .addCase(getUserData.pending, state => {
                state.isLoading = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            });

    }


})

export default userSlice.reducer
