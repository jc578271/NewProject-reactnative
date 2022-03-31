import {RawContact} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {filterData, nonAccentVietnamese} from '../utils/helper';

const initContacts = {
  byKey: {},
  query: {all: []},
};

export const contact = createSlice({
  name: 'contactReducer',
  initialState: initContacts,
  reducers: {
    updateContact: (state, payload: PayloadAction<RawContact>) => {
      let byKey = {...state.byKey, [payload.payload.id]: payload.payload};
      let query = {...state.query, all: Object.keys(byKey)};
      // for (let key in query) {
      //     if (key!="all") {
      //         let list = query["all"].filter(id => {
      //             let { firstName, lastName, phones } = byKey[id]
      //             let fullName = firstName + " " + lastName
      //             return phones.some(item => item.trim().toLowerCase().includes(key))
      //                 || nonAccentVietnamese(fullName).trim().toLowerCase().includes(key)
      //         })
      //         query = {  ...query, [key]: list}
      //     }
      // }
      return {byKey, query};
    },
    // setQueryContact: (state, payload:PayloadAction<{searchInput:string, list: string[]}>) => {
    //     let search = payload.payload.searchInput || "all"
    //     let query = { ...state.query, [search]: payload.payload.list}
    //     return { ...state, query }
    // },
    deleteContact: (state, payload: PayloadAction<{id: string}>) => {
      let byKey = {...state.byKey};
      delete byKey[payload.payload.id];
      let query = {...state.query, all: Object.keys(byKey)};
      return {byKey, query};
    },
  },
});

export const {updateContact, deleteContact} = contact.actions;
