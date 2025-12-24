import { Button, Form, Input, notification } from "antd";
import "./updateProfile.scss"
import { useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../../components/UpdateProfile";
function ChangePass (){
    const [form] = Form.useForm();
    const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";
    const user = useSelector(state => state.reducerLogin)

    const fetData = async()=>{
        try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/users?password=eq.${form.getFieldValue().password}&full_name=eq.${user}&select=full_name,address,email,phone`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error(err);
        return [];
    }
    }
    const handleClickChange = async()=>{
        const data = await fetData();
        if(data.length > 0 &&(form.getFieldValue().passwordNew===form.getFieldValue().passwordNewRepeat)){
            let pass = {
                password: form.getFieldValue().passwordNew
            }
    
            updateProfile(data[0].phone, pass);
            openNotificationWithIcon('success', "Cập nhật thành công")
            form.resetFields()
        }
        else{
            openNotificationWithIcon('error',"Vui lòng nhập đúng password, password phải trùng nhau")
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
        <div className="updateProfile">
            <div className="updateProfile__title">
                Đổi mật khẩu
            </div>

            <div className="updateProfile__form">
                <Form  className="element"
                onValuesChange={(changed, all) => {
                   
                }}
                form={form}
                >
                <Form.Item
                name="password"
                className="element__pass--old"
                rules={[
                { required: true, message: "Vui lòng nhập mật khẩu cũ" }
                ]}
            >
                <Input.Password
                placeholder="Mật khẩu cũ"
                variant="underlined"
                autoComplete="current-password"
                autoFocus
                />
                </Form.Item>

                <Form.Item
                name="passwordNew"
                className="element__pass--new"
                rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" }
                ]}
            >
                <Input.Password
                placeholder="Mật khẩu mới"
                variant="underlined"
                autoComplete="current-password"
                />
                </Form.Item>

                <Form.Item
                name="passwordNewRepeat"
                className="element__pass--new"
                rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" }
                ]}
            >
                <Input.Password
                placeholder="Nhập lại mật khẩu mới"
                variant="underlined"
                autoComplete="current-password"
                />
                </Form.Item>

                
                <Form.Item className="element__update">
                    <Button onClick={handleClickChange} type="primary" htmlType="submit">
                        Đổi mật khẩu
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
        </>
    )
}
export default ChangePass;