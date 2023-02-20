import React, { useState, useEffect } from "react";
import "./L2SwapModal.scss";
import { BsX } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MusiKhanLogo } from "../../img/_index";
import { useSelector, useDispatch } from "react-redux";
import { L2SwapTokenListToBackAction } from "../../redux/actions/musikhanActions/L2Actions/L2SwapTokenListToBackAction";
import { L2SwapViewAction } from "../../redux/actions/musikhanActions/L2Actions/L2SwapViewAction";
import { L2SwapTokenContractAction } from "../../redux/actions/musikhanActions/L2Actions/L2SwapTokenContractAction";
import { L2SwapTokenBalanceAction } from "../../redux/actions/musikhanActions/L2Actions/L2SwapTokenBalanceAction";

const L2SwapModal = (props) => {
    const dispatch = useDispatch();
    const { open, close, header } = props;
    const { account } = useSelector((state) => state.account);
    const [searchSwapTokenData, setSearchSwapTokenData] = useState("");
    const { L2SwapTokenList, L2SwapContract, L2_Swap_Api_Status } = useSelector((state) => state.L2SwapView);

    const selectL2SwapTokenListToPage = (L2SwapTokenList) => {
        const L2SwapName = L2SwapTokenList.name;
        const L2SwapSymbol = L2SwapTokenList.symbol;
        const existTokenCa = L2SwapTokenList.existedTokenAddress;
        const musiSwapTokenCa = L2SwapTokenList.musikhanTokenAddress;
        dispatch(L2SwapViewAction.L2SwapViewAct(L2SwapName, L2SwapSymbol, existTokenCa, musiSwapTokenCa));
        dispatch(L2SwapTokenContractAction.L2SwapTokenContractAct(existTokenCa));
    };

    useEffect(() => {
        dispatch(L2SwapTokenListToBackAction.L2SwapTokenListToBackAct());
        dispatch(L2SwapTokenContractAction.L2SwapTokenContractAct());
    }, []);

    useEffect(() => {
        if (L2_Swap_Api_Status) dispatch(L2SwapTokenBalanceAction.L2SwapTokenBalanceAct(account, L2SwapContract));
        return () => {
            dispatch({ type: "L2_SWAP_API_STATUS", payload: false });
        };
    }, [L2_Swap_Api_Status]);
    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <div className="swapL2-ModalTopTitleContainer">
                            <div className="swapL2-ModalTopTitleSection">
                                <a>Select Token</a>
                                <BsX className="close" onClick={close} />
                            </div>

                            {/* <div className="swapL2-ModalTokensTxtSection">
                                <a>Tokens</a>
                            </div> */}
                        </div>
                    </header>
                    <div className="swapL2-ModalTokenInfoContainer">
                        <div className="swapL2-ModalTokensSearchInputSection">
                            <FaSearch className="swapL2-ModalSearchIcon" />
                            <input
                                placeholder="Search name or symbol"
                                className="swapL2-ModalTokensSearchInput"
                                onChange={(e) => setSearchSwapTokenData(e.target.value.toLowerCase())}
                            ></input>
                        </div>
                        <div className="swapL2-ModalTokenListSection">
                            <ul className="swapL2-TokenList_PickerToken">
                                {L2SwapTokenList.filter(
                                    (L2SwapTokenList) =>
                                        L2SwapTokenList.name.toLowerCase().includes(searchSwapTokenData) ||
                                        L2SwapTokenList.symbol.toLowerCase().includes(searchSwapTokenData)
                                ).map((L2SwapTokenList, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            selectL2SwapTokenListToPage(L2SwapTokenList);
                                            close();
                                        }}
                                    >
                                        <div className="swapL2-TokenListTokenImgTextSection">
                                            <img src={MusiKhanLogo}></img>
                                            <div className="swapL2-TokenListNameSymbolSection">
                                                <div className="swapL2-TokenListNameSection">
                                                    <h2>{L2SwapTokenList.name}</h2>
                                                </div>
                                                <div className="swapL2-TokenListSymbolSection">
                                                    <h2>{L2SwapTokenList.symbol}</h2>
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

export default L2SwapModal;
