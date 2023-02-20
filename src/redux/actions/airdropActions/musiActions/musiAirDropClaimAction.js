import Swal from "sweetalert2";
import { MusikhanAirdropContract } from "../../../../config/MusikhanConfig";
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";

function musiAirDropClaimAct(account, getmusiProofToBack, getmusiAmountToBack, getmusiTokenCaToBack) {
    return async (dispatch) => {
        try {
            const claim = await MusikhanAirdropContract.methods.claim(getmusiProofToBack, getmusiAmountToBack, getmusiTokenCaToBack).send({ from: account });
            Swal.fire({
                text: "Claim was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });

            dispatch({
                type: "SUCCESS_MUSIAIRDROP_CLAIM",
                payload: { successMusiAirDropClaim: true },
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

export const musiAirDropClaimAction = { musiAirDropClaimAct };
