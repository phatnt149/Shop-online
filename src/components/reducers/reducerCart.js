
export const reducerCart = (state =[], action)=>{
    console.log(state, action)
    let newState =[];
    switch (action.type) {
        case "ADD_TO_CART":
            newState =[
                ...state,
                {
                    id_user: action.id_user,
                    id_product: action.id,
                    quanlity: action.quanlity,
                    color: action.color,
                    size: action.size,
                }
            ]
            return newState

        case "LOGOUT" :
        return null
        default:
        // Code block if no case matches
        break;
}
    return state;
}