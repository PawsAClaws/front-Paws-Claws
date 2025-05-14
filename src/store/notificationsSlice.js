
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL, { cookies } from '../lib/api';





export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",

    async () => {

        const token = cookies.get("token");

        const response = await axios.get(`${BASE_URL}/notification`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });


        console.log(response);
        return response.data.data;
    }
);



const notificationsSlice = createSlice({

    name: 'notifications',

    initialState: {
        list: [],
        unreadCount: 0,
        loading: false,
        error: null,
    },

    reducers: {
        markAllAsRead: (state) => {
            state.list = state.list.map(n => ({ ...n, isReead: true }));
            state.unreadCount = 0;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.list = action.payload;
                state.unreadCount = action.payload.filter(n => !n.isReead).length;
                state.loading = false;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = "Failed to fetch notifications";
            });
    },
});


export const { markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;


