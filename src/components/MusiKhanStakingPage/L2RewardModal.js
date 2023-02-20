import React, { useEffect, useState } from "react";
import "./L2RewardModal.scss";
import { BsX } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { L2RewardTokenListAction } from "../../redux/actions/musikhanActions/L2Actions/L2RewardTokenListAction";
import { L2RewardViewAction } from "../../redux/actions/musikhanActions/L2Actions/L2RewardViewAction";
import { L2RewardResultAction } from "../../redux/actions/musikhanActions/L2Actions/L2RewardResultAction";
import { MusiKhanLogo } from "../../img/_index";

const L2RewardModal = (props) => {
    const { open, close, header } = props;
    const [searchRewardTokenData, setSearchRewardTokenData] = useState("");
    const dispatch = useDispatch();
    const { account } = useSelector((state) => state.account);
    const { rewardTokenList } = useSelector((state) => state.musikhanL2View);

    const selectRewardTokenListToPage = (rewardTokenList) => {
        const rewardTokenName = rewardTokenList.name;
        const rewardTokenSymbol = rewardTokenList.symbol;
        const rewardTokenAmount = rewardTokenList.amountStaked;
        const rewardUnClaimedReward = rewardTokenList.unclaimedRewards;
        const rewardClaimedReward = rewardTokenList.claimedReward;
        const rewardTimeOfLastUpdate = rewardTokenList.timeOfLastUpdate;
        const rewardTokenCa = rewardTokenList.l2Ca;
        dispatch(
            L2RewardViewAction.L2RewardViewAct(
                rewardTokenName,
                rewardTokenSymbol,
                rewardUnClaimedReward,
                rewardClaimedReward,
                rewardTokenAmount,
                rewardTokenCa,
                rewardTimeOfLastUpdate
            )
        );
        dispatch(L2RewardResultAction.L2RewardResultAct(rewardTimeOfLastUpdate, rewardTokenAmount));
    };

    useEffect(() => {
        dispatch(L2RewardTokenListAction.L2RewardTokenListAct(account));
    }, [account]);

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <div className="rewardL2-ModalTopTitleContainer">
                            <div className="rewardL2-ModalTopTitleSection">
                                <a>Select token</a>
                                <BsX className="close" onClick={close} />
                            </div>
                            {/* <div className="rewardL2-ModalTokensTxtSection">
                                <a>Tokens</a>
                            </div> */}
                        </div>
                    </header>
                    <div className="rewardL2-ModalTokenInfoContainer">
                        <div className="rewardL2-ModalTokensSearchInputSection">
                            <FaSearch className="rewardL2-ModalSearchIcon" />
                            <input
                                placeholder="Search name or symbol"
                                className="rewardL2-ModalTokensSearchInput"
                                onChange={(e) => setSearchRewardTokenData(e.target.toLowerCase())}
                            ></input>
                        </div>
                        <div className="rewardL2-ModalTokenListSection">
                            <ul className="rewardL2-TokenList_PickerToken">
                                {rewardTokenList
                                    .filter(
                                        (rewardTokenList) =>
                                            rewardTokenList.name.toLowerCase().includes(searchRewardTokenData) ||
                                            rewardTokenList.symbol.toLowerCase().includes(searchRewardTokenData)
                                    )
                                    .map((rewardTokenList, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                selectRewardTokenListToPage(rewardTokenList);
                                                close();
                                            }}
                                        >
                                            <div className="rewardL2-TokenListTokenImgTextSection">
                                                <img src={MusiKhanLogo}></img>
                                                <div className="depositL2-TokenListNameSymbolSection">
                                                    <div className="depositL2-TokenListNameSection">
                                                        <h2>{rewardTokenList.name}</h2>
                                                    </div>
                                                    <div className="depositL2-TokenListSymbolSection">
                                                        <h2>{rewardTokenList.symbol}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </section>
            ) : null}
        </div>
    );
};

export default L2RewardModal;
