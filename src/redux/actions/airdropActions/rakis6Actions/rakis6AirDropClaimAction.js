import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6ConfigTest";
import Swal from "sweetalert2";

function rakis6AirDropClaimAct(account) {
    return async (dispatch) => {
        try {
            const claimReward = await PrivateStakingContract.methods.claimReward().send({ from: account });
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

export const rakis6AirDropClaimAction = { rakis6AirDropClaimAct };
