import { SheepooriStakingContract } from "../../../config/SheepooriStakingConfig";
// import {
//   SheepooriStakingContract,
//   SheepooriTokenContract,
// } from "../../../config/SheepooriStakingConfigTest";

function sprStakingResultViewAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // 주소 별 클레임 하지 않은 보상 토큰 양 Accumultaed Interset :
        const getUnclaimedRewardsApi = await SheepooriStakingContract.methods
          .getUnclaimedRewards(account)
          .call();

        // 주소 별 지금까지 받은 총 보상 토큰 양 Rewarded Interest :
        const getTotalRewardApi = await SheepooriStakingContract.methods
          .getTotalReward(account)
          .call();

        // 주소 별 스테이킹 한 토큰 개수 STAKED :
        const getAmountStakedApi = await SheepooriStakingContract.methods
          .getAmountStaked(account)
          .call();

        // 스테이킹 하면 초당 받을 수 있는 보상 토큰 양
        const rewardTokenPerstakingTokenApi =
          await SheepooriStakingContract.methods
            .rewardTokenPerstakingToken()
            .call();

        // 토큰 아이디 별 마지막으로 업데이트된 시간
        const getTimeOfLastUpdateApi = await SheepooriStakingContract.methods
          .getTimeOfLastUpdate(account)
          .call();

        // 현재 시간 Api
        const currentTimeApi = Math.floor(new Date().getTime() / 1000);

        const sprStakedTime = currentTimeApi - getTimeOfLastUpdateApi;

        const sprResultValueApi =
          (sprStakedTime *
            (getAmountStakedApi * rewardTokenPerstakingTokenApi)) /
          10 ** 18;

        let [sprResultValue, getUnclaimedRewards, getTotalReward] =
          await Promise.all([
            sprResultValueApi,
            getUnclaimedRewardsApi,
            getTotalRewardApi,
          ]);

        dispatch({
          type: "GET_SPR_STAKING_RESULT_VIEW_SUCCESS",
          payload: {
            sprResultValue: Math.floor(sprResultValue * 100000000) / 100000000,
            getUnclaimedRewards:
              Math.floor((getUnclaimedRewards / 10 ** 18) * 100000000) /
              100000000,
            getTotalReward:
              Math.floor((getTotalReward / 10 ** 18) * 100000000) / 100000000,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const sprStakingResultViewAction = { sprStakingResultViewAct };
