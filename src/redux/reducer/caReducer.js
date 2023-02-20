const initialState = {
    ca: {},
};

const caReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "CA":
            return { ...state, ca: payload.L1Contract };
        default:
            return { ...state };
    }
};
export default caReducer;
