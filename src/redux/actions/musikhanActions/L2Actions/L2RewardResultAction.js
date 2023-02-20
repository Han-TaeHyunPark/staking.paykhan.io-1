import { MusikhanStakingContract } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingContract } from "../../../../config/MusikhanConfigTest";
import Web3 from "web3";

function L2RewardResultAct(rewardTimeOfLastUpdate, rewardTokenAmount) {
    return async (dispatch) => {
        try {
            const currentMusiRewardTimeApi = Math.floor(new Date().getTime() / 1000);
            const hanTokenPerLpToken = await MusikhanStakingContract.methods.hanTokenPerLpToken().call();

            const musiStakedTime = currentMusiRewardTimeApi - rewardTimeOfLastUpdate;

            const musiResult1 = (musiStakedTime * (rewardTokenAmount * hanTokenPerLpToken)) / 10 ** 18;
            const musiResult2 = Math.floor(musiResult1);

            const musiResultValueApi = Web3.utils.fromWei(String(musiResult2), "ether");
            let [musiResultValue] = await Promise.all([musiResultValueApi]);
            dispatch({
                type: "L2_REWARD_RESULT_VIEW",
                payload: {
                    musiResultValue: musiResultValue,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2RewardResultAction = { L2RewardResultAct };
