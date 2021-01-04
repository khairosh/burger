import axios from "../../axios-orders";

export const loadOrders = (userId) => {
  return function (dispatch, getState) {
    // Захиалгыг татаж эхэллээ
    // Энийг хүлээж аваад Spinner ажиллаж эхэлнэ
    dispatch(loadOrdersStart());

    const token = getState().signupLoginReducer.token;

    axios
      .get(`orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        const orders = Object.entries(response.data).reverse();
        dispatch(loadOrdersSuccess(orders));
      })
      .catch((err) => {
        dispatch(loadOrdersError(err));
      });
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};

export const loadOrdersSuccess = (orders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders,
  };
};

export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

// Захиалгыг хадгалах
export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    dispatch(saveOrderStart());

    const token = getState().signupLoginReducer.token;

    axios
      .post(`orders.json?auth=${token}`, newOrder)
      .then((response) => {
        dispatch(saveOrderSuccess());
      })
      .catch((err) => {
        dispatch(saveOrderError(err));
      });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};

export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};

export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    error,
  };
};

export const resetOrder = () => {
  return {
    type: "RESET_ORDER",
  };
};
