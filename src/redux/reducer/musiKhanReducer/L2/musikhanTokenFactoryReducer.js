const initialState = {
    name: "",
    symbol: "",
    ca: "",
};

const musikhanTokenFactoryReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CREATE_TOKEN":
            return {
                ...state,
                name: payload.name,
                symbol: payload.symbol,
                ca: payload.ca,
            };
        default:
            return { ...state };
    }
};

export default musikhanTokenFactoryReducer;
