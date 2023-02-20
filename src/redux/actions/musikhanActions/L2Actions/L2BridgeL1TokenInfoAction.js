import { MusikhanContract } from "../../../../config/MusikhanConfig";
// import { MusikhanContract } from "../../../../config/MusikhanConfigTest";
import Web3 from "web3";

function L2BridgeL1TokenInfoAct(account) {
    return async (dispatch) => {
        try {
            const getL1TokenInfoApi = await MusikhanContract.methods.getL1TokenInfo(account).call();
            const getL1TokenName = getL1TokenInfoApi.name;
            const getL1TokenSymbol = getL1TokenInfoApi.symbol;
            const getL1TokenAmount = getL1TokenInfoApi.amount;
            const getL1TokenL1Ca = getL1TokenInfoApi.l1Ca;
            const getL1TokenL2Ca = getL1TokenInfoApi.l2Ca;

            dispatch({
                type: "L2_BRIDGE_L1_TOKENINFO",
                payload: {
                    getL1TokenInfo: getL1TokenInfoApi,
                    mintL2TokenName: getL1TokenName,
                    mintL2TokenSymbol: getL1TokenSymbol,
                    getL1TokenAmount: Web3.utils.fromWei(String(getL1TokenAmount), "ether"),
                    getL1TokenL1Ca: getL1TokenL1Ca,
                    getL1TokenL2Ca: getL1TokenL2Ca,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const L2BridgeL1TokenInfoAction = { L2BridgeL1TokenInfoAct };
