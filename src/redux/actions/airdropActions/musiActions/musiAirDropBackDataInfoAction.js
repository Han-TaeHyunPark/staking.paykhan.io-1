import axios from "axios";
import { MusikhanAirdropContract } from "../../../../config/MusikhanConfig";
// import { MusikhanAirdropContract } from "../../../../config/MusikhanConfigTest";

function musiAirDropBackDataInfoAct(account, musiTokenRoot) {
    return async (dispatch) => {
        try {
            let musiBackData = {};
            musiBackData.account = account;
            musiBackData.c_root = musiTokenRoot;

            const getMusiProofAmountToBack = await axios({
                method: "POST", // [요청 타입]
                url: `https://admin.paykhan.io:3000/music/changeAddress`, // [요청 주소]
                data: JSON.stringify(musiBackData), // [요청 데이터]
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                timeout: 3000,
            });

            await setTimeout(0);

            const musiCanClaimApi = await MusikhanAirdropContract.methods
                .canClaim(getMusiProofAmountToBack.data.proof, getMusiProofAmountToBack.data.eth_amount, getMusiProofAmountToBack.data.contract_address)
                .call({ from: account });

            const getmusiProofToBackAPi = getMusiProofAmountToBack.data.proof;
            const getmusiTokenCaToBackApi = getMusiProofAmountToBack.data.contract_address;
            const getmusiAmountToBackApi = getMusiProofAmountToBack.data.eth_amount;

            let [getmusiProofToBack, getmusiTokenCaToBack, getmusiAmountToBack] = await Promise.all([
                getmusiProofToBackAPi,
                getmusiTokenCaToBackApi,
                getmusiAmountToBackApi,
            ]);

            dispatch({
                type: "AIRDROP_MUSI_BACK_DATA_SUCCESS",
                payload: {
                    getmusiProofToBack: getmusiProofToBack,
                    getmusiTokenCaToBack: getmusiTokenCaToBack,
                    getmusiAmountToBack: getmusiAmountToBack,
                    musiCanClaim: musiCanClaimApi,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const musiAirDropBackDataInfoAction = { musiAirDropBackDataInfoAct };
