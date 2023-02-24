import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { networksAction } from "./../redux/actions/networksAction";
import { connectAccount } from "../redux/actions/connectAccount";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import HelpIcon from "@mui/icons-material/Help";
import Web3 from "web3";
import { OptimismRedLogo, HanLogo } from "../assets/_index";
import { MunieLogoBackX } from "../img/_index";
import "react-alice-carousel/lib/alice-carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiRefreshCcw } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import { SheepooriLogoBackX } from "../img/_index";

import "./MunieStakingPage.scss";

const MunieStakingPage = () => {
    const dispatch = useDispatch();
    const ref = useRef();

    const [checkChainId, setCheckChainId] = useState("");
    const outSide = useRef();

    const { networks } = useSelector((state) => state.networks);
    const { account } = useSelector((state) => state.account);

    const setup = () => {
        dispatch(connectAccount.getAccount());
    };

    const handleNetworkSwitch = async (networkName) => {
        dispatch(networksAction.changeNetworkAct({ networks, networkName }));
    };

    const changeEthereumNetWork = () => {
        dispatch(networksAction.changeEthereumNetWorkAct());
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

    // Scroll Carousel
    const goUp = (id) => {
        id.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    const goDown = (id) => {
        id.scrollTo({
            top: id.scrollHeight,
            left: 0,
            behavior: "smooth",
        });
    };

    const stopScroll = (id) => {
        id.scrollTop = id.scrollTop;
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            // partialVisibilityGutter: 96,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        const {
            carouselState: { currentSlide },
        } = rest;
        return (
            <div className="carousel-button-group">
                <SlArrowRight id="sliderRightBtn" onClick={() => next()} />
                <SlArrowLeft id="sliderLeftBtn" className={currentSlide === 0 ? "disable" : ""} onClick={() => previous()} />
                {/* <ButtonThree onClick={() => goToSlide(currentSlide + 1)}> Go to any slide </ButtonThree> */}
            </div>
        );
    };

    return (
        <div className="stakingMuniePageContainer">
            <div className="stakingPageMunieLogoContainer">
                <img className="stakingMunieLogo" src={MunieLogoBackX} alt="HanLogo" />
                <a>MUNIE STAKING</a>
            </div>
            <div className="stakingMunieAllAmountContainer">
                <div className="stakingMunieAmountContainer">
                    <div className="stakingMunieAmountTitle">
                        <div className="stakingMunieAmountTxt">
                            <a>0.000001157407407407 HAN</a>
                        </div>
                        <div className="tooltip-container">
                            <i className="info-icon material-icons">
                                <HelpIcon />
                            </i>
                            <div className="tooltip-content">
                                <span>
                                    The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                    characters from Sewoori Union for AdKhan: Advertising Platform
                                </span>
                                <span className="align-right">
                                    {" "}
                                    <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                                        Read More
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="stakingMunieAmountNum">
                        <a>for each NFT per second</a>
                    </div>
                </div>
            </div>

            <Tabs className="Tabs">
                {account === "" ? (
                    <div className="connectMunieWalletSection">
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
                    <div className="connectMunieComWalletSection">
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
                ) : (
                    <div className="cantConnectMunieWalletSection">
                        <p className="cantConnetMunieTxt">Please swith to mainnet</p>
                        <a className="social-button button--social-login button--google" href="#" onClick={changeEthereumNetWork}>
                            <FcCancel className="social-icon fa fa-google" />
                            {account.substr(0, 6)}...{account.slice(-6)}
                        </a>
                    </div>
                )}
                <TabList>
                    <Tab>DEPOSIT</Tab>
                    <Tab>REWARDS</Tab>
                    <Tab>WITHDRAW</Tab>
                    <Tab>VIEW ADS</Tab>
                </TabList>
                <TabPanel>
                    <div className="stakedMunieCanAmountSection">
                        <p>STAKED : </p>
                    </div>
                    {/* <div className="munieStakingDepositContainer">
                <div className="munieStakingCantChoiceImgContainer">
                  <div className="munieStakingCantChoiceImgSection">
                    <a className="cantStakingMunieBtn" disabled={true}>
                      INSUFFICIENT BALANCE
                    </a>
                  </div>
                </div>
               
              </div> */}
                    <div className="munieStakingDepositContainer">
                        <div className="munieStakingBeforeChoiceImgContainer">
                            {/* {getMyTokenIds !== "" ? ( */}
                            <Carousel
                                responsive={responsive}
                                arrows={false}
                                className="mainUnSlider"
                                partialVisible
                                customButtonGroup={<ButtonGroup />}
                                renderButtonGroupOutside
                            >
                                {/* {getMyTokenIds.map((item, index) => {
                        return ( */}
                                <div className="munieStakingSlider">
                                    <div className="munieStakingImgContainer">
                                        <div
                                            className="munieStakingImgCard"
                                            style={
                                                {
                                                    // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`,
                                                    //   backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.nft.image})`,
                                                }
                                            }
                                        >
                                            <input
                                                className="imgCheckBox"
                                                name="test3"
                                                type="radio"
                                                //   key={index}
                                                //   value={item.tokenId}
                                                //   onClick={() => handleClickButton}
                                                //   onChange={(e) =>
                                                //     stakingCheckOnlyOne(e.target)
                                                //   }
                                            ></input>
                                        </div>
                                        <div className="munieStakingImgTokenId">
                                            <p>Sheepoori # </p>
                                        </div>
                                    </div>
                                </div>
                                {/* ); */}
                                {/* })} */}
                            </Carousel>
                            {/* ) : null} */}
                            {/* <div className='munieStakingSelectBtnSection'>
                                  <button onClick={munieMint}>
                                    Test Minting            
                                  </button>
                                  <button onClick={test}>
                                    Test Token           
                                  </button>
                    </div> */}
                        </div>
                        <div className="depositMunieStakeBtnSection">
                            <button className="munie-learn-more">STAKE</button>
                        </div>
                    </div>
                    {/* )
          ) : (
            <div className="munieStakingDepositContainer">
              <div className="munieStakingCantChoiceImgContainer">
                <Loading />
              </div>
            </div>
          )} */}
                    <div className="logoContainer">
                        <img
                            src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                            onClick={changeEthereumNetWork}
                            className="opIcon"
                        />
                        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel className="allTokenMunieRewardsContainer">
                    <div className="stakedMunieCanAmountSection">
                        <p>STAKED : </p>
                    </div>
                    <div className="allRewardsMunieCumulativeSection">
                        <p>
                            Estimated Interest :
                            <FiRefreshCcw
                                className="allRefreshMunieClaimIcon"
                                // onClick={changeMunieState}
                            />
                            HAN
                        </p>
                    </div>
                    <div className="amountTokenMunieRewardAccSection">
                        <p>Accumulated Interest : HAN</p>
                    </div>
                    <div className="amountTokenRewardMunieTxtSection">
                        <p>Rewarded Interest : HAN </p>
                    </div>
                    <div className="rewardsClaimMunieBtnSection">
                        <button className="learn-more">CLAIM</button>
                    </div>
                    <div className="logoRewardContainer">
                        <img
                            src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                            onClick={changeEthereumNetWork}
                            className="opIcon"
                        />
                        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="stakedMunieCanAmountSection">
                        <p>STAKED : </p>
                    </div>
                    {/* {getStakedTokenIds.length === 0 ? ( */}
                    {/* <div className="munieStakingWithdrawContainer">
              <div className="munieStakingCantChoiceContainer">
                <div className="munieStakingCantChoiceSection">
                  <a className="cantStakingMunieBtn" disabled={true}>
                    INSUFFICIENT BALANCE
                  </a>
                </div>
              </div>
            </div> */}
                    {/* ) : ( */}
                    <div className="munieStakingWithdrawContainer">
                        <div className="munieUnStakingChoiceImgContainer">
                            {/* {stakingTokenIdImg !== "" ? ( */}
                            <Carousel
                                responsive={responsive}
                                arrows={false}
                                className="mainUnSlider"
                                partialVisible
                                customButtonGroup={<ButtonGroup />}
                                renderButtonGroupOutside
                            >
                                {/* {stakingTokenIdImg.map((item, index) => {
                      return ( */}
                                <div className="munieUnStakingSlider">
                                    <div className="munieUnStakingImgContainer" id="munieUnStakingImgIdCardContainer">
                                        <div
                                            className="munieUnStakingImgCard"
                                            style={
                                                {
                                                    // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`,
                                                    // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                                                }
                                            }
                                        >
                                            <input
                                                className="imgUnCheckBox"
                                                name="test2"
                                                type="radio"
                                                // key={index}
                                                // value={item.tokenId}
                                                // onClick={() =>
                                                //   selectUnStakingCheckButton(item.tokenId)
                                                // }
                                                // onChange={(e) => checkOnlyOne(e.target)}
                                            />
                                        </div>
                                        <div className="munieStakingImgTokenId">
                                            <p>Sheepoori # </p>
                                        </div>
                                    </div>
                                </div>
                                {/* );
                    })} */}
                            </Carousel>
                            {/* ) : null} */}
                        </div>
                        <div className="munieUnStakeBtnSection">
                            <button className="munie-learn-more">UNSTAKE</button>
                        </div>
                    </div>
                    {/* )} */}
                    <div className="logoContainer">
                        <img
                            src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                            onClick={changeEthereumNetWork}
                            className="opIcon"
                        />
                        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel>
                    {/* {getStakingTokenIdImgVideoUrl.length === 0 ? (
            <div className="munieStakingCantViewContainer">
              <Loading />
            </div>
          ) : ( */}
                    <div className="munieAllStakingComContainer">
                        <div className="munieAllStakingArrowUpSection">
                            <SlArrowUp onPointerDown={(e) => goUp(ref.current)} onPointerUp={(e) => stopScroll(ref.current)} />
                        </div>
                        <div className="munieAllStakingContainer">
                            {/* {getStakingTokenIdImgVideoUrl !== "" ? ( */}
                            <div className="allMunieStakingInfoImgContainer">
                                <div className="munieScrollBox">
                                    <div className="munieScrollBoxInner" ref={ref}>
                                        {/* {getStakingTokenIdImgVideoUrl.map((item, index) => { */}
                                        {/* return ( */}
                                        <div className="allMunieStakingInfoSection">
                                            <div
                                                className="allMunieStakingInfoImgSection"
                                                style={
                                                    {
                                                        // backgroundImage:
                                                        // `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`
                                                        // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                                                        // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                                                    }
                                                }
                                                // onClick={() => window.open(`${item.externalUrl}`, "_blank")}
                                                // onClick={()=>window.open(`https://www.youtube.com/channel/UCekUY9Bc3J9adN2tQ-uDXqA/videos`,'_blank')}
                                            ></div>
                                            <div className="allMunieStakingInfoNameSection">
                                                <p>Sheepoori # </p>
                                                {/* <p>{item.name}</p> */}
                                            </div>
                                        </div>
                                        {/* );
                                            })} */}
                                    </div>
                                </div>
                            </div>
                            {/* ) : null} */}
                        </div>
                        <div className="munieAllStakingArrowDownSection">
                            <SlArrowDown onPointerDown={(e) => goDown(ref.current)} onPointerUp={(e) => stopScroll(ref.current)} />
                        </div>
                    </div>
                    {/* )} */}
                </TabPanel>
                {/* <div className="logoContainer">
                    <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" onClick={changeEthereumNetWork} className="opIcon" />

                    <img src={OptimismRedLogo} onClick={() => handleNetworkSwitch("optimism")} className="opIcon" />
                    <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                </div> */}
            </Tabs>
        </div>
    );
};

export default MunieStakingPage;
