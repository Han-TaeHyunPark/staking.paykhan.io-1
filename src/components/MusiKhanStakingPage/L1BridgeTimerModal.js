import React, { useEffect, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import "./L1BridgeTimerModal.scss";

const L1BridgeTimerModal = (props) => {
    // const [min, setMin] = useState(30);
    const { open, close, header } = props;
    const [min, setMin] = useState(2);
    const [sec, setSec] = useState(0);
    const time = useRef(120);
    // const time = useRef(1800);
    const timerId = useRef(null);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -= 1;
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        if (time.current <= 0) {
            console.log("타임아웃");
            clearInterval(timerId.current);
        }
    }, [sec]);
    return (
        <div className={open ? "openModal timerModal" : "timerModal"}>
            {open ? (
                <section>
                    <header>
                        <div className="selectModalTopTitleContainer">
                            <div className="selectL1TimerModalTopTitleSection">
                                <a>Token Transfer Timer</a>
                                <BsX className="close" onClick={close} />
                            </div>

                            <div className="selectL1TimerModalModalTokensTxtSection">
                                <a>Tokens</a>
                            </div>
                        </div>
                    </header>
                    <div>
                        <h1>
                            {min}M {sec}S
                        </h1>
                    </div>
                </section>
            ) : null}
        </div>
    );
};

export default L1BridgeTimerModal;
