import axios from "axios";

function L2SwapTokenListToBackAct() {
    return async (dispatch) => {
        try {
            const l2TokenListToBackApi = await axios.get(`https://admin.paykhan.io:3000/addr/l2list`);
            const l2TokenListToBack = l2TokenListToBackApi.data.tokenList;

            dispatch({
                type: "L2_SWAP_TOKENLIST_TOBACK",
                payload: {
                    L2SwapTokenList: l2TokenListToBack,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2SwapTokenListToBackAction = { L2SwapTokenListToBackAct };
