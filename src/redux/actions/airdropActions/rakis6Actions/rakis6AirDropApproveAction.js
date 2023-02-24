import { PrivateStakingTokenContract, PrivateStakingAddress } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingTokenContract, PrivateStakingAddress } from "../../../../config/PrivateStakingRakis6ConfigTest";
import Swal from "sweetalert2";
function rakis6AirDropApproveAct(account, amount) {
    return async (dispatch) => {
        try {
            const approve = await PrivateStakingTokenContract.methods.approve(PrivateStakingAddress, amount).send({ from: account });
            Swal.fire({
                text: "Approve was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            dispatch({
                type: "RAKIS6_AIRDROP_APPROVE_SUCCESS",
                payload: {
                    successRakis6Apporve: true,
                },
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

export const rakis6AirDropApproveAction = { rakis6AirDropApproveAct };
