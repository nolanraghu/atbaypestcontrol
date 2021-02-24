const CHANGE_PLAN:string = 'CHANGE_PLAN';
const CHANGE_PENDING:string = 'CHANGE_PENDING';
const EQUIPMENT_PENDING:string = 'EQUIPMENT_PENDING';
const LOG_IN:string = 'LOG_IN';
const LOG_OUT:string = 'LOG_OUT';
const CHANGE_PROFILE:string = 'CHANGE_PROFILE';
const CHANGE_PAYMENT:string = 'CHANGE_PAYMENT';
const START_EDITING_EMAIL:string = 'START_EDITING_EMAIL';
const END_EDITING_EMAIL:string = 'END_EDITING_EMAIL';
const START_EDITING_ADDRESS:string = 'START_EDITING_ADDRESS';
const END_EDITING_ADDRESS:string = 'END_EDITING_ADDRESS';
const START_EDITING_USERNAME_PASSWORD:string = 'START_EDITING_USERNAME_PASSWORD';
const END_EDITING_USERNAME_PASSWORD:string = 'END_EDITING_USERNAME_PASSWORD';

// This will change any screen that doesn't care what's pending, and also any screen that is pending
const changePlan = () => ({type: CHANGE_PLAN});

//This will hopefully change the profile

const changeProfile = () => ({type: CHANGE_PROFILE});

// This will change any screen that cares about the infestations or equipment pending or on the plan
const changePending = () => ({type: CHANGE_PENDING});

// This is for if you are just changing the equipment that is pending. We need it so you can't see the screen change
// as you leave the bug info popup...
const justEquipmentPending = () => ({type: EQUIPMENT_PENDING});

// This is for if you might be changing if you have a payment or not
const changePayment = () => ({type:CHANGE_PAYMENT});

const logIn = () => ({type: LOG_IN});
const logOut = () => ({type: LOG_OUT});

const startEditingEmail = () => ({type:START_EDITING_EMAIL})
const endEditingEmail = () => ({type:END_EDITING_EMAIL})

const startEditingAddress = () => ({type:START_EDITING_ADDRESS})
const endEditingAddress = () => ({type:END_EDITING_ADDRESS})

const startEditingUsernamePassword = () => ({type:START_EDITING_USERNAME_PASSWORD})
const endEditingUsernamePassword = () => ({type:END_EDITING_USERNAME_PASSWORD})

export {
    CHANGE_PLAN,
    CHANGE_PROFILE,
    CHANGE_PENDING,
    EQUIPMENT_PENDING,
    LOG_IN,
    LOG_OUT,
    CHANGE_PAYMENT,
    START_EDITING_EMAIL,
    END_EDITING_EMAIL,
    START_EDITING_ADDRESS,
    END_EDITING_ADDRESS,
    START_EDITING_USERNAME_PASSWORD,
    END_EDITING_USERNAME_PASSWORD,
    changePlan,
    changePending,
    justEquipmentPending,
    logIn,
    logOut,
    changeProfile,
    changePayment,
    startEditingEmail,
    endEditingEmail,
    startEditingAddress,
    endEditingAddress,
    startEditingUsernamePassword,
    endEditingUsernamePassword
}
