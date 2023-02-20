function L2SwapViewAct(L2SwapName, L2SwapSymbol, existTokenCa, musiSwapTokenCa) {
    return async (dispatch) => {
        try {
            const L2SwapNameToModal = L2SwapName;
            const L2SwapSymbolToModal = L2SwapSymbol;
            const L2SwapExistTokenCaToModal = existTokenCa;
            const L2SwapTokenCaToModal = musiSwapTokenCa;

            dispatch({
                type: "L2_SWAP_VIEW",
                payload: {
                    L2SwapName: L2SwapNameToModal,
                    L2SwapSymbol: L2SwapSymbolToModal,
                    L2SwapExistTokenCa: L2SwapExistTokenCaToModal,
                    L2SwapTokenCa: L2SwapTokenCaToModal,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export const L2SwapViewAction = { L2SwapViewAct };
