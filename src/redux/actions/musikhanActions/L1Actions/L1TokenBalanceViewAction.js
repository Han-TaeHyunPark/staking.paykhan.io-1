import Web3 from "web3";

function L1TokenBalanceViewAct(account, L1Contract) {
    return async (dispatch) => {
        try {
            const L1TokenBalanceOfApi = await L1Contract.methods.balanceOf(account).call();
            dispatch({
                type: "L1_TOKEN_BALANCE_SUCCESS",
                payload: {
                    L1TokenBalanceOf: Web3.utils.fromWei(String(L1TokenBalanceOfApi), "ether"),
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L1TokenBalanceViewAction = { L1TokenBalanceViewAct };
