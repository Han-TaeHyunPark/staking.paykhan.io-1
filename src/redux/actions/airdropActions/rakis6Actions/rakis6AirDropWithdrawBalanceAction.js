function rakis6AirDropWithdrawBalanceAct(rakis6WithdrawAmount, index) {
    return async (dispatch) => {
        try {
            const rakis6WithdrawAmountToModalApi = rakis6WithdrawAmount;
            const withdrawIndex = index;

            dispatch({
                type: "WITHDRAW_VIEW_SUCCESS",
                payload: {
                    rakis6WithdrawAmount: rakis6WithdrawAmountToModalApi,
                    withdrawIndex: withdrawIndex,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const rakis6AirDropWithdrawBalanceAction = { rakis6AirDropWithdrawBalanceAct };
