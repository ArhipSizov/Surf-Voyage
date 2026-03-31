import { createSlice } from "@reduxjs/toolkit";

import type {allDataRests} from "../fbAllData";

const sliceRests = createSlice({
    name: 'rests',
    initialState:{
        rests:[]
    },
    reducers:{
        addRests(state:allDataRests, action) {
            state.rests.push({
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                img: action.payload.img,
                where: action.payload.where,
                long: action.payload.long,
                cost: action.payload.cost,
            })
        },
    }
})

export const {addRests} = sliceRests.actions

export default sliceRests.reducer