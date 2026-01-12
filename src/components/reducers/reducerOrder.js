export const reducerOrder = (state = [], action) => {
  // console.log(state, action)
  switch (action.type) {
    case "ADD_TO_ORDER": {
        return  [
        ...state,
        {
          id_user: action.idUser,
          id_cart: action.cartID,
          quanlity: action.quantity,  
          image: action.image,
          price: action.price,
          variant: action.variant,
          product_id: action.idProduct,
          name: action.name,
          variant_id: action.variantId
        }
      ];
      }
     case "CLEAR_ORDER": {
      return [];

    }
    case "DELETE_CART": {
      const newState = state.filter(
         item =>!(item.name === action.name && item.variant === action.variant)
      );
      return newState;

    }

    case "LOGOUT":
      return [];

    default:
      return state;
  }
};

