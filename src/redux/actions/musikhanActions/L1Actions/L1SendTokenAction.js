import { BridgeContract } from "../../../../config/MusikhanConfig";
// import { BridgeContract } from "../../../../config/MusikhanConfigTest";
import Swal from "sweetalert2";

function L1SendTokenAct(account, L1TokenAddress, L2TokenAddressUseL1) {
    return async (dispatch) => {
        try {
            const sendToken = await BridgeContract.methods.sendToken(L1TokenAddress, L2TokenAddressUseL1).send({ from: account });
            Swal.fire({
                text: "Deposit was successful!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    let timeInterval;
                    Swal.fire({
                        title: "Token Deposit Timer!",
                        html: "Mint at L2 after <strong></strong> seconds.",
                        timer: 1200000,
                        // timer: 120000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            timeInterval = setInterval(() => {
                                Swal.getHtmlContainer().querySelector("strong").textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timeInterval);
                            window.location.reload();
                        },
                    });
                }
            });
            dispatch({
                type: "L1_TRANSFER_SUCCESS",
                payload: { successL1Transfer: true },
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Fail",
                text: "Deposit was Fail!",
                icon: "error",

                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    };
}

export const L1SendTokenAction = { L1SendTokenAct };
