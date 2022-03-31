import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {auth, collection, contact} from '../reducers';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  contacts: contact.reducer,
  collections: collection.reducer,
  auth: auth.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const useContacts = () => {
  return useSelector((state: RootState) => state.contacts);
};
export const useCollections = () => {
  return useSelector((state: RootState) => state.collections);
};

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};
