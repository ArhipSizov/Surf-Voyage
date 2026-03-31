import { createSlice } from "@reduxjs/toolkit";

import type { allDataUser } from "../fbAllData";

const sliceUser = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    addUser(state: allDataUser, action) {
      state.user.push({
        id: new Date().toISOString(),
        email: action.payload.email,
        password: action.payload.pasvord,
        name: action.payload.name,
        surname: action.payload.surname,
        city: action.payload.city,
        country: action.payload.country,
        number: action.payload.number,
        key: action.payload.key,
      });
    },
  },
});

export const { addUser } = sliceUser.actions;

export default sliceUser.reducer;
