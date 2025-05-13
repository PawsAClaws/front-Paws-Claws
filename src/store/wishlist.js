import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL, { cookies } from "../lib/api";







export const getAllWishList = createAsyncThunk("wishlist/fetchWishlist", async () => {

    const token = cookies.get("token");

    const res = await axios.get(`${BASE_URL}/wishlist`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return res?.data?.data;
});





const wishlistSlice = createSlice({

    name: "wishlist",

    initialState: {

        items: [],
        loading: false,
        error: null,
    },

    reducers: {

        toggleItem: (state, action) => {

            const exists = state.items.find(item => item.postId === action.payload);

            if (exists) {
                state.items = state.items.filter(item => item.postId !== action.payload);
            } else {
                state.items.push({ postId: action.payload });
            }

        },
    },

    extraReducers: builder => {
        builder
            .addCase(getAllWishList.pending, state => {
                state.loading = true;
            })
            .addCase(getAllWishList.fulfilled, (state, action) => {
                state.items = action.payload;;
                state.loading = false;
            })
            .addCase(getAllWishList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },

})


export const { toggleItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;