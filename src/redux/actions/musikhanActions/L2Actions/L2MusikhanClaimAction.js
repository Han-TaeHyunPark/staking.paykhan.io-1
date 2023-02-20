import { MusikhanStakingContract } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingContract } from "../../../../config/MusikhanConfigTest";
import Swal from "sweetalert2";

function L2MusikhanClaimAct(account, rewardTokenCa) {
    return async (dispatch) => {
        try {
            const claimReward = await MusikhanStakingContract.methods.claimReward(rewardTokenCa).send({ from: account });
            Swal.fire({
                title: "Success",
                text: "Claim was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "L2_CLAIM_SUCCESS",
                payload: { successL2Claim: true },
            });
        } catch (error) {
            console.error(error);
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

export const L2MusikhanClaimAction = { L2MusikhanClaimAct };
