import {createStore} from "redux";
import reducer from './reducer'

const store = createStore(reducer);

export interface RootState {
    planVersion: number,
    profileVersion: number,
    planPendingVersion: number,
    equipmentVersion: number,
    loggedIn: boolean
}

export default store;
