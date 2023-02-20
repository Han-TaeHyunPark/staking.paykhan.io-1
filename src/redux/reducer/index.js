import { combineReducers } from "redux";
import stakingViewReducer from "./stakingViewReducer";
import rakis6StakingResultReducer from "./rakis6StakingResultReducer";
import accountReducer from "./accountReducer";
import sprStakingViewReducer from "./sprStakingViewReducer";
import sprStakingResultReducer from "./sprStakingResultReducer";
import sprStakingApproveReducer from "./sprStakingApproveReducer";
import gasPriceResultReducer from "./gasPriceResultReducer";
import getSprTokenImgVideoReducer from "./getSprTokenImgVideoReducer";
import airDropReducer from "./airDropReducer";
import airDropLatestPriceReducer from "./airDropLatestPriceReducer";
import coinPriceReducer from "./coinPriceReducer";
import networksReducer from "./networksReducer";
import musiKhanL1TokenApproveReducer from "./musiKhanReducer/L1/musiKhanL1TokenApproveReducer";
import musiKhanL1TokenBalanceReducer from "./musiKhanReducer/L1/musiKhanL1TokenBalanceReducer";
import musiKhanL1ViewReducer from "./musiKhanReducer/L1/musiKhanL1ViewReducer";
import L2BridgeViewReducer from "./musiKhanReducer/L2/L2BridgeViewReducer";
import L2BridgeMintReducer from "./musiKhanReducer/L2/L2BridgeMintReducer";
import musikhanCaViewReducer from "./musiKhanReducer/L2/musikhanCaViewReducer";
import musikhanL2ViewReducer from "./musiKhanReducer/L2/musikhanL2ViewReducer";
import musiKhanL2TokenApproveReducer from "./musiKhanReducer/L2/musiKhanL2TokenApproveReducer";
import musikhanL2RewardReducer from "./musiKhanReducer/L2/musikhanL2RewardReducer";
import musiAirDropReducer from "./airDropReducer/musiAirDropReducer/musiAirDropReducer";
import L2SwapViewReducer from "./musiKhanReducer/L2/L2SwapViewReducer";
import L2SwapTokenBalanceReducer from "./musiKhanReducer/L2/L2SwapTokenBalanceReducer";
import L2SwapTokenApproveReducer from "./musiKhanReducer/L2/L2SwapTokenApproveReducer";

export default combineReducers({
    stakingView: stakingViewReducer,
    rakis6StakingResultView: rakis6StakingResultReducer,
    account: accountReducer,
    sprStakingView: sprStakingViewReducer,
    sprStakingResultView: sprStakingResultReducer,
    sprStakingApporveView: sprStakingApproveReducer,
    gasPrice: gasPriceResultReducer,
    allStakingToken: getSprTokenImgVideoReducer,
    airDropView: airDropReducer,
    airDropLatestPrice: airDropLatestPriceReducer,
    coinPrice: coinPriceReducer,
    networks: networksReducer,
    musiL1Approve: musiKhanL1TokenApproveReducer,
    musiL1TokenBalance: musiKhanL1TokenBalanceReducer,
    musikhanL1View: musiKhanL1ViewReducer,
    L2BridgeView: L2BridgeViewReducer,
    L2BridgeMint: L2BridgeMintReducer,
    musikhanCaView: musikhanCaViewReducer,
    musikhanL2View: musikhanL2ViewReducer,
    musiL2Approve: musiKhanL2TokenApproveReducer,
    L2RewardView: musikhanL2RewardReducer,
    musiAirDropView: musiAirDropReducer,
    L2SwapView: L2SwapViewReducer,
    L2SwapTokenBalanceView: L2SwapTokenBalanceReducer,
    L2SwapApprove: L2SwapTokenApproveReducer,
});
