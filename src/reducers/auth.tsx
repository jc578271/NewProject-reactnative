import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RawAuth} from "../types";

const initAuth: RawAuth = { userId: "", username: "", career: "" }

export const auth = createSlice({
    name: "authReducer",
    initialState: initAuth,
    reducers: {
        login: (state, payload: PayloadAction<RawAuth>) => {
            return { ...state, ...payload.payload }
        }
    }
})

export const { login } = auth.actions
