import Web3 from "web3";

function L2WithdrawViewAct(l2WithdrawSymbol, l2WithdrawAmountStaked, l2WithdrawTokenCa) {
    return async (dispatch) => {
        try {
            const getL2WithdrawTokenSymbolToModalApi = l2WithdrawSymbol;
            const getL2WithdrawAmountStakedToModalApi = l2WithdrawAmountStaked;
            const getL2WithdrawAmountStakedStringApi = Web3.utils.fromWei(String(getL2WithdrawAmountStakedToModalApi), "ether");
            const getL2WithdrawTokenCaToModalApi = l2WithdrawTokenCa;

            let [getL2WithdrawTokenSymbolToModal, getL2WithdrawAmountStakedString, getL2WithdrawTokenCaToModal] = await Promise.all([
                getL2WithdrawTokenSymbolToModalApi,
                getL2WithdrawAmountStakedStringApi,
                getL2WithdrawTokenCaToModalApi,
            ]);

            dispatch({
                type: "L2_WITHDRAW_TOKEN_INFO",
                payload: {
                    L2WithdrawTokenSymbol: getL2WithdrawTokenSymbolToModal,
                    L2WithdrawAmountStaked: getL2WithdrawAmountStakedString,
                    L2WithdrawTokenCa: getL2WithdrawTokenCaToModal,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2WithdrawViewAction = { L2WithdrawViewAct };
