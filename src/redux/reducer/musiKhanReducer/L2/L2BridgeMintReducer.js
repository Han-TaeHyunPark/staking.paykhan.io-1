const initialState = {
    successL2Minting: false,
};

const L2BridgeMintReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_BRIDGE_MINTING_SUCCESS":
            return {
                ...state,
                successL2Minting: payload.successL2Minting,
            };
        default:
            return { ...state };
    }
};

export default L2BridgeMintReducer;
