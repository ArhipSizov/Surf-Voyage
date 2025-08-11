import { createSlice } from "@reduxjs/toolkit";

import type allData from "../fbAllData";

const slice = createSlice({
    name: 'user',
    initialState:{
        user:[]
    },
    reducers:{
        addUser(state:allData, action) {
            state.user.push({
                id: new Date().toISOString(),
                email: action.payload.email,
                password: action.payload.pasvord,
                name: action.payload.name,
                number: action.payload.number,
                key: action.payload.key,
            })
        },
    }
})

export const {addUser} = slice.actions

export default slice.reducer