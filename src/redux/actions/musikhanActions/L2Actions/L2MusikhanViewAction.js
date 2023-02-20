function L2MusikhanViewAct(l2TokenSymbol, l2TokenAddress) {
    return async (dispatch) => {
        try {
            const getL2DepositTokenSymbolToModalApi = l2TokenSymbol;

            const getL2DepositTokenCaToModalAPi = l2TokenAddress;

            let [getL2DepositTokenSymbolToModal, getL2DepositTokenCaToModal] = await Promise.all([
                getL2DepositTokenSymbolToModalApi,
                getL2DepositTokenCaToModalAPi,
            ]);

            dispatch({
                type: "GET_L2_TOKEN_INFO_VIEW",
                payload: {
                    L2DepositTokenSymbol: getL2DepositTokenSymbolToModal,
                    L2DepositTokenCa: getL2DepositTokenCaToModal,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2MusikhanViewAction = { L2MusikhanViewAct };
