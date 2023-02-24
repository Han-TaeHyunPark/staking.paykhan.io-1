import { WETHContract, RewardTokenContract, ArrakisContract } from "../../../../config/StakingRakis6Config";
import Web3 from "web3";
import BigNumber from "bignumber.js";

function rakis6AirDropAprAct() {
    const AmountBN = new BigNumber("1000000000000000000");

    return async (dispatch) => {
        try {
            const WETHBalanceOfApi = await WETHContract.methods.balanceOf("0x5b42A63d6741416CE9a7B9f4f16d8c9231CcdDd4").call();

            const HanBalanceOfApi = await RewardTokenContract.methods.balanceOf("0x5b42A63d6741416CE9a7B9f4f16d8c9231CcdDd4").call();

            // // 1항
            const QuantityOfWethEqualTo1Han = Web3.utils.toWei(String((WETHBalanceOfApi / HanBalanceOfApi) * AmountBN), "ether");

            const getMintAmountsApi = await ArrakisContract.methods.getMintAmounts(QuantityOfWethEqualTo1Han, AmountBN).call();

            // // // 2항
            const AmountOfLpTokenWorth1Han = getMintAmountsApi.mintAmount / 2;

            const HanQuantityLpQuantityPerYear1HanValueApi = Web3.utils.fromWei(
                String(0.000000048445704606 * 60 * 60 * 24 * 365 * AmountOfLpTokenWorth1Han),
                "ether"
            );

            dispatch({
                type: "RAKIS6_AIRDROP_APR",
                payload: {
                    HanQuantityLpQuantityPerYear1HanValue: (HanQuantityLpQuantityPerYear1HanValueApi * 100).toFixed(2),
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const rakis6AirDropAprAction = { rakis6AirDropAprAct };
