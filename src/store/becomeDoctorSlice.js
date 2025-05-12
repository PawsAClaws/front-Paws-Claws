import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showCard: false,
};


const doctorCardSlice = createSlice({

    name: "doctorCard",

    initialState,

    reducers: {


        togleCard: (state) => {

            state.showCard = !state.showCard
        },

        // showCard: (state) => {
        //     state.showCard = true;
        // },

        // hideCard: (state) => {
        //     state.showCard = false;
        // },

    },


})

export const { togleCard } = doctorCardSlice.actions;
export default doctorCardSlice.reducer;