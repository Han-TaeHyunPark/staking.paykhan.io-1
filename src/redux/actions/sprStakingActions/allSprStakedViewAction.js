import {
  SheepooriStakingAddress,
  SheepooriTokenAddress,
} from "../../../config/SheepooriStakingConfig";
// import {
//   SheepooriStakingAddress,
//   SheepooriTokenAddress,
// } from "../../../config/SheepooriStakingConfigTest";
import axios from "axios";
import web3 from "web3";

function allSprStakedViewAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // Sheepri All Staking get Api
        // main
        const getContractAllStakingTokenToBack = await axios.get(
          `https://staking.paykhan.io:12000/alchemy/getNFTs?owner=${SheepooriStakingAddress}`
        );

        //test
        // const getContractAllStakingTokenToBack = await axios.get(
        //   `https://staking.paykhan.io:12000/test/alchemy/getNFTs?owner=${SheepooriStakingAddress}`
        // );

        const getAllStakingTokenIdsApi =
          getContractAllStakingTokenToBack.data.data;

        const allTokenIdArrays = [];
        for (let i = 0; i < getAllStakingTokenIdsApi.length; i++) {
          let allContractMetaDataTokenid = getAllStakingTokenIdsApi[i];
          let hAllTokenId = web3.utils.hexToNumber(
            allContractMetaDataTokenid.nft.tokenId
          );
          getAllStakingTokenIdsApi[i].nft.tokenId = hAllTokenId;
          allTokenIdArrays.push(hAllTokenId);
        }

        // console.log(getAllStakingTokenIdsApi);

        // main
        const getStakingTokenImgVideoUrlToBack = await axios.get(
          `https://staking.paykhan.io:12000/alchemy/getNFTImages?contractAddress=${SheepooriTokenAddress}&tokenIds=${allTokenIdArrays}`
        );

        // test
        // const getStakingTokenImgVideoUrlToBack = await axios.get(
        //   `https://staking.paykhan.io:12000/test/alchemy/getNFTImages?contractAddress=${SheepooriTokenAddress}&tokenIds=${allTokenIdArrays}`
        // );

        // console.log(getStakingTokenIdImgVideoUrl);
        const getStakingTokenIdImgVideoUrlApi =
          getStakingTokenImgVideoUrlToBack.data.data;

        // console.log(getStakingTokenIdImgVideoUrlApi);

        let [getStakingTokenIdImgVideoUrl] = await Promise.all([
          getStakingTokenIdImgVideoUrlApi,
        ]);

        dispatch({
          type: "GET_SPR_ALL_TOKEN_VIEW_SUCCESS",
          payload: {
            getStakingTokenIdImgVideoUrl: getStakingTokenIdImgVideoUrl,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const allSprStakedViewAction = { allSprStakedViewAct };
