
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useCheckResigter } from "../useCheckResigter/useCheckResigter";
import { resigterAccount } from "./resigterAccout";

function ElementResigter({ resigterSuccess }){
    const [dataForm, setData]= useState({});
    const { phone, email, password } = dataForm;

    const userData = useCheckResigter(phone, email);
    const handleResigter=()=>{
        if (userData) {
            alert("Email hoặc số điện thoại đã tồn tại");
        } else {
            if(dataForm.password===dataForm.password_repeat){
                resigterAccount(email, phone, password);
                resigterSuccess();
            }
            else{
                alert("PassWord sai");
            }
        }
    }
    return(
        <>

            <Form className="element"
            onValuesChange={(changed, all) => {
                setData(all)
            }}>
            <Form.Item
                name="email"
                className="element__email"
                rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" }
                ]}
            >
                <Input
                autoFocus
                placeholder="Nhập email"
                variant="borderless"
                autoComplete="email"
                />
            </Form.Item>

            <Form.Item
                name="phone"
                className="element__phoneResigter"
                rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" }
                ]}
            >
                <Input
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

            <Form.Item
                name="password_repeat"
                className="element__passrepeat"
                rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" }
                ]}
            >
                <Input.Password
                placeholder="Xác nhận mật khẩu"
                variant="underlined"
                autoComplete="current-password"
                />
            </Form.Item>

            <Form.Item className="element__button">
                <Button onClick={handleResigter} type="primary" htmlType="submit">
                Đăng ký
                </Button>
            </Form.Item>

            <div className="element__forget">
                <a href="/">Quên mật khẩu</a>
            </div>
            </Form>

        </>
    )
}
export default ElementResigter;