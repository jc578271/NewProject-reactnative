import {RawAuth} from "../types";
import {store} from "../store";
import {login} from "../reducers";

export const loginAction = (user: RawAuth) => {
    return store.dispatch(login(user))
}