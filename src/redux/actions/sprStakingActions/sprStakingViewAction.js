import { SheepooriStakingContract, SheepooriStakingAddress, SheepooriTokenContract, SheepooriTokenAddress } from "../../../config/SheepooriStakingConfig";
// import {
//   SheepooriStakingContract,
//   SheepooriStakingAddress,
//   SheepooriTokenContract,
//   SheepooriTokenAddress,
// } from "../../../config/SheepooriStakingConfigTest";
import axios from "axios";
import web3 from "web3";

function sprStakingViewAct(account) {
    return async (dispatch) => {
        try {
            if (account !== "") {
                // 주소 별 스테이킹 한 토큰 아이디
                // const getTotalTokenIdsApi = await SheepooriTokenContract.methods
                //     .getTotalTokenIds(account)
                //     .call();

                // 주소 별 스테이킹 한 토큰 개수 STAKED :
                const getAmountStakedApi = await SheepooriStakingContract.methods.getAmountStaked(account).call();

                // 토큰 아이디 입력시 주인 주소 반환
                // const tokenOwner = await SheepooriStakingContract.methods
                //     .tokenOwner("tokenId")
                //     .call();

                // 스테이킹 하면 초당 받을 수 있는 보상 토큰 양
                const rewardTokenPerstakingTokenApi = await SheepooriStakingContract.methods.rewardTokenPerstakingToken().call();

                // 스테이킹 한 총 토큰 양
                const totalSupplyApi = await SheepooriStakingContract.methods.totalSupply().call();

                // 주소 별 스테이킹한 토큰 아이디 반환 getstakedTokenId 주소별 토큰 아이디 반환
                const getStakedTokenIdsApi = await SheepooriStakingContract.methods.getStakedTokenIds(account).call();

                // AllApprove 상태
                // const isApprovedForAllApi = await SheepooriTokenContract.methods
                //     .isApprovedForAll(account, SheepooriStakingAddress)
                //     .call();

                // alchemy staking token 불러오기
                // main
                const getMyTokenToBack = await axios.get(
                    `https://staking.paykhan.io:12000/alchemy/getNFTs?owner=${account}&contractAddress=${SheepooriTokenAddress}`
                );
                // test
                // const getMyTokenToBack = await axios.get(
                //   `https://staking.paykhan.io:12000/test/alchemy/getNFTs?owner=${account}&contractAddress=${SheepooriTokenAddress}`
                // );

                const getMyTokenIdsApi = getMyTokenToBack.data.data;

                for (let i = 0; i < getMyTokenIdsApi.length; i++) {
                    let myMetaDataTokenid = getMyTokenIdsApi[i];
                    let hTokenId = web3.utils.hexToNumber(myMetaDataTokenid.nft.tokenId);
                    getMyTokenIdsApi[i].tokenId = hTokenId;
                }

                // console.log(getMyTokenIdsApi,"234")

                // staking 된 tokenid의 이미지 불러오기
                // main
                const stakingTokenIdImgBack = await axios.get(
                    `https://staking.paykhan.io:12000/alchemy/getNFTImages?contractAddress=${SheepooriTokenAddress}&tokenIds=${getStakedTokenIdsApi}`
                );

                //test
                // const stakingTokenIdImgBack = await axios.get(
                //   `https://staking.paykhan.io:12000/test/alchemy/getNFTImages?contractAddress=${SheepooriTokenAddress}&tokenIds=${getStakedTokenIdsApi}`
                // );

                const stakingTokenIdImgApi = stakingTokenIdImgBack.data.data;

                // console.log(stakingTokenIdImgApi,"")

                let [
                    // getTotalTokenIds,
                    getAmountStaked,
                    // tokenOwner,
                    rewardTokenPerstakingToken,
                    totalSupply,
                    getStakedTokenIds,
                    getMyTokenIds,
                    // isApprovedForAll,
                    stakingTokenIdImg,
                ] = await Promise.all([
                    // getTotalTokenIdsApi,
                    getAmountStakedApi,
                    // tokenOwnerApi,
                    rewardTokenPerstakingTokenApi,
                    totalSupplyApi,
                    getStakedTokenIdsApi,
                    getMyTokenIdsApi,
                    // isApprovedForAllApi,
                    stakingTokenIdImgApi,
                ]);

                dispatch({
                    type: "GET_SPR_STAKING_VIEW_SUCCESS",
                    payload: {
                        // getTotalTokenIds : getTotalTokenIds,
                        getAmountStaked: getAmountStaked,
                        // tokenOwner : tokenOwner,
                        rewardTokenPerstakingToken: rewardTokenPerstakingToken,
                        totalSupply: totalSupply,
                        getStakedTokenIds: getStakedTokenIds,
                        getMyTokenIds: getMyTokenIds,
                        // isApprovedForAll : isApprovedForAll,
                        stakingTokenIdImg: stakingTokenIdImg,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const sprStakingViewAction = { sprStakingViewAct };
