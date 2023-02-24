import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Web3TestPage.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PrivateStakingContract, PrivateStakingTokenContract, PrivateStakingAddress } from "../../config/PrivateStakingRakis6ConfigTest";

const Web3TestPage = () => {
    const get = async () => {
        const test = await PrivateStakingContract.methods.rewardView().call({ from: "0x2D4F1b98B431d2cE6Cd5CB6a2A461b83CEe83459" });
        console.log(test);
    };

    const set = async () => {
        const approve = await PrivateStakingTokenContract.methods
            .approve(PrivateStakingAddress, 1000)
            .send({ from: "0x2D4F1b98B431d2cE6Cd5CB6a2A461b83CEe83459" });
        console.log(approve);
    };

    return (
        <div>
            <div>
                <h1>주소 : </h1>
            </div>

            <div>
                <input></input>
            </div>
            <div>
                <button onClick={get}>GET</button>
                <button onClick={set}>SET</button>
            </div>
        </div>
    );
};

export default Web3TestPage;
