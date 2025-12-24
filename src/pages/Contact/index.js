import { Button, Col, Row } from "antd";
import { Input,Select } from 'antd';
import TextArea from "antd/es/input/TextArea";
/* eslint-disable jsx-a11y/alt-text */
import "./contact.scss"
function Contact(){
    return(
        <>
        <div className="contact">
            <div className="contact__image">
                <img src="https://sixdo.vn/images/banners/original/banner-web-03-1609146496.jpg"/>
            </div>
            <div className="contact__infor">
                <div className="titleSection">LIÊN HỆ</div>
                <Row>
                    <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                        <div className="contact__infor__content">
                            <div className="contact__infor__content__title">CUSTOMER CARE</div>
                            <div className="contact__infor__content__tel">TEL:1800 6650</div>
                            <div className="contact__infor__content__email">EMAIL: cskh@sixdo.vn</div>
                            <div className="contact__infor__content__title">RECRUITMENT</div>
                            <div className="contact__infor__content__tel">TEL:1800 6650</div>
                            <div className="contact__infor__content__email">EMAIL: hcns@sixdo.vn</div>
                        </div>
                    </Col>
                    <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                        <Row gutter={5}>
                            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}><Input placeholder="Họ và tên" />;</Col>
                            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}><Input placeholder="Email" />;</Col>
                            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}><Input placeholder="Số điện thoại" />;</Col>
                            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}><Input placeholder="Gửi tới" /></Col>
                            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}><Input placeholder="Tiêu đề" />;</Col>
                            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}><TextArea placeholder="Nội dung"/></Col>
                            <Col xxl={8} xl={24} lg={24} md={24} sm={24} xs={24}><Button type="primary">Gửi</Button></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
        </>
    )
}

export default Contact;