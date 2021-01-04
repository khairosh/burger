const initialState = {
  // Load order
  orders: [],
  loading: false,
  error: null,

  // Save order
  newOrder: {
    saving: false,
    finished: false,
    error: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ORDERS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOAD_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.orders,
        error: null,
      };
    case "LOAD_ORDERS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "SAVE_ORDER_START":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: true,
          error: null,
          finished: false,
        },
      };
    case "SAVE_ORDER_SUCCESS":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: false,
          error: null,
          finished: true,
        },
      };
    case "SAVE_ORDER_ERROR":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: false,
          error: action.error,
          finished: false,
        },
      };
    case "CLEAR_ORDER":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: false,
          error: null,
          finished: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
