import React, { useState, useEffect } from "react";
import "./L1BridgeModal.scss";
import { BsX } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { L1TokenListToBackAction } from "../../redux/actions/musikhanActions/L1Actions/L1TokenListToBackAction";
import { L1MusiKhanViewAction } from "../../redux/actions/musikhanActions/L1Actions/L1MusiKhanViewAction";
import { L1TokenContractAction } from "../../redux/actions/musikhanActions/L1Actions/L1TokenContractAction";
import { L1TokenBalanceViewAction } from "../../redux/actions/musikhanActions/L1Actions/L1TokenBalanceViewAction";
import { MusiKhanLogo } from "../../img/_index";

const L1BridgeModal = (props) => {
    const dispatch = useDispatch();
    const { open, close, header } = props;
    const { account } = useSelector((state) => state.account);
    const [searchL1BridgeTokenData, setSearchL1BridgeTokenData] = useState("");
    const { L1Contract, L1TokenList, api_Status } = useSelector((state) => state.musikhanL1View);

    const selectTokenListToPage = (tokenlist) => {
        const tokenSymbol = tokenlist.symbol;
        const l1TokenAddress = tokenlist.l1Address;
        const l2TokenAddress = tokenlist.l2Address;
        dispatch(L1MusiKhanViewAction.L1MusiKhanViewAct(tokenSymbol, l1TokenAddress, l2TokenAddress));
        dispatch(L1TokenContractAction.L1TokenContractAct(l1TokenAddress));
    };

    useEffect(() => {
        dispatch(L1TokenListToBackAction.L1TokenListToBackAct());
        dispatch(L1TokenContractAction.L1TokenContractAct());
    }, []);

    useEffect(() => {
        if (api_Status) dispatch(L1TokenBalanceViewAction.L1TokenBalanceViewAct(account, L1Contract));
        return () => {
            dispatch({ type: "API_STATUS", payload: false });
        };
    }, [api_Status]);

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <div className="selectModalTopTitleContainer">
                            <div className="selectModalTopTitleSection">
                                <a>Select token</a>
                                <BsX className="close" onClick={close} />
                            </div>
                            {/* <div className="selectModalTokensTxtSection">
                                <a>Tokens</a>
                            </div> */}
                        </div>
                    </header>
                    <div className="selectModalTokenInfoContainer">
                        <div className="selectModalTokensSearchInputSection">
                            <FaSearch className="selectModalSearchIcon" />
                            {/* <input></input> */}
                            <input
                                placeholder="Search name or paste address"
                                className="selectModalTokensSearchInput"
                                onChange={(e) => setSearchL1BridgeTokenData(e.target.value.toLowerCase())}
                            ></input>
                        </div>
                        <div className="bridgeL1-ModalTokenListSection">
                            <ul className="bridgeL1-TokenList_PickerToken">
                                {L1TokenList.filter(
                                    (tokenlist) =>
                                        tokenlist.name.toLowerCase().includes(searchL1BridgeTokenData) ||
                                        tokenlist.symbol.toLowerCase().includes(searchL1BridgeTokenData)
                                ).map((tokenlist) => (
                                    <li
                                        key={tokenlist.id}
                                        onClick={() => {
                                            selectTokenListToPage(tokenlist);
                                            close();
                                        }}
                                    >
                                        <div className="bridgeL1-TokenListTokenImgTextSection">
                                            <img src={MusiKhanLogo}></img>
                                            <div className="bridgeL1-TokenListNameSymbolSection">
                                                <div className="bridgeL1-TokenListNameSection">
                                                    <h2>{tokenlist.name}</h2>
                                                </div>
                                                <div className="bridgeL1-TokenListSymbolSection">
                                                    <h2>{tokenlist.symbol}</h2>
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

export default L1BridgeModal;
