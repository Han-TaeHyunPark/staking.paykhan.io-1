const initialState = {
    getL1TokenInfo: [],
    mintL2TokenName: "",
    mintL2TokenSymbol: "",
    getL1TokenAmount: "",
    getL1TokenL1Ca: "",
    getL1TokenL2Ca: "",
};

const L2BridgeViewReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_BRIDGE_L1_TOKENINFO":
            return {
                ...state,
                getL1TokenInfo: payload.getL1TokenInfo,
                mintL2TokenName: payload.mintL2TokenName,
                mintL2TokenSymbol: payload.mintL2TokenSymbol,
                getL1TokenAmount: payload.getL1TokenAmount,
                getL1TokenL1Ca: payload.getL1TokenL1Ca,
                getL1TokenL2Ca: payload.getL1TokenL2Ca,
            };
        default:
            return { ...state };
    }
};

export default L2BridgeViewReducer;
