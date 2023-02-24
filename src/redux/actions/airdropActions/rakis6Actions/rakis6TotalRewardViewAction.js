import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6ConfigTest";
import Web3 from "web3";

function rakis6TotalRewardViewAct(account) {
    return async (dispatch) => {
        try {
            const totalRewardViewApi = await PrivateStakingContract.methods.rewardView(account).call();
            const totalRewardView = Web3.utils.fromWei(String(totalRewardViewApi), "ether");

            dispatch({
                type: "RAKIS6_AIRDROP_TOTAL_REWARD_VIEW",
                payload: {
                    totalRewardView: totalRewardView,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const rakis6TotalRewardViewAction = { rakis6TotalRewardViewAct };
