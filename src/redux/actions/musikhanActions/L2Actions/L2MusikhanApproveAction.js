import { MusikhanStakingAddress } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingAddress } from "../../../../config/MusikhanConfigTest";
import Swal from "sweetalert2";
import Web3 from "web3";

function L2MusikhanApproveAct(account, L2DepositBalance, L2Contract) {
    return async (dispatch) => {
        try {
            const L2DepositB = Web3.utils.toWei(String(L2DepositBalance), "ether");
            const approve = await L2Contract.methods.approve(MusikhanStakingAddress, L2DepositB).send({ from: account });
            Swal.fire({
                text: "Approve was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            dispatch({
                type: "L2_TOKEN_APPROVE_SUCCESS",
                payload: { successL2TokenApprove: true },
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

export const L2MusikhanApproveAction = { L2MusikhanApproveAct };
