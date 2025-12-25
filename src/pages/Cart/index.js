import { Button, Col, Flex, Form, Input, Radio, Row, Space } from "antd";
import {CreditCardOutlined, DollarOutlined, PhoneOutlined} from "@ant-design/icons"
import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import { getDataUser } from "../../components/fetch/getData";
function Cart(){
    const [form] = Form.useForm();
    const [dataUser, setDataUser] = useState();
    const dataOrder = useSelector(state => state.reducerCart)

    console.log(dataOrder);
    useEffect(()=>{
        const fet=async()=>{
            const result = await getDataUser();
            setDataUser(result);
        }
        fet()
    },[])
    return(
        <>
        {/* <div className="cart">
            <Row>
                <Col>
                    <div className="cart__inforUser">
                        <div className="cart__inforUser__title">THÔNG TIN ĐƠN HÀNG</div>
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
                                    <Input />
                                </Form.Item>
                            </Space>

                            <Space>
                                <Form.Item name="district" label="Quận/Huyện" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="area" label="Phường/Xã" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Space>

                            <Space>
                                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="note" label="Ghi chú" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Space>
                        </Form>
                    </div>
                    <div className="cart__pay">
                        <div className="cart__pay__title">HÌNH THỨC THANH TOÁN</div>
                        <div className="cart__pay__option">
                            <Radio.Group
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

                        <div className="cart__inforOrder__order">
                            <div className="cart__inforOrder__order__title">
                                <div className="cart__inforOrder__order__title__title1">Sản phẩm</div>
                                <div className="cart__inforOrder__order__title__title2">Tổng tiền</div>
                            </div>
                            <div className="cart__inforOrder__order__product">
                                <div className="cart__inforOrder__order__product__name"></div>
                                <div className="cart__inforOrder__order__product__total"></div>
                            </div>
                        </div>

                        <div className="cart__inforOrder__total">
                            <div className="cart__inforOrder__total__tranpost">
                                <div className="cart__inforOrder__total__tranpost__title">Phí vận chuyển</div>
                                <div className="cart__inforOrder__order__product__price">25.000d</div>
                            </div>
                            <div className="cart__inforOrder__total__pay">
                                <div className="cart__inforOrder__total__pay__title">Tổng thanh toán</div>
                                <div className="cart__inforOrder__total__pay__title__price">1473000</div>
                            </div>
                        </div>

                        <Button className="cart__inforOrder__buttonPay">THANH TOÁN</Button>
                        <a>Tiếp tục mua sắm</a>

                        <div className="cart__inforOrder__hotline">
                            <PhoneOutlined />
                            <span>Hotline 1800 6650</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div> */}
        </>
    )
}

export default Cart;