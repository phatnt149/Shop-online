/* eslint-disable jsx-a11y/alt-text */
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import isNewProduct from "../../components/IsNewProduct";
import { formatVND } from "../../components/formatVND";
import { NavLink } from "react-router-dom";

function DrawNewProducts(){
    const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";

    const [dataProduct, setData] = useState([]);
    useEffect(()=>{
        fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
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


    const newProduct = dataProduct.filter(item => isNewProduct(item.created_at));
    return(
        <>
        <div className="product">
            <Row gutter={[16, 16]} key={1}>
                
            {newProduct && newProduct.map(item=>(
                <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={12} className="product__item" key={item.id}>
                    <NavLink to={`/new-products/${item.id}`}>
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
export default DrawNewProducts;