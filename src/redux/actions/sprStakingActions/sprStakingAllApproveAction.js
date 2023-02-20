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

function sprStakingAllApproveAct(account, gasPriceResult) {
  return async (dispatch) => {
    try {
      const setApprovalForAll = await web3.eth.sendTransaction({
        from: account,
        to: SheepooriTokenAddress,
        gasPrice: web3.utils.hexToNumber(gasPriceResult),
        data: SheepooriTokenContract.methods
          .setApprovalForAll(SheepooriStakingAddress, true)
          .encodeABI(),
      });
      dispatch({
        type: "SUCCESS_SPR_ALL_APPROVE",
        payload: { successSprAllApprove: true },
      });
      if (setApprovalForAll.status) {
        Swal.fire({
          title: "Success",
          text: "Approve was successful!",
          icon: "success",

          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Fail",
        text: "Approve was Fail!",
        icon: "error",

        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      // window.
    }
  };
}

export const sprStakingAllApproveAction = { sprStakingAllApproveAct };
