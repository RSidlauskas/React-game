import {createSlice} from "@reduxjs/toolkit";

export const itemsForSale = createSlice({
    name: "itemsForSale",
    initialState: {
        value: {
            race: "",
            items: []
        },
    },
    reducers: {
        chooseRace: (state, action) => {
            state.value.race = action.payload
        }
    }
})

export const {chooseRace} = player.actions

export default player.reducer
