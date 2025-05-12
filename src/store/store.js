import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlist.js";
import searchReducer from "./searchSlice.js";
import loginAlertReducer from "./loginAlertSlice.js";
import userSliceReducer from "./getUserSlice.js"
import cardReducer from "./becomeDoctorSlice.js"
import notificationReducer from "./notificationsSlice.js";





export const store = configureStore(

    {
        reducer: {
            getWishlist: wishlistReducer,
            search: searchReducer,
            loginAlert: loginAlertReducer,
            getUser: userSliceReducer,
            card: cardReducer,
            notifications: notificationReducer,

        },
    }


)