import {store} from "../store";
import {deleteCollection, updateCollection} from "../reducers";
import {RawCollection} from "../types";

export const updateCollectionAction = (collection: RawCollection[]) => {
    return store.dispatch(updateCollection(collection))
}

export const deleteCollectionAction = (id: string) => {
    return store.dispatch(deleteCollection({ id }))
}