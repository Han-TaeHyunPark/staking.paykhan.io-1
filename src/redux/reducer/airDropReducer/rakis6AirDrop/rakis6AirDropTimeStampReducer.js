let initialState = {
    rakis6ClaimDayDate: "",
    rakis6ClaimHoursDate: "",
    rakis6ClaimMinDate: "",
};

function rakis6AirDropTimeStampReducer(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case "RAKIS6_AIRDROP_TIMESTAMP":
            return {
                ...state,
                rakis6ClaimDayDate: payload.rakis6ClaimDayDate,
                rakis6ClaimHoursDate: payload.rakis6ClaimHoursDate,
                rakis6ClaimMinDate: payload.rakis6ClaimMinDate,
            };
        default:
            return { ...state };
    }
}

export default rakis6AirDropTimeStampReducer;
