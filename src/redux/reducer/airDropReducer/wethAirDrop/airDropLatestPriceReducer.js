let initialState = {
  getLatestPrice: "",
};

function airDropLatestPriceReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_AIRDROP_PRICE_SUCCESS":
      return {
        ...state,
        getLatestPrice: payload.getLatestPrice,
      };

    default:
      return { ...state };
  }
}

export default airDropLatestPriceReducer;
