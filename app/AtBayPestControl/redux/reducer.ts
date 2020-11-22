import {CHANGE_PLAN, CHANGE_PENDING, EQUIPMENT_PENDING} from "./action";

const initialState = {
    planVersion: 0,
    planPendingVersion: 0,
    equipmentVersion: 0
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
        default:
            return state
    }
};

export default reducer