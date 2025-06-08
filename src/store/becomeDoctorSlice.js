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

    },


})

export const { togleCard } = doctorCardSlice.actions;
export default doctorCardSlice.reducer;