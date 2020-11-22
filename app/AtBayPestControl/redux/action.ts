const CHANGE_PLAN:string = 'CHANGE_PLAN';
const CHANGE_PENDING:string = 'CHANGE_PENDING';

// This will change any screen that doesn't care what's pending, and also any screen that is pending
const changePlan = () => ({type: CHANGE_PLAN});

// This will change any screen that cares about the infestations or equipment pending or on the plan
const changePending = () => ({type: CHANGE_PENDING});

export {
    CHANGE_PLAN,
    CHANGE_PENDING,
    changePlan,
    changePending
}