import { useState } from "react";
import UpdateProfile from "./updateProfile";
import ChangePass from "./changePass";

function Profile(){
    const [isChangePass, setChangePass] = useState(false);
    const handleSetStateChangePass = ()=>{
        setChangePass(true);
    }
    return(
        <>
        {isChangePass?(<ChangePass/>):(<UpdateProfile func={handleSetStateChangePass}/>)}
        </>
    )
}

export default Profile;