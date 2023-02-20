import {
  SheepooriTokenAddress,
  SheepooriTokenContract,
  SheepooriStakingAddress,
  web3,
} from "../../../config/SheepooriStakingConfig";
// import {
//   SheepooriTokenAddress,
//   SheepooriTokenContract,
//   SheepooriStakingAddress,
//   web3,
// } from "../../../config/SheepooriStakingConfigTest";
import Swal from "sweetalert2";

function sprStakingSingleApproveAct(account, stakingmyTokenId, gasPriceResult) {
  return async (dispatch) => {
    try {
      const approve = await web3.eth.sendTransaction({
        from: account,
        to: SheepooriTokenAddress,
        gasPrice: web3.utils.hexToNumber(gasPriceResult),
        // gasPrice: web3.utils.hexToNumber(gasPriceResult),
        data: SheepooriTokenContract.methods
          .approve(SheepooriStakingAddress, stakingmyTokenId)
          .encodeABI(),
      });
      if (approve.status) {
        Swal.fire({
          title: "Success",
          text: "Approve was successful!",
          icon: "success",

          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
      dispatch({
        type: "SUCCESS_SPR_APPROVE",
        payload: { successSprApprove: true },
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Fail",
        text: "Approve was Fail!",
        icon: "error",

        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
}

export const sprStakingSingleApproveAction = { sprStakingSingleApproveAct };
