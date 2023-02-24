let initialState = {
    totalRewardView: "",
};

function rakis6AirDropTotalRewardReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "RAKIS6_AIRDROP_TOTAL_REWARD_VIEW":
            return {
                ...state,
                totalRewardView: payload.totalRewardView,
            };
        default:
            return {
                ...state,
            };
    }
}

export default rakis6AirDropTotalRewardReducer;
