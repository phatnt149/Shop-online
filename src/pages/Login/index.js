import { useSelector } from "react-redux";
import FormLogin from "./FormLogin";
import { Navigate } from "react-router-dom";

function Login(){
    const userLogin = useSelector(state=>state.reducerLogin);
    return(
        <>
        {userLogin?(<><Navigate to={"/"}/></>):(<><div className="titleSection">ĐĂNG NHẬP TÀI KHOẢN</div>
        <FormLogin/></>)}
        </>
    )
}

export default Login;