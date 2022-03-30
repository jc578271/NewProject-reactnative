import {RawCollection} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initCollections: RawCollection[] = []
export const collection = createSlice({
    name: "collectionReducer",
    initialState: initCollections,
    reducers: {
        updateCollection: (state, payload: PayloadAction<RawCollection[]>) => {
            const _arr = [...state]
            const _arr2 = [...payload.payload]
            let result = {}
            _arr.forEach(item => result[item.id] = item)
            _arr2.forEach(item => result[item.id] = item)

            return Object.values(result)
        },
        deleteCollection: (state, payload: PayloadAction<{id: string}>) => {
            return state.filter(item=>item?.id != payload.payload.id)
        }
    }
})

export const { updateCollection, deleteCollection } = collection.actions