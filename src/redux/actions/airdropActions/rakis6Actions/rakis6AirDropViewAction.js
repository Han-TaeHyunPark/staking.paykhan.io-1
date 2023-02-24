import { PrivateStakingTokenContract, PrivateStakingContract, PrivateStakingAddress } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingTokenContract, PrivateStakingContract, PrivateStakingAddress } from "../../../../config/PrivateStakingRakis6ConfigTest";
import Web3 from "web3";

function rakis6AirDropViewAct(account) {
    return async (dispatch) => {
        try {
            const rakis6StakingBalance = await PrivateStakingTokenContract.methods.balanceOf(account).call();
            const rakis6StakingBalanceOfApi = Web3.utils.fromWei(String(rakis6StakingBalance), "ether");

            // 컨트랙트에 유저가 총 스테이킹 할 수 있는 토큰 양 출력 함수
            const tokenQuotaToContract = await PrivateStakingContract.methods.tokenQuota().call();
            const rakis6AirDropTokenQuotaApi = Web3.utils.fromWei(String(tokenQuotaToContract), "ether");

            // 컨트랙트에 유저가 총 스테이킹 한 금액 출력 함수
            const totalSupplyToContract = await PrivateStakingContract.methods.totalSupply().call();
            const rakis6AirDropTotalSupplyApi = Web3.utils.fromWei(String(totalSupplyToContract), "ether");

            const canStakedQuatoAmountApi = rakis6AirDropTokenQuotaApi - rakis6AirDropTotalSupplyApi;

            const allowanceAirDropToContract = await PrivateStakingTokenContract.methods.allowance(account, PrivateStakingAddress).call();
            const allowanceApi = Web3.utils.fromWei(String(allowanceAirDropToContract), "ether");

            let [rakis6StakingBalanceOf, canStakedQuatoAmount, allowance] = await Promise.all([
                rakis6StakingBalanceOfApi,
                canStakedQuatoAmountApi,
                allowanceApi,
            ]);

            dispatch({
                type: "RAKIS6_AIRDROP_VIEW",
                payload: {
                    rakis6StakingBalanceOf: rakis6StakingBalanceOf,
                    canStakedQuatoAmount: canStakedQuatoAmount,
                    allowance: allowance,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const rakis6AirDropViewAction = { rakis6AirDropViewAct };
