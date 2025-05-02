import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlist.js";
import searchReducer from "./searchSlice.js";
import loginAlertReducer from "./loginAlertSlice.js";
import userSliceReducer from "./getUserSlice.js"





export const store = configureStore(

    {
        reducer: {
            getWishlist: wishlistReducer,
            search: searchReducer,
            loginAlert: loginAlertReducer,
            getUser: userSliceReducer
        },
    }


)