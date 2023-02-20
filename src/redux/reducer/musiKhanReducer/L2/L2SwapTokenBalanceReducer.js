const initialState = {};

const L2SwapTokenBalanceReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_SWAP_TOKEN_BALANCE":
            return {
                ...state,
                L2SwapTokenBalance: payload.L2SwapTokenBalance,
            };

        default:
            return { ...state };
    }
};

export default L2SwapTokenBalanceReducer;
