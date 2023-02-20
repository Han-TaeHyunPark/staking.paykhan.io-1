import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Web3 from "web3";
import "./MusikhanStakingPage.scss";
import { OptimismRedLogo, ArrakisBlackIcon, HanLogo, MusiLogoXBack } from "../assets/_index";
import { FcCancel } from "react-icons/fc";
import { networksAction } from "./../redux/actions/networksAction";
import { connectAccount } from "../redux/actions/connectAccount";
import { MdKeyboardArrowDown } from "react-icons/md";
import { L1BridgeModal, L2DepositModal, L2RewardModal, L2SwapModal, L2WithdrawModal, Loading } from "../components";
import { MusiKhanLogo } from "../img/_index";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { L1TokenApproveAction } from "../redux/actions/musikhanActions/L1Actions/L1TokenApproveAction";
import { L1SendTokenAction } from "../redux/actions/musikhanActions/L1Actions/L1SendTokenAction";
import { L2BridgeMintAction } from "../redux/actions/musikhanActions/L2Actions/L2BridgeMintAction";
import { L2MusikhanApproveAction } from "../redux/actions/musikhanActions/L2Actions/L2MusikhanApproveAction";
import { L2MusikhanStakingAction } from "../redux/actions/musikhanActions/L2Actions/L2MusikhanStakingAction";
import { L2BridgeL1TokenInfoAction } from "../redux/actions/musikhanActions/L2Actions/L2BridgeL1TokenInfoAction";
import { L2MusikhanViewAction } from "../redux/actions/musikhanActions/L2Actions/L2MusikhanViewAction";
import { L2MusikhanUnStakingAction } from "../redux/actions/musikhanActions/L2Actions/L2MusikhanUnStakingAction";
import { L2RewardViewAction } from "../redux/actions/musikhanActions/L2Actions/L2RewardViewAction";
import { L2MusikhanClaimAction } from "../redux/actions/musikhanActions/L2Actions/L2MusikhanClaimAction";
import { L2RewardTotalAction } from "../redux/actions/musikhanActions/L2Actions/L2RewardTotalAction";
import { L2RewardResultAction } from "../redux/actions/musikhanActions/L2Actions/L2RewardResultAction";
import { L2SwapApproveAction } from "../redux/actions/musikhanActions/L2Actions/L2SwapApproveAction";
import { L2SwapTokenSwapAction } from "../redux/actions/musikhanActions/L2Actions/L2SwapTokenSwapAction";

