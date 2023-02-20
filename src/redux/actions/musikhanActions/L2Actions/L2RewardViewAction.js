import Web3 from "web3";

import { MusikhanStakingContract } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingContract } from "../../../../config/MusikhanConfigTest";

function L2RewardViewAct(
    rewardTokenName,
    rewardTokenSymbol,
    rewardUnClaimedReward,
    rewardClaimedReward,
    rewardTokenAmount,
    rewardTokenCa,
    rewardTimeOfLastUpdate
) {
    return async (dispatch) => {
        try {
            const rewardTokenNameToModalApi = rewardTokenName;
            const rewardTokenSymbolToModalApi = rewardTokenSymbol;

            const rewardUnClaimedRewardToModalApi = rewardUnClaimedReward;

            const rewardClaimedRewardToModalApi = rewardClaimedReward;

            const rewardTokenAmountToModalApi = rewardTokenAmount;

            const rewardTokenCaToModalApi = rewardTokenCa;
            const rewardListTimeToModalApi = rewardTimeOfLastUpdate;

            const rewardUnClaimedRewardToModal = Web3.utils.fromWei(String(rewardUnClaimedRewardToModalApi), "ether");
            const rewardClaimedRewardToModal = Web3.utils.fromWei(String(rewardClaimedRewardToModalApi), "ether");
            const hanTokenPerLpTokenApi = await MusikhanStakingContract.methods.hanTokenPerLpToken().call();

            dispatch({
                type: "L2_REWARD_TOKEN_INFO_VIEW",
                payload: {
                    rewardTokenName: rewardTokenNameToModalApi,
                    rewardTokenSymbol: rewardTokenSymbolToModalApi,
                    rewardUnClaimedReward: rewardUnClaimedRewardToModal,
                    rewardClaimedReward: rewardClaimedRewardToModal,
                    rewardTokenAmount: rewardTokenAmountToModalApi,
                    rewardTokenCa: rewardTokenCaToModalApi,
                    rewardListTime: rewardListTimeToModalApi,
                    hanTokenPerLpToken: hanTokenPerLpTokenApi,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2RewardViewAction = { L2RewardViewAct };
