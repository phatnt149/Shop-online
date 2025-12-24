/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Col, Grid, Row } from 'antd';
import "./DrawAllProduct.scss"
function DrawAllProduct(){
    const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";
    
        const [dataProduct, setDataProduct]= useState([]);
    
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
            .then(data => setDataProduct(data))
            .catch(err => console.error(err));
        },[])
    
    return(
        <>
        <div className="product">
            <Row gutter={[16, 16]} key={1}>
            {dataProduct && dataProduct.map(item=>(
                <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={12} className="product__item" key={item.id}>
                    <div className="product__image"><img src={`${item.thumbnail}`}/></div>
                    <div className="product__price">
                        <div className="product__price--new">{item.price-(item.price*item.discount)/100}đ</div>
                        <div className="product__price--old">{item.price}đ</div>
                    </div>
                    <div className="product__title">{item.name}</div>
                </Col>
        ))}
        </Row>
        </div>
        
        </>
    )
}
export default DrawAllProduct;