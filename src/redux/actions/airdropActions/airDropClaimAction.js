import { AirDropAddress, AirDropContract, web3 } from "../../../config/AirDropConfig";
// import {
//   AirDropAddress,
//   AirDropContract,
//   web3,
// } from "../../../config/AirDropConfigTest";
import Swal from "sweetalert2";

function airDropClaimAct(account, getProofToBack, getAmountToBack, gasPriceResult) {
    return async (dispatch) => {
        try {
            const airdropclaim = await AirDropContract.methods.claim(getProofToBack, getAmountToBack).send({ from: account });

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
                type: "SUCCESS_AIRDROP_CLAIM",
                payload: { successAirDropClaim: true },
            });
        } catch (error) {
            console.log(error);
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

export const airDropClaimAction = { airDropClaimAct };
