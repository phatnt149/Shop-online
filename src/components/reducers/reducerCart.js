export const reducerCart = (state = [], action) => {
  // console.log(state, action)
  switch (action.type) {
    case "ADD_TO_CART": {
      const index = state.findIndex(
        item =>
          item.id_cart === action.cartID &&
          item.variant === action.variant
      );

      // ✅ Đã tồn tại → cộng quantity
      if (index !== -1) {
        const newState = [...state];
        newState[index] = {
          ...newState[index],
          quanlity: newState[index].quanlity + action.quantity
        };
        return newState;
      }

      // ✅ Chưa tồn tại → thêm mới
      return [
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
     case "UPDATE_CART": {
      const index = state.findIndex(
        item =>
          item.id_cart === action.cartID &&
          item.variant === action.variant &&
          item.product_id === action.idProduct
      );

      if(action.quantity>=1){
        if (index !== -1) {
        const newState = [...state];
        newState[index] = {
          ...newState[index],
          quanlity: action.quantity
        };
        return newState;
      }
      }
      return state;

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

