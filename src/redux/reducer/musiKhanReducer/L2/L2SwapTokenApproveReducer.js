const initialState = {
    successL2SwapTokenApprove: false,
};

const L2SwapTokenApproveReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_SWAP_TOKEN_APRROVE_SUCCESS":
            return {
                ...state,
                successL2SwapTokenApprove: payload.successL2SwapTokenApprove,
            };
        default:
            return { ...state };
    }
};

export default L2SwapTokenApproveReducer;
