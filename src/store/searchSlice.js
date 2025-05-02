import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    term: "",
    results: []
}





const searchSlice = createSlice({

    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.term = action.payload
        },
        setSearchResults: (state, action) => {
            state.results = action.payload
        },
        clearSearch: (state) => {
            state.term = ""
            state.results = []
        }
    }
})


export const { setSearchTerm, setSearchResults, clearSearch } = searchSlice.actions

export default searchSlice.reducer







