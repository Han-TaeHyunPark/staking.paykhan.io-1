import { MusikhanContract } from "../../../../config/MusikhanConfig";
// import { MusikhanContract } from "../../../../config/MusikhanConfigTest";
import Swal from "sweetalert2";

function L2BridgeMintAct(account, getL1TokenL2Ca) {
    return async (dispatch) => {
        try {
            const mint = await MusikhanContract.methods.mint(getL1TokenL2Ca).send({ from: account });
            Swal.fire({
                title: "Success",
                text: "Mint was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            dispatch({
                type: "L2_BRIDGE_MINTING_SUCCESS",
                payload: { successL2Minting: true },
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Mint was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const L2BridgeMintAction = { L2BridgeMintAct };
