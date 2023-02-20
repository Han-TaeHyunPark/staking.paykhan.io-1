const initialState = {
    successL2TokenApprove: false,
};

const musiKhanL2TokenApproveReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_TOKEN_APPROVE_SUCCESS":
            return {
                ...state,
                successL2TokenApprove: payload.successL2TokenApprove,
            };
        default:
            return { ...state };
    }
};

export default musiKhanL2TokenApproveReducer;
