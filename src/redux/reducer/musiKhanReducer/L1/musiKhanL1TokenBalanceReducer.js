const initialState = {
    L1TokenBalanceOf: "",
};

const musiKhanL1TokenBalanceReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L1_TOKEN_BALANCE_SUCCESS":
            return {
                ...state,
                L1TokenBalanceOf: payload.L1TokenBalanceOf,
            };

        default:
            return { ...state };
    }
};

export default musiKhanL1TokenBalanceReducer;
