const initialState = {
    successL2Staking: false,
};

const musikhanL2StakingReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_STAKING_SUCCESS":
            return {
                ...state,
                successL2Staking: payload.successL2Staking,
            };
        default:
            return { ...state };
    }
};

export default musikhanL2StakingReducer;
