/* eslint-disable jsx-a11y/alt-text */
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { formatVND } from "../../components/formatVND";
import { NavLink } from "react-router-dom";
function DrawUniform(){
    const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";

    const [dataProduct, setData] = useState([]);
    useEffect(()=>{
        fetch(`${SUPABASE_URL}/rest/v1/products?select=*&category_id=neq.6e84ca47-0dd2-46ba-a4e5-9138ed9de9d6`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    },[])

    console.log(dataProduct);

    return(
       <>
        <div className="product">
            <Row gutter={[16, 16]} key={1}>
            {dataProduct && dataProduct.map(item=>(
                <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={12} className="product__item" key={item.id}>
                    <NavLink to={`/uniform/${item.id}`}>
                        <div className="product__image"><img src={`${item.thumbnail}`}/></div>
                        <div className="product__price">
                            <div className="product__price--new">{formatVND(item.price - (item.price * item.discount) / 100)}</div>
                            <div className="product__price--old">{formatVND(item.price)}</div>
                        </div>
                        <div className="product__title">{item.name}</div>
                    </NavLink>
                </Col>
        ))}
        </Row>
        </div>
        
        </>
    )
}
export default DrawUniform;