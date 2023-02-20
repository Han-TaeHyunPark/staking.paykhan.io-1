import { SheepooriTokenContract } from "../../../config/SheepooriStakingConfig";
// import { SheepooriTokenContract } from "../../../config/SheepooriStakingConfigTest";

function sprSingleApproveStateAct(account, stakingmyTokenId) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // SingleApprove 상태
        const getSingleApprovedAPi = await SheepooriTokenContract.methods
          .getApproved(stakingmyTokenId)
          .call();

        let [getSingleApproved] = await Promise.all([getSingleApprovedAPi]);

        dispatch({
          type: "GET_SPR_STAKING_SINGLE_RESULT_VIEW_SUCCESS",
          payload: {
            getSingleApproved: getSingleApproved,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const sprSingleApproveStateAction = { sprSingleApproveStateAct };
