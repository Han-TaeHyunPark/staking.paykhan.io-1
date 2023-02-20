const initialState = {
    successL1TokenApprove: false,
};

const musiKhanL1TokenApproveReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L1_TOKEN_APRROVE_SUCCESS":
            return {
                ...state,
                successL1TokenApprove: payload.successL1TokenApprove,
            };

        default:
            return { ...state };
    }
};

export default musiKhanL1TokenApproveReducer;
