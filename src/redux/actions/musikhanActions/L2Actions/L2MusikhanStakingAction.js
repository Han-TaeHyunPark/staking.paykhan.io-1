import { MusikhanStakingContract } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingContract } from "../../../../config/MusikhanConfigTest";
import Swal from "sweetalert2";
import Web3 from "web3";

function L2MusikhanStakingAct(account, L2DepositTokenCa, stakingnum) {
    return async (dispatch) => {
        try {
            const stakingNum2 = Web3.utils.toWei(String(stakingnum), "ether");
            const stake = await MusikhanStakingContract.methods.stake(L2DepositTokenCa, stakingNum2).send({ from: account });
            Swal.fire({
                title: "Success",
                text: "Staking was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "L2_STAKING_SUCCESS",
                payload: { successL2Staking: true },
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Staking was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const L2MusikhanStakingAction = { L2MusikhanStakingAct };
