const initialState = {
  successL1Transfer: false,
};

const musiKhanL1SendTokenReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "L1_TRANSFER_SUCCESS":
      return {
        ...state,
        successL1Transfer: payload.successL1Transfer,
      };

    default:
      return { ...state };
  }
};

export default musiKhanL1SendTokenReducer;
