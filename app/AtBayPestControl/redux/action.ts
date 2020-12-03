const CHANGE_PLAN:string = 'CHANGE_PLAN';
const CHANGE_PENDING:string = 'CHANGE_PENDING';
const EQUIPMENT_PENDING:string = 'EQUIPMENT_PENDING';
const LOG_IN:string = 'LOG_IN';
const LOG_OUT:string = 'LOG_OUT';
const CHANGE_PROFILE:string = 'CHANGE_PROFILE';

// This will change any screen that doesn't care what's pending, and also any screen that is pending
const changePlan = () => ({type: CHANGE_PLAN});

//This will hopefully change the profile

const changeProfile = () => ({type: CHANGE_PROFILE});

// This will change any screen that cares about the infestations or equipment pending or on the plan
const changePending = () => ({type: CHANGE_PENDING});

// This is for if you are just changing the equipment that is pending. We need it so you can't see the screen change
// as you leave the bug info popup...
const justEquipmentPending = () => ({type: EQUIPMENT_PENDING});

const logIn = () => ({type: LOG_IN});
const logOut = () => ({type: LOG_OUT});

export {
    CHANGE_PLAN,
    CHANGE_PROFILE,
    CHANGE_PENDING,
    EQUIPMENT_PENDING,
    LOG_IN,
    LOG_OUT,
    changePlan,
    changePending,
    justEquipmentPending,
    logIn,
    logOut,
    changeProfile,
}
