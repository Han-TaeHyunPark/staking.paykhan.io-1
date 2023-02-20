import { MusikhanAirdropContract } from "../../../../config/MusikhanConfig";
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";

function musiAirDropTimeStampAct(musiTokenl2Ca) {
    return async (dispatch) => {
        try {
            const musiTimeStampToContractAPi = await MusikhanAirdropContract.methods.remainingDuration(musiTokenl2Ca).call();

            const musiReMainDurationToContract = musiTimeStampToContractAPi * 1000;

            const musiClaimDayDateApi = String(Math.floor(musiReMainDurationToContract / (1000 * 60 * 60 * 24))).padStart(2, "0");

            const musiClaimHoursDateApi = String(Math.floor(musiReMainDurationToContract / (1000 * 60 * 60)) % 24).padStart(2, "0");

            const musiClaimMinDateApi = String(Math.floor((musiReMainDurationToContract / (1000 * 60)) % 60)).padStart(2, "0");

            let [musiClaimDayDate, musiClaimHoursDate, musiClaimMinDate] = await Promise.all([musiClaimDayDateApi, musiClaimHoursDateApi, musiClaimMinDateApi]);

            dispatch({
                type: "GET_MUSI_AIRDROP_TIMESAMP",
                payload: {
                    musiClaimDayDate: musiClaimDayDate,
                    musiClaimHoursDate: musiClaimHoursDate,
                    musiClaimMinDate: musiClaimMinDate,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const musiAirDropTimeStampAction = { musiAirDropTimeStampAct };
