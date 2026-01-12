/* eslint-disable jsx-a11y/alt-text */
import { useNavigate, useParams } from 'react-router-dom';
import { getData } from '../../components/fetch/getData';
import { useEffect, useState } from 'react';
import { Button, Col, Collapse, InputNumber, Modal, notification, Radio, Row } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import SubDetail from '../../components/SubDetail';
import { useDispatch, useSelector } from "react-redux";
import "./DetailProduct.scss";
import { addToCart } from '../../components/actions';
import { addOrUpdateCartItem, addToCartDataBase } from './addToCart';
import { addCart, addCartItems } from '../../components/fetch/addData';

function DetailProduct() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.reducerLogin);

  const [data, setData] = useState([]);
  const [dataOders, setDataOders] = useState({
    quanlity: 1,
    id: param.id,
    variant_id: null
  });

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fet = async () => {
      const result = await getData(param.id);
      setData(result);
    };
    fet();
  }, [param.id]);

  const onChangeQuantity = (value) => {
    setDataOders(prev => ({
      ...prev,
      quanlity: value
    }));
  };

  const sharedProps = {
    mode: 'spinner',
    min: 1,
    max: 10,
    defaultValue: 1,
    onChange: onChangeQuantity,
    style: {
      width: 100,
      height: 35,
      marginBottom: -14,
      backgroundColor: "#ddd"
    }
  };

  const items = [
    {
      key: '1',
      label: "CHI TIẾT",
      children: data[0] ? data[0].description : [],
    },
    {
      key: '2',
      label: "HƯỚNG DẪN BẢO QUẢN",
      children: <SubDetail />
    }
  ];

  const openNotificationWithIcon = (type, mes) => {
    api[type]({
      title: type === 'success' ? "Thành công" : "Lỗi",
      description: mes,
    });
  };

  const handleAddtoCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!dataOders.variant_id) {
      openNotificationWithIcon("error", "Vui lòng chọn biến thể sản phẩm");
      return;
    }

    try {

      const cart = await addCart(user.id);;
      await addOrUpdateCartItem(
        cart.id,
        data[0].id,
        dataOders.variant_id,
        dataOders.quanlity,
        data[0].price
      );

      const colorAndSizeItem = data[0].product_variants.filter(item=>item.id ===  dataOders.variant_id )
      const colorAndSize =`${colorAndSizeItem[0].color}-${colorAndSizeItem[0].size}`
      dispatch(
        addToCart(
          user.id,
          cart.id,
          dataOders.quanlity,
          data[0].thumbnail,
          data[0].price,
          colorAndSize,
          data[0].name,
          dataOders.id,
          dataOders.variant_id
        )
      );

    const modal = Modal.success({
        title: 'Thành công',
        content: 'Đã thêm vào giỏ hàng',
        centered: true,
        okButtonProps: { style: { display: 'none' } },
        });

        setTimeout(() => {
        modal.destroy();
        }, 1000);
    } catch (err) {
      console.error(err);
      openNotificationWithIcon("error", "Lỗi thêm giỏ hàng");
    }
  };

  return (
    <>
      {contextHolder}
      {data[0] && (
        <div className='detailProduct'>
          <Row>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <div className="detailProduct__image">
                <img src={data[0].thumbnail} />
              </div>
            </Col>

            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <div className="detailProduct__infor" justify={"center"}>
                <div className="detailProduct__infor__name">{data[0].name}</div>
                <div className="detailProduct_borderBottom"></div>

                {/* COLOR + SIZE -> VARIANT */}
                <div className="detailProduct__infor__color">
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={(e) =>
                      setDataOders(prev => ({
                        ...prev,
                        variant_id: e.target.value
                      }))
                    }
                  >
                    {data[0].product_variants.map(item => (
                      <Radio.Button key={item.id} value={item.id}>
                        {item.color} - {item.size}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>

                <div className="detailProduct_borderBottom"></div>

                <div className="detailProduct__infor__select">
                  <InputNumber size='small' {...sharedProps} />
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={handleAddtoCart}
                    className="buttonAdd"
                  >
                    THÊM VÀO GIỎ HÀNG
                  </Button>
                  <Button
                    className="buttonHeart"
                    type="outline"
                    icon={<HeartOutlined />}
                  />
                </div>

                <div className="detailProduct_borderBottom"></div>
                <div className="detailProduct__infor__collapse">
                  <Collapse items={items} bordered={false} defaultActiveKey={['1']} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default DetailProduct;
