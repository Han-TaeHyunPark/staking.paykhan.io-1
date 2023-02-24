import axios from "axios";
import { AirDropAddress, AirDropContract, web3 } from "../../../../config/AirDropConfig";
// import {
//   AirDropAddress,
//   AirDropContract,
//   web3,
// } from "../../../config/AirDropConfigTest";

function airDropClaimedAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                const airDropRootApi = await AirDropContract.methods.root().call();

                let backData = {};
                backData.account = account;
                backData.c_root = airDropRootApi;

                const getProofAmountToBack = await axios({
                    method: "POST", // [요청 타입]
                    url: `http://15.165.255.173:3000/degree/changeAddress`, // [요청 주소]
                    data: JSON.stringify(backData), // [요청 데이터]
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    timeout: 3000,
                });

                await setTimeout(0);

                const claimedApi = await AirDropContract.methods
                    .claimed(getProofAmountToBack.data.proof, getProofAmountToBack.data.eth_amount)
                    .call({ from: account });

                let [claimed] = await Promise.all([claimedApi]);

                dispatch({
                    type: "GET_AIRDROP_CLAIMED_SUCCESS",
                    payload: {
                        claimed: claimed,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const airDropClaimedAction = { airDropClaimedAct };
