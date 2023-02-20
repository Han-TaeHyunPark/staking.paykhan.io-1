import axios from "axios";
import { AirDropAddress, AirDropContract, web3 } from "../../../config/AirDropConfig";
// import {
//   AirDropAddress,
//   AirDropContract,
//   web3,
// } from "../../../config/AirDropConfigTest";

function airDropViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                const airDropRootApi = await AirDropContract.methods.root().call();

                let backData = {};
                backData.account = account;
                backData.c_root = airDropRootApi;

                const getProofAmountToBack = await axios({
                    method: "POST", // [요청 타입]
                    url: `https://admin.paykhan.io:3000/degree/changeAddress`, // [요청 주소]
                    data: JSON.stringify(backData), // [요청 데이터]
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    timeout: 3000,
                });

                await setTimeout(0);

                const canClaimApi = await AirDropContract.methods
                    .canClaim(getProofAmountToBack.data.proof, getProofAmountToBack.data.eth_amount)
                    .call({ from: account });

                const getProofToBackApi = getProofAmountToBack.data.proof;

                const getAmountToBackApi = getProofAmountToBack.data.eth_amount;

                let [canClaim, getProofToBack, getAmountToBack] = await Promise.all([canClaimApi, getProofToBackApi, getAmountToBackApi]);

                dispatch({
                    type: "GET_AIRDROP_VIEW_SUCCESS",
                    payload: {
                        canClaim: canClaim,
                        getProofToBack: getProofToBack,
                        getAmountToBack: getAmountToBack,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const airDropViewAction = { airDropViewAct };
