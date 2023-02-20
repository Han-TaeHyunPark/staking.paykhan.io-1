function L1MusiKhanViewAct(tokenSymbol, l1TokenAddress, l2TokenAddress) {
    return async (dispatch) => {
        try {
            const getL1TokenSymbolToModalApi = tokenSymbol;
            const getL1TokenAddressToModalApi = l1TokenAddress;
            const getL2TokenAddressToModalApi = l2TokenAddress;
            let [getL1TokenSymbolToModal, getL1TokenAddressToModal, getL2TokenAddressToModal] = await Promise.all([
                getL1TokenSymbolToModalApi,
                getL1TokenAddressToModalApi,
                getL2TokenAddressToModalApi,
            ]);
            dispatch({
                type: "GET_L1_TOKEN_INFO_TOMODAL",
                payload: {
                    L1TokenSymbol: getL1TokenSymbolToModal,
                    L1TokenAddress: getL1TokenAddressToModal,
                    L2TokenAddressUseL1: getL2TokenAddressToModal,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L1MusiKhanViewAction = { L1MusiKhanViewAct };
