import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6ConfigTest";
import Web3 from "web3";

function tokenListViewAct(account) {
    return async (dispatch) => {
        try {
            // 내가 스테이킹한 순서별로 amount, timeStared 가 저장된 struct 배열 출력 함수
            const getStakerArrayDataApi = await PrivateStakingContract.methods.getStakerArrayData(account).call();

            const stakerDataArray = [];

            for (let i = 0; i < getStakerArrayDataApi.length; i++) {
                let lee = JSON.parse(JSON.stringify(getStakerArrayDataApi[i]));
                stakerDataArray.push(lee);
            }

            for (let i = 0; i < stakerDataArray.length; i++) {
                for (let j = 0; j < stakerDataArray.length; j++) {
                    const newDate = new Date(stakerDataArray[i][4] * 1000);
                    const rakis6ClaimYearsDate = newDate.getFullYear().toString().substr(2, 4);
                    const rakis6ClaimDayDate = newDate.getDate();
                    const rakis6ClaimHoursDate = newDate.getHours();
                    const rakis6ClaimAmount = Web3.utils.fromWei(String(stakerDataArray[i][0]), "ether");
                    stakerDataArray[i].splice(5, 1, rakis6ClaimYearsDate);
                    stakerDataArray[i].splice(6, 1, rakis6ClaimDayDate);
                    stakerDataArray[i].splice(7, 1, rakis6ClaimHoursDate);
                    stakerDataArray[i].splice(8, 1, rakis6ClaimAmount);
                }
            }

            dispatch({
                type: "WITHDRAW_TOKEN_LIST",
                payload: {
                    stakerDataArray: stakerDataArray,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const tokenListViewAction = { tokenListViewAct };
