const initialState = {
    L2SwapTokenList: [],
    L2SwapName: "",
    L2SwapSymbol: "",
    L2SwapExistTokenCa: "",
    L2SwapTokenCa: "",
    L2SwapContract: {},
    L2_Swap_Api_Status: false,
};

const L2SwapViewReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_SWAP_TOKENLIST_TOBACK":
            return {
                ...state,
                L2SwapTokenList: payload.L2SwapTokenList,
            };

        case "L2_SWAP_VIEW":
            return {
                ...state,
                L2SwapName: payload.L2SwapName,
                L2SwapSymbol: payload.L2SwapSymbol,
                L2SwapExistTokenCa: payload.L2SwapExistTokenCa,
                L2SwapTokenCa: payload.L2SwapTokenCa,
            };

        case "L2_SWAP_TOKEN_CONTRACT":
            return {
                ...state,
                L2SwapContract: payload.L2SwapContract,
            };

        case "L2_SWAP_API_STATUS":
            return {
                ...state,
                L2_Swap_Api_Status: payload,
            };

        default:
            return { ...state };
    }
};

export default L2SwapViewReducer;
