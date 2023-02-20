import { TokenSwapContract } from "../../../../config/MusikhanConfig";
// import { TokenSwapContract } from "../../../../config/MusikhanConfigTest";
import Swal from "sweetalert2";

function L2SwapTokenSwapAct(account, L2SwapExistTokenCa, L2SwapTokenCa) {
    return async (dispatch) => {
        try {
            const swapToken = await TokenSwapContract.methods.swapToken(L2SwapExistTokenCa, L2SwapTokenCa).send({ from: account });
            Swal.fire({
                title: "Success",
                text: "Swap was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "L2_SWAP_SUCCESS",
                payload: { successL2SwapToken: true },
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Swap was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const L2SwapTokenSwapAction = { L2SwapTokenSwapAct };
