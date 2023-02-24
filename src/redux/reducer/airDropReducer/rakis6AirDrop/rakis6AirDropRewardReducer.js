let initialState = {
    rakis6UnClaimedReward: "",
    rakis6UnClaimedRewardToEth: "",
    rakis6TotalRewardReceived: "",
    rakis6TotalRewardReceivedToEth: "",
    rakis6TotalRewardAmount: "",
};

function rakis6AirDropRewardReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "RAKIS6_REWARD_VIEW":
            return {
                ...state,
                rakis6UnClaimedReward: payload.rakis6UnClaimedReward,
                rakis6UnClaimedRewardToEth: payload.rakis6UnClaimedRewardToEth,
                rakis6TotalRewardReceived: payload.rakis6TotalRewardReceived,
                rakis6TotalRewardReceivedToEth: payload.rakis6TotalRewardReceivedToEth,
                rakis6TotalRewardAmount: payload.rakis6TotalRewardAmount,
            };
        default:
            return { ...state };
    }
}

export default rakis6AirDropRewardReducer;
