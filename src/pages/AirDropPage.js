import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./AirDropPage.scss";
import HanLogo from "../assets/images/HanLogo.svg";
import { FiRefreshCcw } from "react-icons/fi";
import { OptimismRedLogo } from "../assets/_index";
import { connectAccount } from "../redux/actions/connectAccount";
import { WETHLogo, MunieLogoBackX, MusiKhanLogo } from "../img/_index";
import { FcCancel } from "react-icons/fc";
import { GiClick } from "react-icons/gi";
import { AirDropLoading, MusiTokenListModal } from "../components";
import { airDropClaimAction } from "../redux/actions/airdropActions/airDropClaimAction";
import { airDropViewAction } from "../redux/actions/airdropActions/airDropViewAction";
import { airDropClaimedAction } from "../redux/actions/airdropActions/airDropClaimedAction";
import { airDropPriceAction } from "../redux/actions/airdropActions/airDropPriceAction";
import { airDropTimeStampAction } from "../redux/actions/airdropActions/airDropTimeStampAction";
import { musiAirDropTimeStampAction } from "../redux/actions/airdropActions/musiActions/musiAirDropTimeStampAction";
import { musiAirDropViewAction } from "../redux/actions/airdropActions/musiActions/musiAirDropVeiwAction";
import { musiAirDropBackDataInfoAction } from "../redux/actions/airdropActions/musiActions/musiAirDropBackDataInfoAction";
import { musiAirDropClaimAction } from "../redux/actions/airdropActions/musiActions/musiAirDropClaimAction";

