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

export const addToCart = (id_user, cart_id, quanlity, image, price, variant, name, product_id,variant_id)=>{
    return {
        type:"ADD_TO_CART",
       idUser:id_user,
       cartID:cart_id,
       quantity: quanlity,
       image:image,
       price:price,
       variant: variant,
       name:name,
       idProduct: product_id,
       variantId: variant_id
    }
}

export const updateCart = (cart_id, quanlity, variant, product_id)=>{
    return {
        type:"UPDATE_CART",
       cartID:cart_id,
       quantity: quanlity,
       variant: variant,
       idProduct: product_id
    }
}  

export const deleteCart = (variant, name)=>{
    return {
        type:"DELETE_CART",
       variant: variant,
       name: name
    }
}

export const addToOrder = (id_user, cart_id, quanlity, image, price, variant, name, product_id,variant_id)=>{
    return {
        type:"ADD_TO_ORDER",
       idUser:id_user,
       cartID:cart_id,
       quantity: quanlity,
       image:image,
       price:price,
       variant: variant,
       name:name,
       idProduct: product_id,
       variantId: variant_id
    }
}

export const clearOrder = ()=>{
    return {
        type:"CLEAR_ORDER",
    }
}
