import {
  SheepooriStakingAddress,
  SheepooriStakingContract,
  web3,
} from "../../../config/SheepooriStakingConfig";
// import {
//   SheepooriStakingAddress,
//   SheepooriStakingContract,
//   web3,
// } from "../../../config/SheepooriStakingConfigTest";
import Swal from "sweetalert2";

function sprStakingRewardAct(account, gasPriceResult) {
  return async (dispatch) => {
    // 클레임
    try {
      const sheepooriClaimReward = await web3.eth.sendTransaction({
        from: account,
        to: SheepooriStakingAddress,
        gasPrice: web3.utils.hexToNumber(gasPriceResult),
        data: SheepooriStakingContract.methods.claimReward().encodeABI(),
      });
      Swal.fire({
        title: "Success",
        text: "Claim was successful!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      dispatch({
        type: "SUCCESS_SPR_CLAIM",
        payload: { successSprClaim: true },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Fail",
        text: "Claim was Fail!",
        icon: "error",

        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
}

export const sprStakingRewardAction = { sprStakingRewardAct };
