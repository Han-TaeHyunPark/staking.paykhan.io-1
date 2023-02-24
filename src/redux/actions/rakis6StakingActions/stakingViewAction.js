import { StakingContract, StakingTokenContract, RewardTokenContract, StakingAddress, WETHContract, ArrakisContract } from "../../../config/StakingRakis6Config";
// import {
//   StakingContract,
//   StakingTokenContract,
//   RewardTokenContract,
//   StakingAddress,
//   WETHContract,
//   ArrakisContract,
// } from "../../../config/StakingRakis6ConfigTest";
import web3 from "web3";
import BigNumber from "bignumber.js";

function stakingViewAct(account) {
    const AmountBN = new BigNumber("1000000000000000000");

    return async (dispatch) => {
        try {
            if (account !== "") {
                const getAmountApi = await StakingContract.methods.getAmount(account).call();

                const getRewardReleasedApi = await StakingContract.methods.getRewardReleased(account).call();

                const getBalanceApi = await StakingContract.methods.getBalance(account).call();

                const possibleRewardTokenApi = await RewardTokenContract.methods.balanceOf(StakingAddress).call();

                // 스테이킹 할 수 있는 토큰
                const stakingTokenBalanceApi = await StakingTokenContract.methods.balanceOf(account).call();

                // const allowanceRakis6Api = await StakingTokenContract.methods.allowance(account, StakingAddress).call();

                const rewardTokenBalanceApi = await RewardTokenContract.methods.balanceOf(account).call();

                const hanTokenPerLpTokenApi = await StakingContract.methods.hanTokenPerLpToken().call();

                const tokenVolumeApi = await StakingContract.methods.tokenVolume().call();

                const totalSupplyApi = await StakingContract.methods.totalSupply().call();

                const stakingTokenAmountApi = await StakingTokenContract.methods.balanceOf(account).call();

                const getWithdrawAmountApi = await StakingContract.methods.getAmount(account).call();

                const allowanceAmountApi = await StakingTokenContract.methods.allowance(account, StakingAddress).call();

                const WETHBalanceOfApi = await WETHContract.methods.balanceOf("0x5b42A63d6741416CE9a7B9f4f16d8c9231CcdDd4").call();

                const HanBalanceOfApi = await RewardTokenContract.methods.balanceOf("0x5b42A63d6741416CE9a7B9f4f16d8c9231CcdDd4").call();

                // // 1항
                const QuantityOfWethEqualTo1Han = web3.utils.toWei(String((WETHBalanceOfApi / HanBalanceOfApi) * AmountBN), "ether");

                const getMintAmountsApi = await ArrakisContract.methods.getMintAmounts(QuantityOfWethEqualTo1Han, AmountBN).call();

                // // // 2항
                const AmountOfLpTokenWorth1Han = getMintAmountsApi.mintAmount / 2;

                const HanQuantityLpQuantityPerYear1HanValueApi = web3.utils.fromWei(
                    String(0.000000274959775134 * 60 * 60 * 24 * 365 * AmountOfLpTokenWorth1Han),
                    "ether"
                );

                const canAmountStakeApi = tokenVolumeApi - totalSupplyApi;

                let [
                    getAmount,
                    stakingTokenBalance,
                    tokenVolume,
                    totalSupply,
                    canAmountStake,
                    stakingTokenAmount,
                    getWithdrawAmount,
                    hanTokenPerLpToken,
                    WETHBalanceOf,
                    HanBalanceOf,
                    allowanceAmount,
                    getMintAmounts,
                    HanQuantityLpQuantityPerYear1HanValue,
                    // allowanceRakis6,
                ] = await Promise.all([
                    getAmountApi,
                    stakingTokenBalanceApi,
                    tokenVolumeApi,
                    totalSupplyApi,
                    canAmountStakeApi,
                    stakingTokenAmountApi,
                    getWithdrawAmountApi,
                    hanTokenPerLpTokenApi,
                    WETHBalanceOfApi,
                    HanBalanceOfApi,
                    allowanceAmountApi,
                    getMintAmountsApi,
                    HanQuantityLpQuantityPerYear1HanValueApi,
                    // allowanceRakis6Api,
                ]);

                dispatch({
                    type: "GET_STAKING_VIEW_SUCCESS",
                    payload: {
                        getAmount: Math.floor((getAmount / 10 ** 18) * 100000000000000) / 100000000000000,
                        stakingTokenBalance: Math.floor((stakingTokenBalance / 10 ** 18) * 100000000000000) / 100000000000000,
                        tokenVolume: (tokenVolume / 10 ** 18).toFixed(8),
                        totalSupply: (totalSupply / 10 ** 18).toFixed(8),
                        canAmountStake: Math.floor((canAmountStake / 10 ** 18) * 100000000000000) / 100000000000000,
                        stakingTokenAmount: web3.utils.fromWei(String(stakingTokenAmount), "ether"),
                        getWithdrawAmount: web3.utils.fromWei(String(getWithdrawAmount), "ether"),
                        hanTokenPerLpToken: hanTokenPerLpToken,
                        WETHBalanceOf: (WETHBalanceOf / 10 ** 18).toFixed(8),
                        HanBalanceOf: (HanBalanceOf / 10 ** 18).toFixed(8),
                        allowanceAmount: web3.utils.fromWei(allowanceAmount, "ether"),
                        getMintAmounts: (getMintAmounts / 10 ** 18).toFixed(8),
                        HanQuantityLpQuantityPerYear1HanValue: (HanQuantityLpQuantityPerYear1HanValue * 100).toFixed(2),
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const stakingViewAction = { stakingViewAct };
