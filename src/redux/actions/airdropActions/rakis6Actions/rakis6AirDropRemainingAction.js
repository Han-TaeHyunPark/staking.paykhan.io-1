import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6ConfigTest";

function rakis6AirDropRemainingAct(account, index) {
    return async (dispatch) => {
        try {
            const remainingDurationApi = await PrivateStakingContract.methods.remainingDuration(account, index).call();

            const rakis6ReMainDurationtoContract = remainingDurationApi * 1000;

            const rakis6ClaimDayDateApi = String(Math.floor(rakis6ReMainDurationtoContract / (1000 * 60 * 60 * 24))).padStart(2, "0");
            const rakis6ClaimHoursDateApi = String(Math.floor(rakis6ReMainDurationtoContract / (1000 * 60 * 60)) % 24).padStart(2, "0");
            const rakis6ClaimMinDateApi = String(Math.floor((rakis6ReMainDurationtoContract / (1000 * 60)) % 60)).padStart(2, "0");

            let [rakis6ClaimDayDate, rakis6ClaimHoursDate, rakis6ClaimMinDate] = await Promise.all([
                rakis6ClaimDayDateApi,
                rakis6ClaimHoursDateApi,
                rakis6ClaimMinDateApi,
            ]);

            dispatch({
                type: "RAKIS6_AIRDROP_TIMESTAMP",
                payload: {
                    rakis6ClaimDayDate: rakis6ClaimDayDate,
                    rakis6ClaimHoursDate: rakis6ClaimHoursDate,
                    rakis6ClaimMinDate: rakis6ClaimMinDate,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const rakis6AirDropRemainingAction = { rakis6AirDropRemainingAct };
