const networksAct = () => {
    return async (dispatch) => {
        const networks = {
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

        dispatch({ type: "NETWORK", payload: { networks } });
    };
};

const changeNetworkAct = ({ networks, networkName }) => {
    return async (dispatch) => {
        try {
            if (!window.ethereum) throw new Error("No crypto wallet found");
            await window.ethereum?.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[networkName],
                    },
                ],
            });
        } catch (err) {
            console.error(err);
        }
        dispatch({ type: "NETWORK_CHANGE", payload: { networkName } });
    };
};

const changeEthereumNetWorkAct = () => {
    return async (dispatch) => {
        await window.ethereum?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
        });
        dispatch({ type: "ETH_MAINNET" });
    };
};

export const networksAction = { networksAct, changeNetworkAct, changeEthereumNetWorkAct };
