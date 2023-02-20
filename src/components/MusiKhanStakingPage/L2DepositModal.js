import React, { useEffect, useState } from "react";
import "./L2DepositModal.scss";
import { BsX } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { L2MusikhanMintingCaAction } from "../../redux/actions/musikhanActions/L2Actions/L2MusikhanMintingCaAction";
import { L2MusikhanViewAction } from "../../redux/actions/musikhanActions/L2Actions/L2MusikhanViewAction";
import { L2TokenContractAction } from "../../redux/actions/musikhanActions/L2Actions/L2TokenContractAction";
import { L2DepositTokenBalanceAction } from "../../redux/actions/musikhanActions/L2Actions/L2DepositTokenBalanceAction";
import { MusiKhanLogo } from "../../img/_index";

const L2DepositModal = (props) => {
    const { open, close, header } = props;
    const dispatch = useDispatch();
    const { account } = useSelector((state) => state.account);
    const [searchDepositTokenData, setSearchDepositTokenData] = useState("");
    const { l2DepositTokenList } = useSelector((state) => state.musikhanCaView);
    const { deposit_Api_Status, L2Contract } = useSelector((state) => state.musikhanL2View);

    const selectDepositTokenListToPage = (dePositTokenlist) => {
        const l2TokenAddress = dePositTokenlist.l2Ca;
        const l2TokenSymbol = dePositTokenlist.symbol;
        dispatch(L2MusikhanViewAction.L2MusikhanViewAct(l2TokenSymbol, l2TokenAddress));
        dispatch(L2TokenContractAction.L2TokenContractAct(l2TokenAddress));
    };
    useEffect(() => {
        dispatch(L2MusikhanMintingCaAction.L2MusikhanMintingCaAct(account));
        dispatch(L2TokenContractAction.L2TokenContractAct());
    }, [account]);

    useEffect(() => {
        if (deposit_Api_Status) dispatch(L2DepositTokenBalanceAction.L2DepositTokenBalanceAct(account, L2Contract));
        return () => {
            dispatch({ type: "DEPOSIT_API_STATUS", payload: false });
        };
    }, [deposit_Api_Status]);

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <div className="depositL2-ModalTopTitleContainer">
                            <div className="depositL2-ModalTopTitleSection">
                                <a>Select token</a>
                                <BsX className="close" onClick={close} />
                            </div>

                            {/* <div className="depositL2-ModalTokensTxtSection">
                                <a>Tokens</a>
                            </div> */}
                        </div>
                    </header>
                    <div className="depositL2-ModalTokenInfoContainer">
                        <div className="depositL2-ModalTokensSearchInputSection">
                            <FaSearch className="depositL2-ModalSearchIcon" />
                            <input
                                placeholder="Search name or symbol"
                                className="depositL2-ModalTokensSearchInput"
                                onChange={(e) => setSearchDepositTokenData(e.target.toLowerCase())}
                            ></input>
                        </div>
                        <div className="depositL2-ModalTokenListSection">
                            <ul className="depositL2-TokenList_PickerToken">
                                {l2DepositTokenList
                                    .filter(
                                        (dePositTokenlist) =>
                                            dePositTokenlist.name.toLowerCase().includes(searchDepositTokenData) ||
                                            dePositTokenlist.symbol.toLowerCase().includes(searchDepositTokenData)
                                    )
                                    .map((dePositTokenlist, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                selectDepositTokenListToPage(dePositTokenlist);
                                                close();
                                            }}
                                        >
                                            <div className="depositL2-TokenListTokenImgTextSection">
                                                <img src={MusiKhanLogo}></img>
                                                <div className="depositL2-TokenListNameSymbolSection">
                                                    <div className="depositL2-TokenListNameSection">
                                                        <h2>{dePositTokenlist.name}</h2>
                                                    </div>
                                                    <div className="depositL2-TokenListSymbolSection">
                                                        <h2>{dePositTokenlist.symbol}</h2>
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

export default L2DepositModal;
