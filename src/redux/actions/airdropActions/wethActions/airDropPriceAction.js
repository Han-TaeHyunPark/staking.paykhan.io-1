import { AirDropAddress, AirDropContract, web3 } from "../../../../config/AirDropConfig";
// import {
//   AirDropAddress,
//   AirDropContract,
//   web3,
// } from "../../../config/AirDropConfigTest";

function airDropPriceAct() {
    return async (dispatch) => {
        try {
            const getLatestPriceApi = await AirDropContract.methods.getLatestPrice().call();

            let [getLatestPrice] = await Promise.all([getLatestPriceApi]);

            dispatch({
                type: "GET_AIRDROP_PRICE_SUCCESS",
                payload: {
                    getLatestPrice: ((getLatestPrice / 10 ** 18) * 10000000000).toFixed(2),
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export const airDropPriceAction = { airDropPriceAct };
