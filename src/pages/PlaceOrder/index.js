import { Button, Col, Flex, Form, Input, Modal, Radio, Row, Select, Space } from "antd";
import {CreditCardOutlined, DollarOutlined, PhoneOutlined} from "@ant-design/icons"
import { useEffect, useState} from "react";
import "./cart.scss"
import { formatVND } from "../../components/formatVND";
import CartLogic from "./CartLogic";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getDistrict, getProvince, getWar } from "../../components/fetch/getData";
import { useDispatch, useSelector } from "react-redux";
import { clearOrder } from "../../components/actions";
import Qr from "../../components/Qr";
import { addOrder, addOrderItems, addPayment } from "../../components/fetch/addData";
function PlaceOrder(){
    const { dataUser, dataProduct, dataOrder } = CartLogic();
    const [form] = Form.useForm();
    const tranpostFee = 25000
    const { Option } = Select;
    const user = useSelector(state => state.reducerLogin)
    const navigate = useNavigate();

    const listProduct = useSelector(state=>state.reducerOrder)
    var total = 0;
    if(listProduct.length>0){
        listProduct.reduce((sum, item)=>(
        total = sum + item.price*item.quanlity
    ),0)
    }
    //set dữ liệu khi không còn ở trang đặt hàng nữa
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(clearOrder());
        };
    }, [dispatch]);
