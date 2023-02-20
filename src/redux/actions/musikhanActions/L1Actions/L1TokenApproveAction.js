import { BridgeAddress } from "../../../../config/MusikhanConfig";
// import { BridgeAddress } from "../../../../config/MusikhanConfigTest";
import Swal from "sweetalert2";
import Web3 from "web3";

function L1TokenApproveAct(account, L1TokenBalanceOf, L1Contract) {
    return async (dispatch) => {
        const L1TokenBalance = Web3.utils.toWei(String(L1TokenBalanceOf), "ether");
        try {
            // TokenApporve함수 200개
            const qwerApprove = await L1Contract.methods.approve(BridgeAddress, L1TokenBalance).send({ from: account });
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
                type: "L1_TOKEN_APRROVE_SUCCESS",
                payload: { successL1TokenApprove: true },
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

export const L1TokenApproveAction = { L1TokenApproveAct };
