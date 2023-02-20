import { MusikhanContract } from "../../../../config/MusikhanConfig";
// import { MusikhanContract } from "../../../../config/MusikhanConfigTest";

function L2MusikhanMintingCaAct(account) {
    return async (dispatch) => {
        try {
            const getMyMintingTokenListApi = await MusikhanContract.methods.getMyTokenList(account).call();
            const dePositTokenListArray = [];

            for (let i = 0; i < getMyMintingTokenListApi.length; i++) {
                const getL2TokenInfo = await MusikhanContract.methods.getL2TokenInfo(getMyMintingTokenListApi[i]).call();
                dePositTokenListArray.push(getL2TokenInfo);
            }

            const l2DepositTokenListApi = dePositTokenListArray;

            let [getMyMintingTokenList, l2DepositTokenList] = await Promise.all([getMyMintingTokenListApi, l2DepositTokenListApi]);
            dispatch({
                type: "GET_MY_MINTING_TOKENCA",
                payload: {
                    getMyMintingTokenList: getMyMintingTokenList,
                    l2DepositTokenList: l2DepositTokenList,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2MusikhanMintingCaAction = { L2MusikhanMintingCaAct };
