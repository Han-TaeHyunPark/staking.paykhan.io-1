import { MusikhanAirdropContract } from "../../../../config/MusikhanConfig";
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";
import axios from "axios";

function musiAirDropClaimedAct(account, musiTokenRoot) {
    return async (dispatch) => {
        try {
            let musiModalData = {};
            musiModalData.account = account;
            musiModalData.c_root = musiTokenRoot;

            const getMusiProofAmountTokenToBack = await axios({
                method: "POST", // [요청 타입]
                url: `http://15.165.255.173:3000/music/changeAddress`, // [요청 주소]
                data: JSON.stringify(musiModalData), // [요청 데이터]
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                timeout: 3000,
            });

            const musiClaimedApi = await MusikhanAirdropContract.methods
                .claimed(
                    getMusiProofAmountTokenToBack.data.proof,
                    getMusiProofAmountTokenToBack.data.eth_amount,
                    getMusiProofAmountTokenToBack.data.contract_address
                )
                .call({ from: account });

            dispatch({
                type: "MUSI_AIRDROP_CLAIMED_STATE",
                payload: {
                    musiClaimed: musiClaimedApi,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const musiAirDropClaimedAction = { musiAirDropClaimedAct };
