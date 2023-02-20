import Swal from "sweetalert2";
import Web3 from "web3";
import { TokenSwapAddress } from "../../../../config/MusikhanConfig";
// import { TokenSwapAddress } from "../../../../config/MusikhanConfigTest";

function L2SwapApproveAct(account, L2SwapTokenBalance, L2SwapContract) {
    return async (dispatch) => {
        try {
            const L2SwapTokenB = Web3.utils.toWei(String(L2SwapTokenBalance), "ether");
            // TokenApporve함수 200개
            const swapL2Approve = await L2SwapContract.methods.approve(TokenSwapAddress, L2SwapTokenB).send({ from: account });
            Swal.fire({
                text: "Approve was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            // .then((result) => {
            //   if (result.isConfirmed) {
            //     window.location.reload();
            //   }
            // });
            dispatch({
                type: "L2_SWAP_TOKEN_APRROVE_SUCCESS",
                payload: { successL2SwapTokenApprove: true },
            });
        } catch (error) {
            console.log(error);
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

export const L2SwapApproveAction = { L2SwapApproveAct };
