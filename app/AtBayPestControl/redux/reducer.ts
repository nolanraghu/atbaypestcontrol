import {CHANGE_PLAN, CHANGE_PENDING, EQUIPMENT_PENDING, LOG_IN, LOG_OUT, CHANGE_PROFILE} from "./action";

const initialState = {
    planVersion: 0,
    planPendingVersion: 0,
    equipmentVersion: 0,
    profileVersion:0,
    loggedIn: false
};

const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case CHANGE_PLAN:
            return {
                ...state,
                planVersion: state.planVersion + 1,
                planPendingVersion: state.planPendingVersion + 1
            };
        case CHANGE_PENDING:
            return {
                ...state,
                planPendingVersion: state.planPendingVersion + 1
            };
        case EQUIPMENT_PENDING:
            return {
                ...state,
                planPendingVersion: state.planPendingVersion + 1,
                equipmentVersion: state.equipmentVersion + 1
            };
        case LOG_IN:
            return {
                ...state,
                loggedIn: true
            }
        case LOG_OUT:
            return {
                ...state,
                loggedIn: false
            }
        case CHANGE_PROFILE:
            return {
                ...state,
                profileVersion: state.profileVersion+1
            }
        default:
            return state
    }
};

export default reducer