const AirDropPage = () => {
    const dispatch = useDispatch();
    // const [account, setAccount] = useState("");
    const [web3, setWeb3] = useState(null);
    const [error, setError] = useState();
    const [musiTokenListModal, setMusiTokenListModal] = useState(false);
    const [checkChainId, setCheckChainId] = useState("");
    const [loading, setLoading] = useState(true);
    const { account } = useSelector((state) => state.account);

    const { successAirDropClaim, canClaim, getProofToBack, getAmountToBack, claimed, claimDayDate, claimHoursDate, claimMinDate, successMusiAirDropClaim } =
        useSelector((state) => state.airDropView);

    const { gasPriceResult } = useSelector((state) => state.gasPrice);

    const { getLatestPrice } = useSelector((state) => state.airDropLatestPrice);

    const {
        musiRoot,
        musiName,
        musiSymbol,
        musiL2Ca,
        musiClaimDayDate,
        musiClaimHoursDate,
        musiClaimMinDate,
        getmusiProofToBack,
        getmusiTokenCaToBack,
        getmusiAmountToBack,
        musiCanClaim,
        musiClaimed,
    } = useSelector((state) => state.musiAirDropView);
    //---------------- Ethereum Network Switching ---------------- //
    const networks = {
        optimismTestNet: {
            chainId: `0x${Number(420).toString(16)}`,
            chainName: "Optimism Goerli",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
            },
            rpcUrls: ["https://opt-goerli.g.alchemy.com/v2/2lGr3nFlynOLUsom7cnrmg-hUtq7IcrM"],
            blockExplorerUrls: ["https://goerli-optimistic.etherscan.io"],
        },
        optimism: {
            chainId: `0x${Number(10).toString(16)}`,
            chainName: "Optimism",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
            },
            rpcUrls: ["https://mainnet.optimism.io"],
            blockExplorerUrls: ["https://optimistic.etherscan.io"],
        },
    };

    const changeNetwork = async ({ networkName, setError }) => {
        try {
            if (!window.ethereum) throw new Error("No crypto wallet found");
            await window.ethereum?.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[networkName],
                        // chainId : '0x1',
                    },
                ],
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const changeEthereumNetWork = async () => {
        await window.ethereum?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
        });
    };
    const setup = () => {
        dispatch(connectAccount.getAccount());
    };
    const handleConnectWallet = async () => {
        if (window.ethereum === undefined) {
            window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn");
        } else {
            setup();
        }
    };

    const handleNetworkSwitch = async (networkName) => {
        setError();
        await changeNetwork({ networkName, setError });
    };

    const networkChanged = (chainId) => {
        console.log({ chainId });
    };

    // add to LP token
    const addStakingToken = async () => {
        const tokenAddress = "0x6d8aA00034ECB1d2aD766117d7d35e1f94f18dE0";
        const tokenSymbol = "LP";
        const tokenDecimals = 18;
        const tokenImage = "https://github.com/sieun95/develop_note/blob/main/Arrakis%20Icon%20(monochrome).png?raw=true";

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum?.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20", // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals,
                        image: tokenImage,
                    },
                },
            });

            if (wasAdded) {
                console.log("Thanks for your interest!");
            } else {
                console.log("Your loss!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // add to Reward Token
    const addRewardToken = async () => {
        const tokenAddress = "0x0c90C57aaf95A3A87eadda6ec3974c99D786511F";
        const tokenSymbol = "HAN";
        const tokenDecimals = 18;
        const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

        try {
            const wasAdded = await window.ethereum?.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        image: tokenImage,
                    },
                },
            });

            if (wasAdded) {
                console.log("Thanks for your interest!");
            } else {
                console.log("Your loss!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.ethereum?.on("chainChanged", networkChanged);

        return () => {
            window.ethereum?.removeListener("chainChanged", networkChanged);
        };
    }, []);

    useEffect(() => {
        setup();
        window.ethereum?.on("accountsChanged", () => {
            setup();
        });
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum?.on("chainChanged", () => {
                window.location.reload();
            });
            window.ethereum?.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    });

    useEffect(() => {
        if (window.ethereum?.chainId === "0x1") {
            setCheckChainId("0x1");
        }
        if (window.ethereum?.chainId === "0xa") {
            setCheckChainId("Oxa");
        }
    }, [window.ethereum?.chainId]);

    useEffect(() => {
        setLoading(false);
    });

    const changeTimeStampState = () => {
        dispatch(airDropTimeStampAction.airDropTimeStampAct());
    };

    useEffect(() => {
        dispatch(airDropPriceAction.airDropPriceAct(account));
        dispatch(airDropViewAction.airDropViewAct(account));
        dispatch(airDropTimeStampAction.airDropTimeStampAct());
    }, [account]);

    useEffect(() => {
        dispatch(airDropClaimedAction.airDropClaimedAct(account));
    }, [account]);
    // WethClaim
    const airDropClaim = () => {
        dispatch(airDropClaimAction.airDropClaimAct(account, getProofToBack, getAmountToBack, gasPriceResult));
    };

    // MusiClaim
    const musiAirDropClaim = () => {
        dispatch(musiAirDropClaimAction.musiAirDropClaimAct(account, getmusiProofToBack, getmusiAmountToBack, getmusiTokenCaToBack));
    };

    const openMusiTokenListModal = () => {
        setMusiTokenListModal(true);
    };
    const closeMusiTokenListModal = () => {
        setMusiTokenListModal(false);
    };

    const changeMusiTimeStampState = () => {
        dispatch(musiAirDropTimeStampAction.musiAirDropTimeStampAct(musiL2Ca));
    };

    useEffect(() => {
        dispatch(musiAirDropTimeStampAction.musiAirDropTimeStampAct());
    }, []);

    useEffect(() => {
        dispatch(musiAirDropBackDataInfoAction.musiAirDropBackDataInfoAct(account));
    }, [account]);

    // console.log(successMusiAirDropClaim);

    return (
        <div className="airDropPageContainer">
            <div className="airDropPageLogoContainer">
                <img className="airDropLogo" src={HanLogo} alt="HanLogo" />
                <a>HAN e-Platform Airdrop</a>
            </div>
            <div className="airDropAmountContainer">
                <div className="airDropAmountContainer">
                    <div className="airDropAmountTitle">
                        {/* <div className="airDropAmountTxt">
              <a>1 WETH = {getLatestPrice} USD</a>
            </div> */}

                        {/* <div className="tooltip-container">
              <i className="info-icon material-icons">
                <HelpIcon />
              </i>
              <div className="tooltip-content">
                <span>
                  The right to possess digital content forever and get yourself
                  a Sheepoori card -Ms. Caring one of three sheep siblings
                  characters from Sewoori Union for AdKhan: Advertising Platform
                </span>
                <span className="align-right">
                  {" "}
                  <a
                    href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3"
                    target="_blank"
                  >
                    Read More
                  </a>
                </span>
              </div>
            </div> */}
                    </div>
                </div>
            </div>
            <Tabs className="Tabs">
                {/* <div className="stakedSprCanAmountSection">
          <p>STAKED : {getAmountStaked} </p>
        </div> */}
                {account === "" ? (
                    <div className="connectAirDropMetaWalletSection">
                        <a className="social-button button--social-login button--google" href="#">
                            <img
                                width="20px"
                                height="20px"
                                src="https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg"
                                className="social-icon fa fa-google"
                            ></img>
                            <p onClick={handleConnectWallet}>Connect Wallet</p>
                        </a>
                    </div>
                ) : checkChainId === "0x1" ? (
                    <div className="connectAirDropEtherWalletSection">
                        <a className="social-button button--social-login button--google" href="#">
                            <img
                                width="20px"
                                height="20px"
                                src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                                className="social-icon fa fa-google"
                            ></img>
                            {account.substr(0, 6)}...{account.slice(-6)}
                        </a>
                    </div>
                ) : checkChainId === "Oxa" ? (
                    <div className="connectOptiComWalletSection">
                        <a className="social-button button--social-login button--google" href="#">
                            <img width="20px" height="20px" src={OptimismRedLogo} className="social-icon fa fa-google"></img>
                            {account.substr(0, 6)}...{account.slice(-6)}
                        </a>
                    </div>
                ) : (
                    <div className="cantConnectAirDropWalletSection">
                        <a className="social-button button--social-login button--google" href="#" onClick={() => handleNetworkSwitch("optimism")}>
                            <FcCancel className="social-icon fa fa-google" />
                            {account.substr(0, 6)}...{account.slice(-6)}
                        </a>
                    </div>
                )}
                <TabList>{/* <Tab className="airDropTitleContainer">AIRDROP</Tab> */}</TabList>
                <TabPanel>
                    <div className="airDropTabContainer">
                        {/* {getLatestPrice ? ( */}
                        <div className="airDropTabSection">
                            {getLatestPrice ? (
                                <div className="airDropWethSection">
                                    <div className="airDropWethLogoSection">
                                        <img src={WETHLogo} />
                                    </div>
                                    <div className="airDropWethTxt">
                                        <p>WETH</p>
                                    </div>
                                    {checkChainId === "Oxa" ? (
                                        canClaim === true ? (
                                            <div className="airDropWethBtn">
                                                <button className="weth-learn-more" onClick={airDropClaim}>
                                                    Claim
                                                </button>
                                            </div>
                                        ) : claimed === true ? (
                                            <div className="airDropWethBtn">
                                                <button className="cant-weth-learn-more" disabled={true}>
                                                    Already Claimed
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="airDropWethBtn">
                                                <button className="cant-weth-learn-more" disabled={true}>
                                                    Nothing to Claim
                                                </button>
                                            </div>
                                        )
                                    ) : (
                                        <div className="airDropWethBtn">
                                            <button className="switch-weth-learn-more" disabled={true}>
                                                Switch to Optimism
                                            </button>
                                        </div>
                                    )}
                                    <div className="airDropWethTimeStampSection">
                                        <div className="airDropWethTimeStampTitle">
                                            <a>Remaining Duration</a>
                                        </div>
                                        <div className="airDropWethTimeStampInfo">
                                            <a className="wethDayDate">{claimDayDate}D</a>
                                            <a className="wethHoursDate">{claimHoursDate}H</a>
                                            <a className="wethMinDate">{claimMinDate}M</a>
                                            {/* <a> */}
                                            <FiRefreshCcw className="airDropWethReFreshTimeStamp" onClick={changeTimeStampState} />
                                            {/* </a> */}
                                        </div>
                                        <p></p>
                                    </div>
                                    <div className="airDropWethPriceSection">
                                        <a>1 WETH = {getLatestPrice} USD</a>
                                    </div>
                                </div>
                            ) : (
                                <div className="airDropWethLoadingSection">
                                    <AirDropLoading />
                                </div>
                            )}
                            {getLatestPrice ? (
                                <div className="airDropMusikhanSection">
                                    <div className="airDropMusiKhanLogoSection">
                                        <img src={MusiKhanLogo} />
                                    </div>
                                    {musiSymbol ? (
                                        <div className="airDropMusiTxt">
                                            <p>{musiSymbol}</p>
                                        </div>
                                    ) : (
                                        <div className="airDropMusiTxt">
                                            <p>MusiKhan</p>
                                        </div>
                                    )}

                                    {musiSymbol === "" ? (
                                        <div className="musiBeforePickerSection">
                                            <button className="musiAirDropBeforePicker_SelectBtn" onClick={openMusiTokenListModal}>
                                                {/* <img src={MusiKhanLogo}></img> */}
                                                <span></span>
                                                <GiClick size="20" className="modalClickIcon" />
                                            </button>
                                            <MusiTokenListModal
                                                open={musiTokenListModal}
                                                close={closeMusiTokenListModal}
                                                header="Modal heading"
                                            ></MusiTokenListModal>
                                        </div>
                                    ) : (
                                        <div className="musiAfterPickerSection">
                                            <button className="musiAirDropAfterPicker_SelectBtn" onClick={openMusiTokenListModal}>
                                                {/* <img src={MusiKhanLogo}></img> */}
                                                <span></span>
                                                <GiClick size="20" className="modalClickIcon" />
                                            </button>
                                            <MusiTokenListModal
                                                open={musiTokenListModal}
                                                close={closeMusiTokenListModal}
                                                header="Modal heading"
                                            ></MusiTokenListModal>
                                        </div>
                                    )}
                                    {checkChainId === "Oxa" ? (
                                        musiCanClaim === true ? (
                                            <div className="airDropMusiBtn">
                                                <button className="musi-learn-more" onClick={musiAirDropClaim}>
                                                    Claim
                                                </button>
                                            </div>
                                        ) : musiClaimed === true ? (
                                            <div className="airDropMusiBtn">
                                                <button className="cant-musi-learn-more" disabled={true}>
                                                    Already Claimed
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="airDropMusiBtn">
                                                <button className="cant-musi-learn-more" disabled={true}>
                                                    Nothing to Claim
                                                </button>
                                            </div>
                                        )
                                    ) : (
                                        <div className="airDropMusiBtn">
                                            <button className="switch-musi-learn-more" disabled={true}>
                                                Switch to Optimism
                                            </button>
                                        </div>
                                    )}

                                    <div className="airDropMusiTimeStampSection">
                                        <div className="airDropMusiTimeStampTitle">
                                            <a>Remaining Duration</a>
                                        </div>
                                        {musiClaimDayDate ? (
                                            <div className="airDropMusiTimeStampInfo">
                                                <a className="musiDayDate">{musiClaimDayDate}D</a>
                                                <a className="musiHoursDate">{musiClaimHoursDate}H</a>
                                                <a className="musiMinDate">{musiClaimMinDate}M</a>
                                                <FiRefreshCcw className="airDropMusiReFreshTimeStamp" onClick={changeMusiTimeStampState} />
                                            </div>
                                        ) : (
                                            <div className="airDropMusiTimeStampInfo">
                                                <a className="musiDayDate">N/A</a>
                                                <a className="musiHoursDate">N/A</a>
                                                <a className="musiMinDate">N/A</a>
                                                <FiRefreshCcw
                                                    className="airDropCantMusiReFreshTimeStamp"
                                                    // onClick={changeMusiTimeStampState}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="airDropWethLoadingSection">
                                    <AirDropLoading />
                                </div>
                            )}

                            <div className="airDropMuniSection">
                                <div className="airDropMunieLogoSection">
                                    <img src={MunieLogoBackX} />
                                </div>
                                <div className="airDropMuniTxt">
                                    <p>NFT Munie</p>
                                </div>

                                <div className="airDropMuniBtn">
                                    <button className="cant-muni-learn-more" disabled={true}>
                                        Coming Soon
                                    </button>
                                </div>
                                <div className="airDropMuniTimeStampSection">
                                    <div className="airDropMuniTimeStampTitle">
                                        <a>Remaining Duration</a>
                                    </div>
                                    <div className="airDropMuniTimeStampInfo">
                                        <a className="muniDayDate">28D</a>
                                        <a className="muniHoursDate">00H</a>
                                        <a className="muniMinDate">00M</a>
                                        <FiRefreshCcw
                                            className="airDropMuniReFreshTimeStamp"
                                            // onClick={changeTimeStampState}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ) : (
              <div className="airDropLoadingSection">
                <Loading />
              </div>
            )} */}
                        <div className="airDropBottomLineSection">
                            <hr className="bottomHr"></hr>
                        </div>
                    </div>
                </TabPanel>
                <div className="logoContainer">
                    <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" onClick={changeEthereumNetWork} className="opIcon" />
                    <img src={OptimismRedLogo} onClick={() => handleNetworkSwitch("optimism")} className="opIcon" />
                    <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                </div>
            </Tabs>
        </div>
    );
};

export default AirDropPage;
