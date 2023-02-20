import { MusikhanAirdropContract } from "../../../../config/MusikhanConfig";
import { MusikhanContract } from "../../../../config/MusikhanConfig";
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";
// import { MusikhanContract } from "../../../../config/MusikhanConfigTest";

function musiAirDropTokenListAct() {
    return async (dispatch) => {
        try {
            const getCanClaimTokenList = await MusikhanAirdropContract.methods.getCanClaimTokenList().call();

            const musiAirDropTokenListArray = [];

            for (let i = 0; i < getCanClaimTokenList.length; i++) {
                const getMusiL2TokenInfo = await MusikhanContract.methods.getL2TokenInfo(getCanClaimTokenList[i]).call();
                musiAirDropTokenListArray.push(getMusiL2TokenInfo);
            }

            const musiAirDropTokenList = musiAirDropTokenListArray;

            dispatch({
                type: "MUSI_AIRDROP_TOKENLIST",
                payload: {
                    musiAirDropTokenList: musiAirDropTokenList,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const musiAirDropTokenListAction = { musiAirDropTokenListAct };
