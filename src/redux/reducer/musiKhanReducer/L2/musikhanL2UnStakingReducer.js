const initialState = {
    successL2Withdraw: false,
};

const musikhanL2UnStakingReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_WITHDRAW_SUCCESS":
            return {
                ...state,
                successL2Withdraw: payload.successL2Withdraw,
            };
        default:
            return { ...state };
    }
};

export default musikhanL2UnStakingReducer;
