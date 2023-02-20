import { AirDropAddress, AirDropContract, web3 } from "../../../config/AirDropConfig";
// import {
//   AirDropAddress,
//   AirDropContract,
//   web3,
// } from "../../../config/AirDropConfigTest";

function airDropTimeStampAct() {
    return async (dispatch) => {
        try {
            const timeStampToContractApi = await AirDropContract.methods.remainingDuration().call();

            const reMainDurationtoContract = timeStampToContractApi * 1000;

            const claimDayDateApi = String(Math.floor(reMainDurationtoContract / (1000 * 60 * 60 * 24))).padStart(2, "0");

            const claimHoursDateApi = String(Math.floor(reMainDurationtoContract / (1000 * 60 * 60)) % 24).padStart(2, "0");

            const claimMinDateApi = String(Math.floor((reMainDurationtoContract / (1000 * 60)) % 60)).padStart(2, "0");

            let [claimDayDate, claimHoursDate, claimMinDate] = await Promise.all([claimDayDateApi, claimHoursDateApi, claimMinDateApi]);

            dispatch({
                type: "GET_AIRDROP_SUCCESS_TIMESTAMP",
                payload: {
                    claimDayDate: claimDayDate,
                    claimHoursDate: claimHoursDate,
                    claimMinDate: claimMinDate,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const airDropTimeStampAction = { airDropTimeStampAct };
