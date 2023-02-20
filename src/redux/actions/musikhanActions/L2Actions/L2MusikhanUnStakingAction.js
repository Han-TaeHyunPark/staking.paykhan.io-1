import { MusikhanStakingContract } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingContract } from "../../../../config/MusikhanConfigTest";
import Swal from "sweetalert2";
import Web3 from "web3";

function L2MusikhanUnStakingAct(account, L2WithdrawTokenCa, unStakingNum) {
    return async (dispatch) => {
        try {
            const unStakingNum2 = Web3.utils.toWei(String(unStakingNum), "ether");
            const withdraw = await MusikhanStakingContract.methods.withdraw(L2WithdrawTokenCa, unStakingNum2).send({ from: account });
            Swal.fire({
                title: "Success",
                text: "Withdraw was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "L2_WITHDRAW_SUCCESS",
                payload: { successL2Withdraw: true },
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Withdraw was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const L2MusikhanUnStakingAction = { L2MusikhanUnStakingAct };