// Set form values khi user có dữ liệu
    useEffect(() => {
    if (!dataUser) return;

    form.setFieldsValue({
        full_name: dataUser.full_name,
        phone: dataUser.phone,
        email: dataUser.email,
        address: dataUser.address,
    });
    }, [dataUser, form]);

    //get provice, district, war
    const [provincesName, setProvincesName] = useState(null)
    const [provinces, setProvinces] = useState([])

    const [districtName, setDistrictName] = useState(null)
    const [district, setDistrict] = useState([])

    const [warName, setWarName] = useState(null)
    const [war, setWar] = useState([])


    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    useEffect(()=>{
        const fetProvince = async()=>{
            const result = await getProvince();
            setProvinces(result);
        }
        fetProvince();
    },[])

    const handleProvinceChange = async (provinceCode,e) => {
        setSelectedProvince(provinceCode);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setProvincesName(e.children)

        const result = await getDistrict(provinceCode);
        setDistrict(result.districts || []);
        setWar([]);
        };

    
    const handleDistrictChange = async (districtCode,e) => {
        setSelectedDistrict(districtCode);
        setSelectedWard(null);
        setDistrictName(e.children)

        const result = await getWar(districtCode);
        setWar(result.wards || []);
        };

    const handleWardChange = (wardCode,e) => {
    setSelectedWard(wardCode);
    setWarName(e.children)
    };

    const [payment, setPayment] = useState(null); // lưu value đang check

    const handleChange = (e) => {
        setPayment(e.target.value);
    };

    const handleClick = async () => {
    try {
        // validate toàn bộ form
        const values = await form.validateFields();
        values.city = provincesName;
        values.district = districtName;
        values.area = warName;

        if (!payment) {
            Modal.warning({
                content: "Vui lòng chọn hình thức thanh toán!",
            });
            return;
        }

        if (payment === 2) {
            const modal = Modal.info({
                content: <Qr total={total + tranpostFee} />,
                closable: true,
                okButtonProps: { style: { display: 'none' } },
                maskClosable: false,
            });

            setTimeout(() => {
                modal.destroy();
            }, 20000);
        }
        const detailAddress= `${values.address},${warName},${districtName},${provincesName}`
        const result = await addOrder(user.id,total+tranpostFee,detailAddress)
        let paymentMethod = payment === 2? "Chuyển khoản": "Thanh toán khi nhận hàng";
        let paymentStatus = payment === 2? "complete": "pending";
        if(result?.length>0){
            for (const item of listProduct) {
                var result_orderItem = await addOrderItems(result[0].id, item.product_id,item.variant_id,item.quanlity, item.price);
                var result_payment = await addPayment(result[0].id,paymentMethod, paymentStatus);
            }
            if((result_orderItem?.length>0)&&(result_payment?.length>0)){
                const modal = Modal.success({
                    title: 'Thành công',
                    content: 'Đặt hàng thành công, cảm ơn bạn đã tin tưởng lựa chọn',
                    centered: true,
                    okButtonProps: { style: { display: 'none' } },
                    });

                    setTimeout(() => {
                    modal.destroy();
                    }, 3000);
                        }
                navigate("/orders")

        }

    } catch (errorInfo) {
        // Form còn thiếu field
        console.log("Form lỗi:", errorInfo);
    }


};

    return(
        <>
        {dataUser&&(
            <div className="cart">
            <Row>
                <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                    <div className="cart__inforUser">
                        <div className="cart__inforUser__title">THÔNG TIN ĐƠN HÀNG</div>
                        <div className="border_bottom"></div>
                        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                            <Space>
                                <Form.Item name="full_name" label="Họ và tên" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Space>

                            <Space>
                                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="city" label="Tỉnh/Thành phố" rules={[{ required: true }]}>
                                    <Select
                                    placeholder="Chọn tỉnh/thành phố"
                                    style={{ width: 200 }}
                                    value={selectedProvince}
                                    onChange={handleProvinceChange}
                                    allowClear
                                >
                                    {provinces.length > 0 ? (
                                    provinces.map((p) => (
                                        <Option key={p.code} value={p.code}>
                                        {p.name}
                                        </Option>
                                    ))
                                    ) : (
                                    <Option key={0} value={0}>
                                        LOADING...
                                    </Option>
                                    )}

                                </Select>
                                </Form.Item>
                            </Space>

                            <Space>
                                <Form.Item name="district" label="Quận/Huyện" rules={[{ required: true }]}>
                                    <Select
                                    placeholder="Chọn quận/huyện"
                                    style={{ width: 200 }}
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    allowClear
                                    disabled={!district.length}
                                >
                                   {district?.map((d) => (
                                    <Option key={d.code} value={d.code}>{d.name}</Option>))}
                                    
                                </Select>
                                </Form.Item>
                                <Form.Item name="area" label="Phường/Xã" rules={[{ required: true }]}>
                                    <Select
                                    placeholder="Chọn Phường/Xã"
                                    style={{ width: 200 }}
                                    value={selectedWard}
                                    onChange={handleWardChange}
                                    disabled={!war.length}
                                >
                                    {war?.map((w) => (<Option key={w.code} value={w.code}>{w.name}</Option>))}

                                </Select>
                                </Form.Item>
                            </Space>

                            <Space>
                                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="note" label="Ghi chú" >
                                    <Input />
                                </Form.Item>
                            </Space>
                        </Form>
                        <div className="border_bottom"></div>
                    </div>
                    <div className="cart__pay">
                        <div className="cart__pay__title">HÌNH THỨC THANH TOÁN</div>
                        <div className="cart__pay__option">
                            <Radio.Group
                                onChange={handleChange}
                                value={payment} // value đang check
                                options={[
                                    {
                                    value: 1,
                                    className: 'option-1',
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                        <DollarOutlined  style={{ fontSize: 18 }} />
                                        Thanh toán khi nhận hàng 
                                        </Flex>
                                    ),
                                    },
                                    {
                                    value: 2,
                                    className: 'option-2',
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                        <CreditCardOutlined style={{ fontSize: 18 }} />
                                        Chuyển khoản
                                        </Flex>
                                    ),
                                    }
                                ]}
                                /> 
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="cart__inforOrder">
                        <div className="cart__inforOrder__title">ĐƠN HÀNG CỦA BẠN</div>
                        <div className="border_bottom"></div>

                        <div className="cart__inforOrder__order">
                            <div className="cart__inforOrder__order__title">
                                <div className="cart__inforOrder__order__title__title1">Sản phẩm</div>
                                <div className="cart__inforOrder__order__title__title2">Tổng tiền</div>
                            </div>
                            <div className="cart__inforOrder__order__product">
                                <div className="cart__inforOrder__order__product__name">{listProduct.map(item=>(<div key={item.id_cart+item.variant}>{item.name} x {item.quanlity}</div>))}</div>
                                <div className="cart__inforOrder__order__product__total">{listProduct.map(item=>(<div key={item.id_cart+item.variant}>{formatVND(item.price)}</div>))}</div>
                            </div>
                        </div>
                        <div className="border_bottom"></div>

                        <div className="cart__inforOrder__total">
                            <div className="cart__inforOrder__total__tranpost">
                                <div className="cart__inforOrder__total__tranpost__title">Phí vận chuyển</div>
                                <div className="cart__inforOrder__order__product__price">{formatVND(tranpostFee)}</div>
                            </div>
                            <div className="cart__inforOrder__total__pay">
                                <div className="cart__inforOrder__total__pay__title">Tổng thanh toán</div>
                                <div className="cart__inforOrder__total__pay__title__price">{formatVND(total+tranpostFee)}</div>
                            </div>
                        </div>
                        <div className="border_bottom"></div>


                        <Button className="cart__inforOrder__buttonPay" onClick={handleClick}>THANH TOÁN</Button>
                        <NavLink to={'/'}>Tiếp tục mua sắm</NavLink>


                        <div className="cart__inforOrder__hotline">
                            <PhoneOutlined />
                            <span>Hotline 1800 6650</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        )}
        </>
    )
}

export default PlaceOrder;