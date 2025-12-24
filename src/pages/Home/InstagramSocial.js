/* eslint-disable jsx-a11y/alt-text */
import { Col, Row } from "antd";
import "./InstagramSocial.scss"
function InstagramSocial(){
    const images = [
        "https://sixdo.vn/images/banners/mresized/1-1-1746265646.webp",
        "https://sixdo.vn/images/banners/mresized/2-1746264570.webp",
        "https://sixdo.vn/images/banners/mresized/3-1746264580.webp",
        "https://sixdo.vn/images/banners/mresized/b2-1746263619.webp",
        "https://sixdo.vn/images/banners/mresized/b1-1746263630.webp",
        "https://sixdo.vn/images/banners/mresized/b3-1746263639.webp",
        "https://sixdo.vn/images/banners/mresized/a-1746408242.webp",
        "https://sixdo.vn/images/banners/mresized/b-1746408249.webp",
        "https://sixdo.vn/images/banners/mresized/c-1746408256.webp"
    ]
    return(
        <>
        <div className="imageContainer">
            <Row gutter={[16, 16]}>
                {images.map(item=>(
                <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8} key={item}>
                    <div className="image">
                        <img src={item}/>
                    </div>
                </Col>
            ))}
            </Row>
        </div>
        
        </>
    )
}

export default InstagramSocial;