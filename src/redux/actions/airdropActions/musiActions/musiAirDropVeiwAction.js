function musiAirDropViewAct(musiTokenRoot, musiTokenName, musiTokenSymbol, musiTokenl2Ca, account) {
    return async (dispatch) => {
        try {
            const musiRootApi = musiTokenRoot;

            const musiNameApi = musiTokenName;

            const musiSymbolApi = musiTokenSymbol;

            const musiL2CaApi = musiTokenl2Ca;

            let [musiRoot, musiName, musiSymbol, musiL2Ca] = await Promise.all([musiRootApi, musiNameApi, musiSymbolApi, musiL2CaApi]);

            dispatch({
                type: "AIRDROP_MUSI_VIEW_SUCCESS",
                payload: {
                    musiRoot: musiRoot,
                    musiName: musiName,
                    musiSymbol: musiSymbol,
                    musiL2Ca: musiL2Ca,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const musiAirDropViewAction = { musiAirDropViewAct };
