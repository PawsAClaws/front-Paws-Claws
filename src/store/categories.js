// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import axios from "axios";


// const API_URL = `https://backend-online-courses.onrender.com/api/v1/category`;

// const token = localStorage.getItem("token");



// export const fetchCategories = createAsyncThunk(
//     "categories/fetchCategories",
//     async () => {
//         const response = await axios.get(API_URL, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data.data;
//     }
// );




// let initialState = {

//     categories: [],
//     loading: false,
//     error: null,

// }


// export const categoriesSlice = createSlice({


//     name: "categories",
//     initialState,

//     reducers: {},

//     extraReducers: (builder) => {

//         builder.addCase(fetchCategories.pending, (state) => {

//             state.loading = true;
//             state.error = null;

//         }).addCase(fetchCategories.fulfilled, (state, action) => {
//             state.loading = false;
//             state.categories = action.payload;
//         }).addCase(fetchCategories.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//         });


//     }

// })



// export const categoriesReducer = categoriesSlice.reducer

// export const categoriesAction = categoriesSlice.actions