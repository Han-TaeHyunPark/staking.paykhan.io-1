import { MusikhanStakingContract } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingContract } from "../../../../config/MusikhanConfigTest";

function L2RewardTokenListAct(account) {
    return async (dispatch) => {
        try {
            const getClaimTokenListApi = await MusikhanStakingContract.methods.getClaimTokenList(account).call();

            const rewardTokenArray = [];

            for (let i = 0; i < getClaimTokenListApi.length; i++) {
                const getRewards = await MusikhanStakingContract.methods.getStaker(getClaimTokenListApi[i], account).call();
                rewardTokenArray.push(getRewards);
            }

            dispatch({
                type: "L2_REWARD_TOKEN_LIST",
                payload: {
                    rewardTokenList: rewardTokenArray,
                },
            });

            // const getStaker1 = await MusikhanStakingContract.methods.getStaker("L2 Token Address", account).call();
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2RewardTokenListAction = { L2RewardTokenListAct };
