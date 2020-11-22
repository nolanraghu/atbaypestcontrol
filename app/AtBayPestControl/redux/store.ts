import {createStore} from "redux";
import reducer from './reducer'

const store = createStore(reducer);

export interface RootState {
    planVersion: number,
    planPendingVersion: number
}

export default store;