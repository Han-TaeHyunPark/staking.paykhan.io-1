import React, { useEffect } from "react";
import "./MainPage.scss";
// import './reset.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    MainHanLogo,
    MainArrakisLogo,
    MainUniLogo,
    MainTwitterLogo,
    MainFacebookLogo,
    MainDiscordLogo,
    MainTelegramLogo,
    MainMediumLogo,
    MainGithubLogo,
    MainEnterLogo,
    MainOffLogo,
    MainAdLogo,
} from "../img/_index";
import StakingPage from "./StakingPage";
import HelpIcon from "@mui/icons-material/Help";
import { Tooltip, IconButton } from "@mui/material";
import { HiQuestionMarkCircle } from "react-icons/hi";
import AprToolTip from "../components/Global/AprToolTip";
import { SheepooriLogoBackX, MusiKhanLogo } from "../img/_index";
import { useDispatch, useSelector } from "react-redux";
import { hanChainPriceActtion } from "../redux/actions/mainActions/hanChainPriceAction";

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { hanChainPrice, hanChainPercentage } = useSelector((state) => state.coinPrice);

    const myFunction = () => {
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);

        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied: " + copyText.value;
    };

    const outFunc = () => {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy to clipboard";
    };

    const openNewPopUp = () => {
        navigate("./rakis6");
    };

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
        dispatch(hanChainPriceActtion.hanChainPriceAct());
    }, []);

    return (
        <div className="mainPageTestContainer">
            <div className="mainPageTopPaddingSection"></div>
            <div className="mainPageLogoTitleContainer">
                <div className="mainPageLogoSection">
                    <img src={MainHanLogo} />
                </div>
                <div className="mainPageTitleTxtSection">
                    <a>HANCHAIN PROJECT</a>
                </div>
            </div>
            <div className="hanChainPriceContainer">
                <div className="hanChainPriceSection">
                    {/* <div className="hanChainPriceLogoSection">
            <img src={MainHanLogo} />
          </div> */}
                    <div className="hanChainPricTextSection">
                        <span className="hanChainPriceTitleSection">
                            <a href="https://www.coingecko.com/ko/%EC%BD%94%EC%9D%B8/hanchain" target="_blank">
                                HanChain (HAN)
                            </a>
                        </span>
                        <br />
                        <span className="hanChainPriceAmountSection">{hanChainPrice}</span>
                        <span className="hanChainPriceUnitSection">USD</span>
                        {hanChainPercentage > 0 ? (
                            <span className="hanChainPrice24hPercentageInSection">({hanChainPercentage}%)</span>
                        ) : (
                            <span className="hanChainPrice24HPercentageDeSection">({hanChainPercentage}%)</span>
                        )}
                    </div>
                </div>
                <div className="test2">
                    <a href="https://www.coingecko.com/ko/%EC%BD%94%EC%9D%B8/hanchain" target="_blank">
                        Powered by CoinGecko
                    </a>
                </div>
            </div>
            <div className="airDropSection">
                <a href="/airdrop" target="_blank" className="airDropTxt1">
                    HAN e-Platform
                </a>
                <a href="/airdrop" target="_blank" className="airDropTxt2">
                    Airdrop
                </a>
            </div>

            <div className="mainPageStakingPoolContainer">
                <div className="mainPageStakingContainer">
                    <div className="mainPageStakingTitleSection">
                        <p>STAKING</p>
                    </div>
                    <div className="mainPageStakingBoxSection">
                        <div className="stakingBoxArrakisSection">
                            <div className="stakingBoxArrakisLogoSection">
                                <img src={MainArrakisLogo} />
                            </div>
                            <div className="stakingBoxArrakisTxtSection">
                                <p>Arrakis Vault WETH/HAN</p>
                            </div>
                            <div className="tooltip-rakis6-main-container">
                                <i className="info-icon material-main-icons">
                                    <HelpIcon />
                                </i>
                                <div className="tooltip-rakis6-main-content">
                                    <p>
                                        APR displayed is not historical statistics. According to the LP token quantity standard that fluctuates with the HAN
                                        weight of the POOL, when staking at the present time, APR is the annual interest rate of the amount of HAN to be
                                        obtained against the liquidity supplied.
                                        <br></br>
                                        <a
                                            className="align-rakis6-main-right"
                                            href="https://medium.com/@HanIdentity/hanchain-x-optimism-x-uniswap-v3-x-arrakis-af564de80f81"
                                            target="_blank"
                                        >
                                            Read More
                                        </a>
                                        l{" "}
                                    </p>
                                    {/* <p className="align-main-right"> </p> */}
                                </div>
                            </div>
                            <div className="stakingBoxArrakisBtnSection">
                                <a href="/rakis6" target="_blank">
                                    GO
                                </a>
                            </div>
                        </div>

                        <div className="stakingBoxMusiSection">
                            <div className="stakingBoxMusiLogoSection">
                                <img src={MusiKhanLogo} />
                            </div>
                            <div className="stakingBoxMusiTxtSection">
                                <p>MusiKhan tokens</p>
                            </div>
                            {/* <div className="tooltip-main-musi-container">
                                <i className="info-icon material-main-musi-icons">
                                    <HelpIcon />
                                </i>
                                <div className="tooltip-main-musi-content">
                                    <p>
                                        The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                        characters from Sewoori Union for AdKhan: Advertising Platform
                                        <br></br>
                                        <a
                                            className="align-main-musi-right"
                                            href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3"
                                            target="_blank"
                                        >
                                            Read More
                                        </a>
                                    </p>
                                    <p className="align-main-right"> </p>
                                </div>
                            </div> */}
                            <div className="stakingBoxMusiBtnSection">
                                <a href="/musikhan" target="_blank">
                                    GO
                                </a>
                            </div>
                        </div>
                        <div className="stakingBoxSpriSection">
                            <div className="stakingBoxSpriLogoSection">
                                <img src={SheepooriLogoBackX} />
                            </div>
                            <div className="stakingBoxSpriTxtSection">
                                <p>Sheepoori SPR NFT</p>
                            </div>
                            <div className="tooltip-main-spri-container">
                                <i className="info-icon material-main-spri-icons">
                                    <HelpIcon />
                                </i>
                                <div className="tooltip-main-spri-content">
                                    <p>
                                        The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                        characters from Sewoori Union for AdKhan: Advertising Platform
                                        <br></br>
                                        <a
                                            className="align-main-spri-right"
                                            href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3"
                                            target="_blank"
                                        >
                                            Read More
                                        </a>
                                    </p>
                                    {/* <p className="align-main-right"> </p> */}
                                </div>
                            </div>
                            <div className="stakingBoxSpriBtnSection">
                                <a href="/spr" target="_blank">
                                    GO
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainPagePoolContainer">
                    <div className="mainPagePoolTitleSection">
                        <p>MARKET</p>
                    </div>
                    <div className="mainPagePoolBoxSection">
                        <div className="poolBoxWethSection">
                            <div className="poolBoxWethLogoSection">
                                <img src={MainArrakisLogo} />
                            </div>
                            <div className="poolBoxWethTxtSection">
                                <p>WETH-V3-HAN</p>
                            </div>
                            <div className="poolBoxWethBtnSection">
                                <a href="https://beta.arrakis.finance/vaults/10/0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f/add" target="_blank">
                                    ADD POOL
                                </a>
                            </div>
                        </div>
                        <div className="poolBoxUsdcSection">
                            <div className="poolBoxUsdcLogoSection">
                                <img src={MainUniLogo} />
                            </div>
                            <div className="poolBoxUsdcTxtSection">
                                <p>USDC-V2-HAN</p>
                            </div>
                            <div className="poolBoxUsdcBtnSection">
                                <a
                                    href="https://bafybeigkgx3gq5yrrsyxpna2czlq3bc2ish2gk6yqh7v57kugehlq6qoly.ipfs.dweb.link/#/add/v2/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                                    target="_blank"
                                >
                                    ADD POOL
                                </a>
                            </div>
                        </div>
                        <div className="poolBoxSpriSection">
                            <div className="poolBoxSpriLogoSection">
                                <img src={SheepooriLogoBackX} />
                            </div>
                            <div className="poolBoxSpriTxtSection">
                                <p>Sheepoori SPR NFT</p>
                            </div>
                            <div className="poolBoxSpriBtnSection">
                                <a href="https://opensea.io/collection/sheepoori" target="_blank">
                                    PURCHASE
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-footer-logo">
                <div className="home-footer">
                    {/* <div className="airDropSection">
            <div className="airDropBtnSection">
              <a href="/airdrop" target="_blank">
                Go
              </a>
            </div>
          </div> */}
                    <div>
                        <div className="ether">
                            <span className="ether_logo">
                                <img width="20px" height="20px" src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" />
                            </span>
                            <input
                                className="ether_txt"
                                id="myInput"
                                defaultValue="0x0c90c57aaf95a3a87eadda6ec3974c99d786511f"
                                style={{ border: "none", background: "transparent" }}
                            />
                            <a className="ether_copy tooltip">
                                <button
                                    onClick={myFunction}
                                    onMouseOut={outFunc}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        display: "flex",
                                    }}
                                >
                                    <span className="tooltiptext" id="myTooltip">
                                        Copy to clipboard
                                    </span>
                                    <i className="far fa-far fa-clone" />
                                </button>
                            </a>
                            <a onClick={addRewardToken} className="tooltip">
                                <img
                                    width="20px"
                                    height="20px"
                                    src="https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg"
                                />
                                <span className="tooltiptext" id="metamask_txt">
                                    Add to Metamask
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_twiter">
                            <a href="https://twitter.com/HanIdentity" target="_blank" className="tooltip2">
                                <img src={MainTwitterLogo} />
                                <span className="tooltiptext2">Twiter</span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_facebook">
                            <a href="https://www.facebook.com/HanChainGlobalOfficial-101331419212206" target="_blank" className="tooltip2">
                                <img src={MainFacebookLogo} />
                                <span className="tooltiptext2">Facebook</span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_discord">
                            <a href="https://discord.gg/5gtfUuvJJX" target="_blank" className="tooltip2">
                                <img src={MainDiscordLogo} />
                                <span className="tooltiptext2">Discord</span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_telegram">
                            <a href="https://t.me/hanchain_official" target="_blank" className="tooltip2">
                                <img src={MainTelegramLogo} />
                                <span className="tooltiptext2">Telegram</span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_medium">
                            <a href="https://medium.com/@HanIdentity" target="_blank" className="tooltip2">
                                <img src={MainMediumLogo} />
                                <span className="tooltiptext2">Medium</span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_github">
                            <a href="https://github.com/hanchain-paykhan" target="_blank" className="tooltip2">
                                <img src={MainGithubLogo} />
                                <span className="tooltiptext2">Github</span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_enter">
                            <a href="https://www.youtube.com/channel/UCQPzdwU4KHlXO3srolte0Dg" target="_blank" className="tooltip2">
                                <img src={MainEnterLogo} />
                                <span className="tooltiptext2">Entertainment</span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_office">
                            <a href="https://www.youtube.com/channel/UCw_N38K7yK754M7wbaOpx0g" target="_blank" className="tooltip2">
                                <img src={MainOffLogo} />
                                <span className="tooltiptext2">Youtube</span>
                            </a>
                        </div>
                    </div>
                    <div className="logoimg">
                        <div className="logo_ad">
                            <a href="https://www.youtube.com/channel/UCekUY9Bc3J9adN2tQ-uDXqA" target="_blank" className="tooltip2">
                                <img src={MainAdLogo} />
                                <span className="tooltiptext2">Advertisement</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
