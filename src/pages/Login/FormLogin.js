import { Tabs } from 'antd';
import "./FormLogin.scss"
import ElementLogin from '../../components/ElmentLogin';
import ElementResigter from '../../components/ElementResigter';
import { useState } from 'react';
function FormLogin(){
    const [isResigter, setResigter]= useState(false);
    const resigterSuccess = ()=>{
        setResigter(false);
    }
    const items= [
    { key: '1', label: <div className="labelLogin">Đăng nhập</div>, children: <><ElementLogin/>
    </> },
    { key: '2', label: <div className="labelResigter">Đăng ký</div>, children:<><ElementResigter resigterSuccess={resigterSuccess}/></>},
    ];
    const onChange = () => {
        setResigter(!isResigter)
    };
    return(
        <>
        <div className="form">
            <Tabs
            size='large'
            centered
            defaultActiveKey="1"
            activeKey={isResigter ? "2" : "1"}
            items={items}
            onChange={onChange}
        />

        </div>
        </>
    )
}
export default FormLogin;