const initialState = {
    rewardTokenName: "",
    rewardTokenSymbol: "",
    rewardUnClaimedReward: "",
    rewardClaimedReward: "",
    rewardTokenAmount: "",
    rewardTokenCa: "",
    musiResultValue: "",
    rewardListTime: "",
    totalRewardToken: "",
    hanTokenPerLpToken: "",
};

const musikhanL2RewardReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "L2_REWARD_TOKEN_INFO_VIEW":
            return {
                ...state,
                rewardTokenName: payload.rewardTokenName,
                rewardTokenSymbol: payload.rewardTokenSymbol,
                rewardUnClaimedReward: payload.rewardUnClaimedReward,
                rewardClaimedReward: payload.rewardClaimedReward,
                rewardTokenAmount: payload.rewardTokenAmount,
                rewardTokenCa: payload.rewardTokenCa,
                rewardListTime: payload.rewardListTime,
                hanTokenPerLpToken: payload.hanTokenPerLpToken,
            };

        case "L2_REWARD_RESULT_VIEW":
            return {
                ...state,
                musiResultValue: payload.musiResultValue,
            };

        case "L2_TOTAL_REWARD_TOKEN":
            return {
                ...state,
                totalRewardToken: payload.totalRewardToken,
            };
        default:
            return { ...state };
    }
};

export default musikhanL2RewardReducer;
