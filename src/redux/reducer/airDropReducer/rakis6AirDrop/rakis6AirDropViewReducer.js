let initialState = {
    rakis6StakingBalanceOf: "",
    canStakedQuatoAmount: "",
    allowance: "",
    successRakis6Apporve: false,
    stakerDataArray: "",
    rakis6WithdrawAmount: "",
    withdrawIndex: "",
    HanQuantityLpQuantityPerYear1HanValue: "",
};

function rakis6AirDropViewReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "RAKIS6_AIRDROP_VIEW":
            return {
                ...state,
                rakis6StakingBalanceOf: payload.rakis6StakingBalanceOf,
                canStakedQuatoAmount: payload.canStakedQuatoAmount,
                allowance: payload.allowance,
            };

        case "RAKIS6_AIRDROP_APPROVE_SUCCESS":
            return {
                ...state,
                successRakis6Apporve: payload.successRakis6Apporve,
            };

        case "WITHDRAW_TOKEN_LIST":
            return {
                ...state,
                stakerDataArray: payload.stakerDataArray,
            };

        case "WITHDRAW_VIEW_SUCCESS":
            return {
                ...state,
                rakis6WithdrawAmount: payload.rakis6WithdrawAmount,
                withdrawIndex: payload.withdrawIndex,
            };

        case "RAKIS6_AIRDROP_APR":
            return {
                ...state,
                HanQuantityLpQuantityPerYear1HanValue: payload.HanQuantityLpQuantityPerYear1HanValue,
            };

        default:
            return { ...state };
    }
}

export default rakis6AirDropViewReducer;
