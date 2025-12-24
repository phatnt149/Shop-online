export const loginSixDo = (name)=>{
    return {
        type:"LOGIN",
        "name": name
    }
}

export const logoutSixDo = ()=>{
    return {
        type:"LOGOUT",
    }
}