const MusikhanStakingPage = () => {
    const dispatch = useDispatch();
    const [tokenModal, setTokenModal] = useState(false);
    const [l1TimerModal, setL1TimerModal] = useState(false);
    const [musiL2BridgeModal, setMusiL2BridgeModal] = useState(false);
    const [musiL2DepositModal, setMusiL2DepositModal] = useState(false);
    const [musiL2RewardModal, setMusiL2RewardModal] = useState(false);
    const [musiL2WithdrawModal, setMusiL2WithdrawModal] = useState(false);
    const [musiL2SwapModal, setMusiL2SwapModal] = useState(false);
    const [tokenL1BalanceOf, setTokenL1BalanceOf] = useState("");
    const [tokenL2SwapBalanceOf, setTokenL2BalanceOf] = useState("");
    const [bridgeL2TokenBalance, setBridgeL2TokenBalance] = useState("");
    const [checkChainId, setCheckChainId] = useState("");
    const [stakingAmount, setStakingAmount] = useState("");
    const [unStakingAmount, setUnStakingAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const outSide = useRef();

    const { networks } = useSelector((state) => state.networks);
    const { account } = useSelector((state) => state.account);
    // L1
    const { L1TokenBalanceOf } = useSelector((state) => state.musiL1TokenBalance);
    const { L1TokenSymbol, L1TokenAddress, L2TokenAddressUseL1, L1Contract } = useSelector((state) => state.musikhanL1View);
    const { successL1TokenApprove } = useSelector((state) => state.musiL1Approve);

    // L2 Bridge
    const { getL1TokenInfo, mintL2TokenName, mintL2TokenSymbol, getL1TokenAmount, getL1TokenL1Ca, getL1TokenL2Ca } = useSelector((state) => state.L2BridgeView);
    const changeEthereumNetWork = () => {
        dispatch(networksAction.changeEthereumNetWorkAct());
    };

    //L2 Deposit
    const { L2DepositTokenSymbol, L2DepositBalance, L2DepositTokenCa, L2Contract, L2WithdrawTokenSymbol, L2WithdrawAmountStaked, L2WithdrawTokenCa } =
        useSelector((state) => state.musikhanL2View);
    const { successL2TokenApprove } = useSelector((state) => state.musiL2Approve);

    const handleNetworkSwitch = async (networkName) => {
        dispatch(networksAction.changeNetworkAct({ networks, networkName }));
    };

    //L2 Reward
    const {
        rewardTokenName,
        rewardTokenSymbol,
        rewardUnClaimedReward,
        rewardClaimedReward,
        rewardTokenAmount,
        musiResultValue,
        rewardTokenCa,
        totalRewardToken,
        rewardListTime,
    } = useSelector((state) => state.L2RewardView);

    // L2 Minting
    const { successL2Minting } = useSelector((state) => state.L2BridgeMint);

    // L2 Swap
    const { L2SwapName, L2SwapSymbol, L2SwapExistTokenCa, L2SwapTokenCa, L2SwapContract } = useSelector((state) => state.L2SwapView);
    const { L2SwapTokenBalance } = useSelector((state) => state.L2SwapTokenBalanceView);
    const { successL2SwapTokenApprove } = useSelector((state) => state.L2SwapApprove);
    const changeMusiRewardState = () => {
        dispatch(L2RewardResultAction.L2RewardResultAct(rewardListTime, rewardTokenAmount));
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

    // add to Reward Token
    const addRewardToken = async () => {
        const tokenAddress = "0xC7483FbDB5c03E785617a638E0f22a08da10084B";
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
        setup();
        window.ethereum?.on("chainChanged", () => {
            window.location.reload();
        });
        window.ethereum?.on("accountsChanged", () => {
            setup();
            window.location.reload();
        });
    }, [window.ethereum]);

    useEffect(() => {
        // dispatch(musikhanViewAction.getL1TokenListAct());
        dispatch(networksAction.networksAct());
    }, []);

    useEffect(() => {
        if (window.ethereum?.chainId === "0x1") {
            setCheckChainId("0x1");
        }
        if (window.ethereum?.chainId === "0xa") {
            setCheckChainId("Oxa");
        }
        if (window.ethereum?.chainId === "0x5") {
            setCheckChainId("0x5");
        }
        if (window.ethereum?.chainId === "0x1a4") {
            setCheckChainId("0x1a4");
        }
    }, [window.ethereum?.chainId]);

    //L1TokenApporve
    const setL1TokenApprove = () => {
        dispatch(L1TokenApproveAction.L1TokenApproveAct(account, L1TokenBalanceOf, L1Contract));
    };
    //L1TokenTransfer
    const sendL1TokenToL2 = () => {
        dispatch(L1SendTokenAction.L1SendTokenAct(account, L1TokenAddress, L2TokenAddressUseL1));
    };
    // L1 ChangeTokenBalance
    const changeL1TokenBalance = (e) => {
        setTokenL1BalanceOf(e.target.value);
    };

    //L2TokenApprove
    const setL2TokenApprove = () => {
        let l2StakingAmountSet = document.getElementById("maxStakingAmount").value;
        const stakingnum = l2StakingAmountSet;
        // const stakingnum = Web3.utils.toWei(String(stakingAmountSet), "ether");
        dispatch(L2MusikhanApproveAction.L2MusikhanApproveAct(account, stakingnum, L2Contract));
    };

    //L2TokenStaking
    const setL2TokenStaking = () => {
        let l2StakingAmountSet = document.getElementById("maxStakingAmount").value;
        const stakingnum = l2StakingAmountSet;
        // const stakingnum = Web3.utils.toWei(String(l2StakingAmountSet), "ether");
        dispatch(L2MusikhanStakingAction.L2MusikhanStakingAct(account, L2DepositTokenCa, stakingnum));
    };

    //L2TokenUnStaking
    const setL2TokenUnStaking = () => {
        let l2UnStakingAmountSet = document.getElementById("maxUnStakingAmount").value;
        const unStakingNum = l2UnStakingAmountSet;
        dispatch(L2MusikhanUnStakingAction.L2MusikhanUnStakingAct(account, L2WithdrawTokenCa, unStakingNum));
    };

    //L2TokenClaim
    const setL2TokenClaim = () => {
        dispatch(L2MusikhanClaimAction.L2MusikhanClaimAct(account, rewardTokenCa));
    };

    //L2StakingAmount
    const changeL2StakingAmount = (e) => {
        const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
        if (pattern.test(e.target.value)) {
            setStakingAmount(e.target.value);
        }
    };

    //L2StakingMaxAmount
    const changeL2MaxStakingAmount = () => {
        setStakingAmount(L2DepositBalance);
    };

    //L2UnStakingAmount
    const changeL2UnStakingAmount = (e) => {
        const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
        if (pattern.test(e.target.value)) {
            setUnStakingAmount(e.target.value);
        }
    };

    //L2Swap TokenApporve
    const setL2SwapTokenApprove = () => {
        dispatch(L2SwapApproveAction.L2SwapApproveAct(account, L2SwapTokenBalance, L2SwapContract));
    };

    //L2SwapTokenSwap
    const setSwapL2TokenToL2 = () => {
        dispatch(L2SwapTokenSwapAction.L2SwapTokenSwapAct(account, L2SwapExistTokenCa, L2SwapTokenCa));
    };

    // L2 Swap ChangeTokenBalance
    const changeL2SwapTokenBalance = (e) => {
        setTokenL2BalanceOf(e.target.value);
    };

    const changeL2MaxUnStakingAmount = (e) => {
        setUnStakingAmount(L2WithdrawAmountStaked);
    };
    // L1 Modal
    const openSelectTokenModal = () => {
        setTokenModal(true);
    };
    const closeSelectTokenModal = () => {
        setTokenModal(false);
    };

    const l2TokenMinting = () => {
        dispatch(L2BridgeMintAction.L2BridgeMintAct(account, getL1TokenL2Ca));
    };

    // L2 Deposit Modal
    const openL2DepositModal = () => {
        setMusiL2DepositModal(true);
    };
    const closeL2DepositModal = () => {
        setMusiL2DepositModal(false);
    };
    // L2 Reward Modal
    const openL2RewardModal = () => {
        setMusiL2RewardModal(true);
    };
    const closeL2RewardModal = () => {
        setMusiL2RewardModal(false);
    };

    // L2 Withdraw Modal
    const openL2WithdrawModal = () => {
        setMusiL2WithdrawModal(true);
    };
    const closeL2WithdrawModal = () => {
        setMusiL2WithdrawModal(false);
    };

    // L2 Swap Modal

    const openL2SwapModal = () => {
        setMusiL2SwapModal(true);
    };

    const closeL2SwapModal = () => {
        setMusiL2SwapModal(false);
    };

    useEffect(() => {
        dispatch(L2BridgeL1TokenInfoAction.L2BridgeL1TokenInfoAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(L2RewardTotalAction.L2RewardTotalAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(L2RewardViewAction.L2RewardViewAct());
    }, []);

    useEffect(() => {
        dispatch(L2RewardResultAction.L2RewardResultAct());
    }, []);

    return (
        <div className="musiStakingPageContainer">
            {checkChainId === "0x1" ? (
                // Ethereum
                <div className="musiStakingPageEthLogoContainer">
                    <img className="stakingmusiEthLogo" src={HanLogo} alt="HanLogo" />
                    <a>BRIDGE TO OPTIMSIM</a>
                </div>
            ) : checkChainId === "Oxa" ? (
                // Optimism
                <div>
                    <div className="musiStakingPageOpLogoContainer">
                        <img className="stakingMusiOpLogo" src={MusiKhanLogo} alt="MusiLogo" />
                        <a>MUSIKHAN STAKING</a>
                    </div>
                    <div className="stakingMusiAllAmountContainer">
                        <div className="stakingMusiAmountContainer">
                            <div className="stakingMusiAmountTitle">
                                <div className="stakingMusiAmountTxt">
                                    <a>0.000000002314814815 HAN</a>
                                </div>
                                {/* <div className="tooltip-container">
                  <i className="info-icon material-icons">
                    <HelpIcon />
                  </i>
                  <div className="tooltip-content">
                    <span>
                      The right to possess digital content forever and get
                      yourself a Sheepoori card -Ms. Caring one of three sheep
                      siblings characters from Sewoori Union for AdKhan:
                      Advertising Platform
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
                            <div className="stakingSprAmountNum">
                                <a>for each MKN per second</a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Others NetWork
                <div>
                    <div className="musiStakingPageOpLogoContainer">
                        <img className="stakingMusiOpLogo" src={MusiKhanLogo} alt="MusiLogo" />
                        <a>MUSIKHAN STAKING</a>
                    </div>
                    <div className="stakingMusiAllAmountContainer">
                        <div className="stakingMusiAmountContainer">
                            <div className="stakingMusiAmountTitle">
                                <div className="stakingMusiAmountTxt">
                                    <a>0.000000002314814815 HAN</a>
                                </div>
                            </div>
                            <div className="stakingSprAmountNum">
                                <a>for each MKN per second</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Tabs className="Tabs">
                {account === "" ? (
                    // Connect Wallet
                    <div className="connectMusiWalletSection">
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
                ) : window.ethereum?.chainId === "0x1" ? (
                    // Ethereum
                    <div className="connectMusiComWalletSection">
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
                    // Optimsim
                    <div className="connectOptiComWalletSection">
                        <a className="social-button button--social-login button--google" href="#">
                            <img width="20px" height="20px" src={OptimismRedLogo} className="social-icon fa fa-google"></img>
                            {account.substr(0, 6)}...{account.slice(-6)}
                        </a>
                    </div>
                ) : (
                    <div className="cantConnectMusiWalletSection">
                        <p className="cantConnetMusiTxt">Please swith the network</p>
                        <a className="social-button button--social-login button--google" href="#" onClick={changeEthereumNetWork}>
                            <FcCancel className="social-icon fa fa-google" />
                            {account.substr(0, 6)}...{account.slice(-6)}
                        </a>
                    </div>
                )}
                {checkChainId === "0x1" ? (
                    // Ethereum
                    <TabList></TabList>
                ) : checkChainId === "Oxa" ? (
                    // Optimsim
                    <TabList>
                        <Tab>DEPOSIT</Tab>
                        <Tab>REWARDS</Tab>
                        <Tab>WITHDRAW</Tab>
                        <Tab>MINT</Tab>
                        <Tab>SWAP</Tab>
                    </TabList>
                ) : (
                    // Others NetWork
                    <TabList>
                        <Tab>DEPOSIT</Tab>
                        <Tab>REWARDS</Tab>
                        <Tab>WITHDRAW</Tab>
                        <Tab>BRIDGE</Tab>
                    </TabList>
                )}
                <TabPanel>
                    {checkChainId === "0x1" ? (
                        // Ethereum Bridge Section (Optimsim Deposit)
                        <div className="musiStakingBridgeContainer">
                            <div className="musiStakingBridgeSection">
                                <div className="musiStakingBirdgeTitleSection">
                                    <a className="musiStakingTitleTxt">From</a>
                                    <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" className="musiStakingMainNetImg" />
                                    <a className="musiStakingMainTxt">Ethereum Mainnet</a>
                                </div>
                                <div className="musiStakingBridgeAmountSection">
                                    <input type="number" placeholder="0.0" min="0" onChange={changeL1TokenBalance} value={L1TokenBalanceOf} disabled></input>

                                    <div className="musiStakingBridgePickerSection">
                                        {successL1TokenApprove === false ? (
                                            <button className="musiStakingBridgePicker_SelectBtn" onClick={openSelectTokenModal}>
                                                <img src={MusiKhanLogo}></img>
                                                <span>{L1TokenSymbol}</span>
                                                <MdKeyboardArrowDown size="15" />
                                            </button>
                                        ) : (
                                            <button className="musiStakingBridgePicker_2SelectBtn">
                                                <img src={MusiKhanLogo}></img>
                                                <span>{L1TokenSymbol}</span>
                                                {/* <MdKeyboardArrowDown size="15" /> */}
                                            </button>
                                        )}

                                        <L1BridgeModal open={tokenModal} close={closeSelectTokenModal} header="Modal heading"></L1BridgeModal>
                                    </div>
                                </div>
                                <div className="musiStakingBridgeArrowSection">
                                    <AiOutlineArrowDown />
                                </div>
                                <div className="musiStakingBirdgeOpTitleSection">
                                    <a className="musiStakingOpTitleTxt">To</a>
                                    <img src={OptimismRedLogo} className="musiStakingOpImg" />
                                    <a className="musiStakingOpTxt">Optimsim</a>
                                </div>
                                {L1TokenBalanceOf === "" ? (
                                    <>
                                        <div className="musiStakingBridegeSwitchBtnSection">
                                            <button className="can-Musi-mainEth-learn-more">SELECT TOKEN</button>
                                        </div>
                                    </>
                                ) : L1TokenBalanceOf === "0" ? (
                                    <div className="musiStakingBridegeSwitchBtnSection">
                                        <button className="cant-Musi-mainEth-learn-more" disabled={true}>
                                            INSUFFICIENT TOKEN BALANCE
                                        </button>
                                    </div>
                                ) : successL1TokenApprove === false ? (
                                    <>
                                        <div className="musiStakingBridegeSwitchBtnSection">
                                            <button className="musi-mainEth-learn-more" onClick={setL1TokenApprove}>
                                                APPORVE
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="musiStakingBridegeSwitchBtnSection">
                                            <button className="musi-mainEth-learn-more" onClick={sendL1TokenToL2}>
                                                DEPOSIT
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="musiStakingEthBottomLineSection">
                                <hr className="ethBottomHr"></hr>
                            </div>
                        </div>
                    ) : checkChainId === "Oxa" ? (
                        // Optimism Deposit Section
                        <div className="musiStakingL2DepositContainer">
                            <div className="musiStakingL2DepositSection">
                                <>
                                    <div className="musiStakingL2DepositAmountSection">
                                        <div className="musiStakingL2DepositAmountTitleSection">
                                            <p>
                                                Availave: {L2DepositBalance} {L2DepositTokenSymbol}
                                            </p>
                                            <button className="amountMusiMaxBtn" onClick={changeL2MaxStakingAmount}>
                                                Max
                                            </button>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            min="0"
                                            step="0.0000000000000000001"
                                            id="maxStakingAmount"
                                            onChange={changeL2StakingAmount}
                                            value={stakingAmount}
                                        ></input>
                                        <div className="musiStakingL2DepositPickerSection">
                                            <button className="musiStakingL2DepositPicker_SelectBtn" onClick={openL2DepositModal}>
                                                <img src={MusiKhanLogo}></img>
                                                <span>{L2DepositTokenSymbol}</span>
                                                <MdKeyboardArrowDown size="15" />
                                            </button>
                                            <L2DepositModal open={musiL2DepositModal} close={closeL2DepositModal} header="Modal heading"></L2DepositModal>
                                        </div>
                                    </div>
                                    <div className="musiStakingL2DepositSwitchBtnSection">
                                        <button className="musi-L2Deposit-Enter-learn-more">COMING SOON</button>
                                    </div>
                                </>
                            </div>
                        </div>
                    ) : (
                        // Others Network Deposit Section
                        <div className="cantConnectNetWorkContainer">
                            <Loading />
                        </div>
                    )}
                </TabPanel>
                <TabPanel>
                    {checkChainId === "0x1" ? (
                        // Ethereum Rewards Section
                        <div>
                            <h3>MainNet</h3>
                        </div>
                    ) : checkChainId === "Oxa" ? (
                        // Optimism Rewards Section
                        <div>
                            <div className="allMusiRewardsCumulativeSection">
                                <p>
                                    Estimated Interest : {musiResultValue}
                                    <FiRefreshCcw className="allOpRefreshClaimIcon" onClick={changeMusiRewardState} />
                                    HAN
                                </p>
                            </div>
                            <div className="amountMusiTokenRewardAccSection">
                                <p>Accumulated Interest : {rewardUnClaimedReward} HAN</p>
                            </div>
                            <div className="amountMusiTokenRewardTxtSection">
                                <p>Rewarded Interest : {rewardClaimedReward} HAN </p>
                            </div>
                            <div className="amountMusiTotalRewardTxtSection">
                                <p>Total Rewarded Interest : {totalRewardToken} HAN</p>
                            </div>
                            <div className="rewardsMusiClaimBtnSection">
                                {rewardTokenName === "" ? (
                                    <button className="musi-oPBefore-SelectToken-Claim" onClick={openL2RewardModal}>
                                        SELECT TOKEN
                                    </button>
                                ) : (
                                    <button className="musi-OpAfter-SelectToken-Claim" onClick={openL2RewardModal}>
                                        {rewardTokenName}
                                    </button>
                                )}

                                {musiResultValue + rewardUnClaimedReward <= 0 ? (
                                    <button className="cant-Musi-opClaim-learn-more" disabled={true}>
                                        NOTHING TO CLAIM
                                    </button>
                                ) : (
                                    <button className="musi-opClaim-learn-more" onClick={setL2TokenClaim}>
                                        CLAIM
                                    </button>
                                )}
                            </div>
                            <L2RewardModal open={musiL2RewardModal} close={closeL2RewardModal} />
                        </div>
                    ) : (
                        // Others Network Reward Section
                        <div className="cantConnectNetWorkContainer">
                            <Loading />
                        </div>
                    )}
                </TabPanel>
                <TabPanel>
                    {checkChainId === "0x1" ? (
                        <div>
                            <h3>MainNet</h3>
                        </div>
                    ) : checkChainId === "Oxa" ? (
                        // Optimism Withdraw Section
                        <div className="musiStakingL2WithdrawContainer">
                            <div className="musiStakingL2WithdrawSection">
                                <div className="musiStakingL2WithdrawAmountSection">
                                    <div className="musiStakingL2WithdrawAmountTitleSection">
                                        <p>
                                            Availave: {L2WithdrawAmountStaked} {L2WithdrawTokenSymbol}
                                        </p>
                                        <button className="amountMusiMaxBtn" onClick={changeL2MaxUnStakingAmount}>
                                            Max
                                        </button>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        min="0"
                                        step="0.000000000000001"
                                        id="maxUnStakingAmount"
                                        onChange={changeL2UnStakingAmount}
                                        value={unStakingAmount}
                                    ></input>
                                    <div className="musiStakingL2WithdrawPickerSection">
                                        <button className="musiStakingL2WithdrawPicker_SelectBtn" onClick={openL2WithdrawModal}>
                                            <img src={MusiKhanLogo}></img>
                                            <span>{L2WithdrawTokenSymbol}</span>
                                            <MdKeyboardArrowDown size="15" />
                                        </button>
                                        <L2WithdrawModal open={musiL2WithdrawModal} close={closeL2WithdrawModal} header="Modal heading"></L2WithdrawModal>
                                    </div>
                                </div>
                                <div className="musiStakingL2WithdrawSwitchBtnSection">
                                    {L2WithdrawTokenSymbol === "" ? (
                                        <button className="musi-L2Withdraw-Enter-learn-more">SELECT TOKEN</button>
                                    ) : unStakingAmount === "" ? (
                                        <button className="musi-L2Withdraw-Enter-learn-more">ENTER AMOUNT</button>
                                    ) : L2WithdrawAmountStaked === 0 || unStakingAmount > L2WithdrawAmountStaked ? (
                                        <button className="cant-Musi-L2Withdraw-learn-more" disabled={true}>
                                            INSUFFICIENT TOKEN BALANCE
                                        </button>
                                    ) : (
                                        <button className="musi-L2Withdraw-learn-more" onClick={setL2TokenUnStaking}>
                                            UNSTAKE
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Others Network Withdraw Section
                        <div className="cantConnectNetWorkContainer">
                            <Loading />
                        </div>
                    )}
                </TabPanel>
                <TabPanel>
                    {checkChainId === "0x1" ? (
                        // Ethereum Bridge Section
                        <div>
                            <h1>MainNet</h1>
                        </div>
                    ) : checkChainId === "Oxa" ? (
                        // Optimism Bridge Section
                        <div className="musiStakingL2BridgeContainer">
                            <div className="musiStakingL2BridgeSection">
                                {getL1TokenAmount === "0" ? (
                                    <>
                                        <div className="musiStakingL2BridgeTokenTitleSection">
                                            <a>Token Name : N/A </a>
                                            <a>Token Symbol : N/A </a>
                                            <a>Token Amount : N/A </a>
                                        </div>
                                        <div className="musiStakingL2BridegeSwitchBtnSection">
                                            <button className="cant-Musi-L2Bridge-learn-more" disabled={true}>
                                                NOTHING TO MINT
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="musiStakingL2BridgeTokenTitleSection">
                                            <a>Token Name : {mintL2TokenName} </a>
                                            <a>Token Symbol : {mintL2TokenSymbol} </a>
                                            <a>Token Amount : {getL1TokenAmount}</a>
                                        </div>
                                        <div className="musiStakingL2BridegeSwitchBtnSection">
                                            <button className="musi-L2Bridge-learn-more" onClick={l2TokenMinting}>
                                                MINT
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        // Others Network Bridge Section
                        <div className="cantConnectNetWorkContainer">
                            <Loading />
                        </div>
                    )}
                </TabPanel>
                <TabPanel>
                    {checkChainId === "0x1" ? (
                        // Ethereum Swap Section
                        <div>
                            <h1>MainNet</h1>
                        </div>
                    ) : checkChainId === "Oxa" ? (
                        // Optimism Swap Section
                        <div className="musiStakingL2SwapContainer">
                            <div className="musiStakingL2SwapSection">
                                <div className="musiStakingL2SwapTitleSection">
                                    <a className="musiStakingL2SwapTitleFrTxt">From</a>
                                    <img src={OptimismRedLogo} className="musiStakingL2SwapFrImg" />
                                    <a className="musiStakingL2SwapTxt">Old Version Musikhan</a>
                                </div>
                                <div className="musiStakingL2SwapAmountSection">
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        min="0"
                                        onChange={changeL2SwapTokenBalance}
                                        value={L2SwapTokenBalance}
                                        disabled
                                    ></input>
                                    <div className="musiStakingL2SwapPickerSection">
                                        {successL2SwapTokenApprove === false ? (
                                            <button className="musiStakingL2SwapPicker_SelectBtn" onClick={openL2SwapModal}>
                                                <img src={MusiKhanLogo}></img>
                                                <span>{L2SwapSymbol}</span>
                                                <MdKeyboardArrowDown size="15" />
                                            </button>
                                        ) : (
                                            <button className="musiStakingL2SwapPicker_2SelectBtn">
                                                <img src={MusiKhanLogo}></img>
                                                <span>{L2SwapSymbol}</span>
                                                {/* <MdKeyboardArrowDown size="15" /> */}
                                            </button>
                                        )}

                                        <L2SwapModal open={musiL2SwapModal} close={closeL2SwapModal} header="Modal heading"></L2SwapModal>
                                    </div>
                                </div>
                                <div className="musiStakingBridgeArrowSection">
                                    <AiOutlineArrowDown />
                                </div>
                                <div className="musiStakingL2SwapOpTitleSection">
                                    <a className="musiStakingL2SwapOpTitleTxt">To</a>
                                    <img src={OptimismRedLogo} className="musiStakingL2SwapOpImg" />
                                    <a className="musiStakingL2SwapOpTxt">New Version Musikhan</a>
                                </div>
                                {L2SwapSymbol === "" ? (
                                    <div className="musiStakingBridegeSwitchBtnSection">
                                        <button className="can-Musi-L2Swap-learn-more">SELECT TOKEN</button>
                                    </div>
                                ) : L2SwapTokenBalance === "0" ? (
                                    <div className="musiStakingBridegeSwitchBtnSection">
                                        <button className="cant-Musi-L2Swap-learn-more" disabled={true}>
                                            INSUFFICIENT TOKEN BALANCE
                                        </button>
                                    </div>
                                ) : successL2SwapTokenApprove === false ? (
                                    <div className="musiStakingBridegeSwitchBtnSection">
                                        <button className="musi-L2Swap-learn-more" onClick={setL2SwapTokenApprove}>
                                            APPORVE
                                        </button>
                                    </div>
                                ) : (
                                    <div className="musiStakingBridegeSwitchBtnSection">
                                        <button className="musi-L2Swap-learn-more" onClick={setSwapL2TokenToL2}>
                                            SWAP
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="cantConnectNetWorkContainer">
                            <Loading />
                        </div>
                    )}
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

export default MusikhanStakingPage;
