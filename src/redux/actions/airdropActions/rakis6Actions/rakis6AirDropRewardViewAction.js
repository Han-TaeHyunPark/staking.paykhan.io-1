import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6Config";
// import { PrivateStakingContract } from "../../../../config/PrivateStakingRakis6ConfigTest";
import Web3 from "web3";

function rakis6AirDropRewardViewAct(account) {
    return async (dispatch) => {
        try {
            const getStakerData = await PrivateStakingContract.methods.getStakerData(account).call();

            const rakis6UnClaimedRewardApi = getStakerData.unclaimedReward;
            const rakis6UnClaimedRewardToEthApi = Web3.utils.fromWei(String(rakis6UnClaimedRewardApi), "ether");

            const rakis6TotalRewardReceivedApi = getStakerData.totalRewardReceived;
            const rakis6TotalRewardReceivedToEthApi = Web3.utils.fromWei(String(rakis6TotalRewardReceivedApi), "ether");

            const rakis6TotalRewardAmountToContract = getStakerData.totalAmount;
            const rakis6TotalRewardAmountApi = Web3.utils.fromWei(String(rakis6TotalRewardAmountToContract), "ether");

            let [rakis6UnClaimedRewardToEth, rakis6TotalRewardReceivedToEth, rakis6TotalRewardAmount] = await Promise.all([
                rakis6UnClaimedRewardToEthApi,
                rakis6TotalRewardReceivedToEthApi,
                rakis6TotalRewardAmountApi,
            ]);
            dispatch({
                type: "RAKIS6_REWARD_VIEW",
                payload: {
                    rakis6UnClaimedRewardToEth: rakis6UnClaimedRewardToEth,
                    rakis6TotalRewardReceivedToEth: rakis6TotalRewardReceivedToEth,
                    rakis6TotalRewardAmount: rakis6TotalRewardAmount,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export const rakis6AirDropRewardViewAcion = { rakis6AirDropRewardViewAct };
