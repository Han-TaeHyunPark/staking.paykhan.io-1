import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6ConfigTest";
import Swal from "sweetalert2";

function rakis6AirDropStakeAct(account, rakis6Stakingnum, stakingPassword) {
    return async (dispatch) => {
        try {
            const stake = await PrivateStakingContract.methods.stake(stakingPassword, rakis6Stakingnum).send({ from: account });
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

export const rakis6AirDropStakeAction = { rakis6AirDropStakeAct };
