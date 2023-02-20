const initialState = {
    getMyMintingTokenList: "",
    l2DepositTokenList: [],
};

const musikhanCaViewReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_MY_MINTING_TOKENCA":
            return {
                ...state,
                getMyMintingTokenList: payload.getMyMintingTokenList,
                l2DepositTokenList: payload.l2DepositTokenList,
            };
        default:
            return { ...state };
    }
};

export default musikhanCaViewReducer;
