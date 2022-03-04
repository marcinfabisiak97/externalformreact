import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        value: {
            diameter: "",
            name: "",
            preparation_time: "",
            type: "",
            no_of_slices: "",
            spiciness_scale: "",
            slices_of_bread: "",
            message: ""
        }
    },
    reducers: {
        change: (state, action) => {
            state.value = action.payload;
        },
    }
})
export const { change } = orderSlice.actions;
export default orderSlice.reducer;