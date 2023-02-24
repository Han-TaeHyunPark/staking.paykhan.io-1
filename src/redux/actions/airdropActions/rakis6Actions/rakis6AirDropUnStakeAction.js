import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6ConfigTest";
import Swal from "sweetalert2";

function rakis6AirDropUnStakeAct(account, withdrawIndex) {
    return async (dispatch) => {
        try {
            const withdraw = await PrivateStakingContract.methods.withdraw(withdrawIndex).send({ from: account });
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

export const rakis6AirDropUnStakeAction = { rakis6AirDropUnStakeAct };
