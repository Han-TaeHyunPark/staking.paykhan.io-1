const initialState = {
  getL1TokenList: [],
  getL2TokenList: [],
  L1TokenList: [],
};

const musikhanViewReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "TOKEN_LIST":
      return {
        ...state,
        getL1TokenList: payload.getL1TokenList,
        getL2TokenList: payload.getL2TokenList,
      };

    case "L1_TOKEN_LIST_TOBACK":
      return {
        ...state,
        L1TokenList: payload.L1TokenList,
      };
    default:
      return { ...state };
  }
};

export default musikhanViewReducer;
