/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { getData } from '../../components/fetch/getData';
import { useEffect, useState } from 'react';
import { Button, Col, Collapse, InputNumber, Radio, Row } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import SubDetail from '../../components/SubDetail';
import "./DetailProduct.scss"
function DetailProduct(){
    const param = useParams();
    console.log(param.id)
    const [data, setData]= useState([]);
    useEffect(()=>{
        const fet=async()=>{
            const result = await getData(param.id);
            setData(result);
        }
        fet()
    },[])
    console.log(data[0])
    const onChange = value => {
    console.log('changed', value);
    };
    const sharedProps = {
        mode: 'spinner',
        min: 1,
        max: 10,
        defaultValue: 3,
        onChange,
        style: { width: 100, height: 35, marginBottom: -14, backgroundColor: "#ddd"},
        };
    
    const items = [
        {
            key: '1',
            label: "CHI TIẾT",
            children: data[0]?(data[0].description):([]),
        },
        {
            key: '2',
            label: "HƯỚNG DẪN BẢO QUẢN",
            children: <SubDetail/>
        }
        ];
    return (
        <>
        {data[0]&&(
            <div className='detailProduct'>
            <Row>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <div className="detailProduct__image">
                        <img src={data[0].thumbnail}/>
                    </div>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <div className="detailProduct__infor" justify={"center"}>
                            <div className="detailProduct__infor__name">{data[0].name}</div>
                            <div className="detailProduct_borderBottom"></div>

                            <div className="detailProduct__infor__color">
                                <Radio.Group buttonStyle="solid">
                                    {data[0].product_variants.map(item =><Radio.Button key={item.id} value={item.color}>{item.color}</Radio.Button>)}
                                </Radio.Group>
                            </div>
                            <div className="detailProduct__infor__size">
                                <Radio.Group buttonStyle="solid">
                                    {data[0].product_variants.map(item =><Radio.Button key={item.id} value={item.size}>{item.size}</Radio.Button>)}
                                </Radio.Group>
                            </div>
                            <div className="detailProduct_borderBottom"></div>

                            <div className="detailProduct__infor__select">
                                <InputNumber size='small' {...sharedProps} placeholder="Outlined" />
                                <Button className="buttonAdd" type='primary'>THÊM VÀO GIỎ HÀNG</Button>
                                <Button className="buttonHeart" type='outline' icon={<HeartOutlined />}></Button>
                            </div>
                            <div className="detailProduct_borderBottom"></div>
                            <div className="detailProduct__infor__collapse"><Collapse items={items} bordered={false} defaultActiveKey={['1']} /></div>
                    </div>
                </Col>
            </Row>
        </div>
        )}
        </>
    )
}
export default DetailProduct;