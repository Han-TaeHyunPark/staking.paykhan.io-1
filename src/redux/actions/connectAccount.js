function getAccount() {
    return async (dispatch) => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            let account = accounts[0];
            dispatch({ type: "GET_ACCOUNT", payload: { account } });
        } catch (error) {
            console.error(error);
        }
    };
}

export const connectAccount = { getAccount };
