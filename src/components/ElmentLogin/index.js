
import { Form, Input, Button, notification } from "antd";
import { useState } from "react";
import { useCheckLogin } from "../useCheckLogin/useCheckLogin";
import {useDispatch} from "react-redux"
import { loginSixDo } from "../actions";

function ElementLogin(){
    const [dataForm, setData]= useState({});
    const { phone, password } = dataForm;

    const userData = useCheckLogin(phone, password);
    const dispatch = useDispatch();
    const handleLogin=()=>{
        if(userData){
            dispatch(loginSixDo(userData.full_name))
        }else{
            openNotificationWithIcon('error', "Sai số điện thoại hoặc mật khẩu")
        }
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mes) => {
        api[type]({
        message: type === 'success' ? "Thành công" : "Lỗi",
        description: mes,
    })}
    return(
        <>
            {contextHolder}
            <Form  className="element"
            onValuesChange={(changed, all) => {
                setData(all)
            }}
            >

            <Form.Item
                name="phone"
                className="element__phone"
                rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" }
                ]}
            >
                <Input
                autoFocus
                placeholder="Nhập số điện thoại"
                variant="underlined"
                autoComplete="tel"
                />
            </Form.Item>

            <Form.Item
                name="password"
                className="element__pass"
                rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" }
                ]}
            >
                <Input.Password
                placeholder="Mật khẩu"
                variant="underlined"
                autoComplete="current-password"
                />
            </Form.Item>

            <Form.Item className="element__button">
                <Button onClick={handleLogin} type="primary" htmlType="submit">
                Đăng nhập
                </Button>
            </Form.Item>

            <div className="element__forget">
                <a href="/">Quên mật khẩu</a>
            </div>
            </Form>

        </>
    )
}
export default ElementLogin;