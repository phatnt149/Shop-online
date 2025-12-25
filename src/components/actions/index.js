export const loginSixDo = (name,id)=>{
    return {
        type:"LOGIN",
        "name": name,
        "id": id
    }
}

export const logoutSixDo = ()=>{
    return {
        type:"LOGOUT",
    }
}

export const addToCart = (quanlity, id, color, size, id_user)=>{
    return {
        type:"ADD_TO_CART",
        quanlity: quanlity,
        id:id,
        color:color,
        size:size,
        id_user: id_user
    }
}