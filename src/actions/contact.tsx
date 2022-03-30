import {RawContact} from "../types";
import {store} from "../store";
import {deleteContact, setQueryContact, updateContact} from "../reducers";

export const updateContactAction = (contact: RawContact) => {
    return store.dispatch(updateContact(contact))
}

export const deleteContactAction = (id: string) => {
    return store.dispatch(deleteContact({id}))
}

// export const setQueryContactAction = ((searchInput: string, list: string[]) => {
//     return store.dispatch(setQueryContact({ searchInput, list }))
// })