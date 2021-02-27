import {createStore} from "redux";
import reducer from './reducer'

const store = createStore(reducer);

export interface RootState {
    planVersion: number,
    profileVersion: number,
    planPendingVersion: number,
    equipmentVersion: number,
    loggedIn: boolean,
    hasPaymentVersion: number,
    isEditingEmail: boolean,
    isEditingAddresses: boolean,
    isEditingUsernamePassword: boolean
}

export default store;
