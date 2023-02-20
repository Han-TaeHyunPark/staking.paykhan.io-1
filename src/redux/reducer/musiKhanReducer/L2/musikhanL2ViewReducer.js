const initialState = {
    L2Contract: {},
    deposit_Api_Status: false,
    L2DepositTokenSymbol: "",
    L2DepositTokenCa: "",
    L2DepositBalance: "",
    L2WithdrawTokenSymbol: "",
    L2WithdrawAmountStaked: "",
    L2WithdrawTokenCa: "",
    withdrawTokenList: [],
    rewardTokenList: [],
};

const musikhanL2ViewReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_TOKEN_CONTRACT":
            return {
                ...state,
                L2Contract: payload.L2Contract,
            };

        case "DEPOSIT_API_STATUS":
            return {
                ...state,
                deposit_Api_Status: payload,
            };

        case "GET_L2_TOKEN_INFO_VIEW":
            return {
                ...state,
                L2DepositTokenSymbol: payload.L2DepositTokenSymbol,
                L2DepositTokenCa: payload.L2DepositTokenCa,
            };

        case "L2_DEPOSIT_BALANCE":
            return {
                ...state,
                L2DepositBalance: payload.L2DepositBalance,
            };

        case "L2_WITHDRAW_TOKEN_LIST":
            return {
                ...state,
                withdrawTokenList: payload.withdrawTokenList,
            };
        case "L2_WITHDRAW_TOKEN_INFO":
            return {
                ...state,
                L2WithdrawTokenSymbol: payload.L2WithdrawTokenSymbol,
                L2WithdrawAmountStaked: payload.L2WithdrawAmountStaked,
                L2WithdrawTokenCa: payload.L2WithdrawTokenCa,
            };

        case "L2_REWARD_TOKEN_LIST":
            return {
                ...state,
                rewardTokenList: payload.rewardTokenList,
            };

        default:
            return { ...state };
    }
};

export default musikhanL2ViewReducer;
