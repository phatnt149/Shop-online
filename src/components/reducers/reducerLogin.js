
export const reducerLogin = (state = null, action)=>{
    switch (action.type) {
        case "LOGIN":
        return action.name;

        case "LOGOUT" :
        return null
        default:
        // Code block if no case matches
        break;
}
    return state;
}