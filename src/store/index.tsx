import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import logger from "redux-logger"
import {auth, collection, contact} from "../reducers"

export const rootReducer = combineReducers({
    contacts: contact.reducer,
    collections: collection.reducer,
    auth: auth.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({ 
    reducer: rootReducer
})

export const useContacts = () => {
    return useSelector((state:RootState) => state.contacts)
}
export const useCollections = () => {
    return useSelector((state:RootState) => state.collections)
}

export const useAuth = () => {
    return useSelector((state: RootState) => state.auth)
}


