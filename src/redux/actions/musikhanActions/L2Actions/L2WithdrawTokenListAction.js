import { MusikhanStakingContract } from "../../../../config/MusikhanConfig";
// import { MusikhanStakingContract } from "../../../../config/MusikhanConfigTest";

function L2WithdrawTokenListAct(account) {
    return async (dispatch) => {
        try {
            const getMyStakingTokenListApi = await MusikhanStakingContract.methods.getStakingTokenList(account).call();

            const withdrawTokenArray = [];

            for (let i = 0; i < getMyStakingTokenListApi.length; i++) {
                const getStaker = await MusikhanStakingContract.methods.getStaker(getMyStakingTokenListApi[i], account).call();
                withdrawTokenArray.push(getStaker);
            }

            dispatch({
                type: "L2_WITHDRAW_TOKEN_LIST",
                payload: {
                    withdrawTokenList: withdrawTokenArray,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2WithdrawTokenListAction = { L2WithdrawTokenListAct };
