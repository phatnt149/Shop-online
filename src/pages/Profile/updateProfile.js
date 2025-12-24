import { Button, Form, Input, notification } from "antd";
import "./updateProfile.scss"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";
import { updateProfile } from "../../components/UpdateProfile";
import { loginSixDo } from "../../components/actions";

function UpdateProfile ({func}){
    const user = useSelector(state => state.reducerLogin)
    const [dataUser,setDataUser] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";
    
    useEffect(()=>{
        fetch(`${SUPABASE_URL}/rest/v1/users?full_name=eq.${user}&select=full_name,address,email,phone`, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data =>{
        setDataUser(data)
        form.setFieldsValue(data[0]);
    })
      .catch(err => console.error(err));

    },[])
    
     const handleUpdate = ()=>{
        console.log(form.getFieldsValue())
        let check = false;
        for (let item in form.getFieldsValue()){
            if((form.getFieldsValue()[item]===null)||(form.getFieldsValue()[item]==="")){
                check = true;
            }}
        if(check){
           openNotificationWithIcon('error',"Vui lòng nhập đầy đủ thông tin")
        }
        else{
            updateProfile(form.getFieldsValue().phone,form.getFieldsValue());
            openNotificationWithIcon('success', "Cập nhật thành công")
            dispatch(loginSixDo(form.getFieldsValue().full_name))
        }
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mes) => {
        api[type]({
        message: type === 'success' ? "Thành công" : "Lỗi",
        description: mes,
    })}

    const handleChangePass = ()=>{
        func();
    }
    return (
        <>
      {contextHolder}
        <div className="updateProfile">
            <div className="updateProfile__title">
                Cập nhật thông tin
            </div>

            <div className="updateProfile__form">
                <Form  className="element"
                onValuesChange={(changed, all) => {
                   
                }}
                form={form}
                >
                <Form.Item
                    name="full_name"
                    className="element__full_name"
                    rules={[
                    { required: true, message: "Vui lòng nhập name" }
                    ]}
                >
                    <Input
                    autoFocus
                    placeholder="name"
                    variant="underlined"
                    autoComplete="tel"
                    />
                </Form.Item>

                 <Form.Item
                    name="email"
                    className="element__email"
                    rules={[
                    { required: true, message: "Vui lòng nhập email" }
                    ]}
                >
                    <Input
                    placeholder="email"
                    variant="underlined"
                    autoComplete="tel"
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    className="element__phone"
                    rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" }
                    ]}
                >
                    <Input
                    placeholder="Nhập số điện thoại"
                    variant="underlined"
                    autoComplete="tel"
                    readOnly
                    />
                </Form.Item>

                <Form.Item
                    name="address"
                    className="element__address"
                    rules={[
                    { required: true, message: "Vui lòng nhập address" }
                    ]}
                >
                    <Input
                    placeholder="Nhập address"
                    variant="underlined"
                    autoComplete="tel"
                    />
                </Form.Item>

                <Form.Item className="element__update">
                    <Button onClick={handleUpdate} type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>

                <div className="element__changePass">
                    <Button onClick={handleChangePass}>Đổi mật khẩu</Button>
                </div>
                </Form>
            </div>
        </div>
        </>
    )
}

export default UpdateProfile;