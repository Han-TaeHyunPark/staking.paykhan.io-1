let initialState = {
    successAirDropClaim: false,
    canClaim: false,
    claimed: false,
    getProofToBack: "",
    getAmountToBack: "",
    claimDayDate: "",
    claimHoursDate: "",
    claimMinDate: "",
};

function airDropReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "SUCCESS_AIRDROP_CLAIM":
            return {
                ...state,
                successAirDropClaim: payload.successAirDropClaim,
            };

        case "GET_AIRDROP_VIEW_SUCCESS":
            return {
                ...state,
                canClaim: payload.canClaim,
                getProofToBack: payload.getProofToBack,
                getAmountToBack: payload.getAmountToBack,
            };

        case "GET_AIRDROP_CLAIMED_SUCCESS":
            return {
                ...state,
                claimed: payload.claimed,
            };

        case "GET_AIRDROP_SUCCESS_TIMESTAMP":
            return {
                ...state,
                claimDayDate: payload.claimDayDate,
                claimHoursDate: payload.claimHoursDate,
                claimMinDate: payload.claimMinDate,
            };

        default:
            return { ...state };
    }
}

export default airDropReducer;
