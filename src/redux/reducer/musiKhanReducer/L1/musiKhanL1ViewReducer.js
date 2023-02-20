let initialState = {
    L1TokenSymbol: "",
    L1TokenAddress: "",
    L2TokenAddressUseL1: "",
    L1Contract: {},
    L1TokenList: "",
    api_Status: false,
};
const musiKhanL1ViewReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_L1_TOKEN_INFO_TOMODAL":
            return {
                ...state,
                L1TokenSymbol: payload.L1TokenSymbol,
                L1TokenAddress: payload.L1TokenAddress,
                L2TokenAddressUseL1: payload.L2TokenAddressUseL1,
            };
        case "L1_TOKEN_CONTRACT":
            return {
                ...state,
                L1Contract: payload.L1Contract,
            };

        case "L1_TOKEN_LIST_TOBACK":
            return {
                ...state,
                L1TokenList: payload.L1TokenList,
            };
        case "API_STATUS":
            return {
                ...state,
                api_Status: payload,
            };
        default:
            return { ...state };
    }
};

export default musiKhanL1ViewReducer;
