const INGREDIENT_PRICES = {
  cheese: 250,
  bacon: 800,
  meat: 1500,
  salad: 150,
};

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: 500,
  // Захиалах товчийг идэвхжүүлэх
  purchasing: false,
  // Орцуудын нэр
  ingredientNames: {
    bacon: "Гахайн мах",
    meat: "Үхрийн мах",
    cheese: "Бяслаг",
    salad: "Салад",
  },
};

const reducer = (state = initialState, action) => {
  console.log(state, action);

  if (action.type === "ADD_INGREDIENT") {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ortsNer]: state.ingredients[action.ortsNer] + 1,
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ortsNer],
      purchasing: true,
    };
  } else if (action.type === "REMOVE_INGREDIENT") {
    console.log("Removing ", action.ortsNer);

    const newPrice = state.totalPrice - INGREDIENT_PRICES[action.ortsNer];

    return state.ingredients[action.ortsNer] > 0
      ? {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ortsNer]: state.ingredients[action.ortsNer] - 1,
          },
          totalPrice: newPrice,
          purchasing: newPrice > 500,
        }
      : { ...state };
  }

  return state;
};

export default reducer;
