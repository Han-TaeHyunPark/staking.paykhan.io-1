const initialState = {
    networks: "",
    networkName: "",
};

const networksReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "NETWORK":
            return { ...state, networks: payload.networks };
        case "NETWORK_CHANGE":
            return { ...state, networkName: payload.networkName };
        case "ETH_MAINNET":
            return { ...state };
        default:
            return { ...state };
    }
};

export default networksReducer;
