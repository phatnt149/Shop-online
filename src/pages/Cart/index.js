/* eslint-disable jsx-a11y/alt-text */
import { Button, Checkbox, InputNumber, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cartList.scss";
import { formatVND } from "../../components/formatVND";
import { addToCart, addToOrder, deleteCart, updateCart } from "../../components/actions";
import { addOrUpdateCartItem, deleteCartItem } from "../DetailProduct/addToCart";
import { useNavigate } from "react-router-dom";
import { getDataCard, getDataCartProduct } from "../../components/fetch/getData";
import { DeleteOutlined } from '@ant-design/icons'
import Item from "antd/es/list/Item";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Redux là source of truth
  const dataCart = useSelector(state => state.reducerCart);
  const dataUser = useSelector(state => state.reducerLogin);

  const [checkedItems, setCheckedItems] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message) => {
    api[type]({
      title: type === "success" ? "Thành công" : "Lỗi",
      description: message
    });
  };

  // ================= FETCH CART =================
  useEffect(() => {
    if (!dataUser?.id || dataCart.length > 0) return;

    const fetchCart = async () => {
      try {
        const resultCart = await getDataCard(dataUser.id);
        const cartItems = resultCart[0]?.cart_items || [];

        const mergedItems = await Promise.all(
          cartItems.map(async item => {
            const productRes = await getDataCartProduct(
              item.product_id,
              item.variant_id
            );

            const product = productRes?.[0];
            const variantObj = product?.product_variants?.[0];

            if (!product || !variantObj) return null;

            return {
              id_user: dataUser.id,
              id_cart: item.cart_id,
              image: product.thumbnail,
              name: product.name,
              price: product.price,
              product_id: item.product_id,
              quantity: item.quantity,
              variant: `${variantObj.color}-${variantObj.size}`,
              variant_id: variantObj.id
            };
          })
        );

        mergedItems
          .filter(Boolean)
          .forEach(item =>
            dispatch(
              addToCart(
                item.id_user,
                item.id_cart,
                item.quantity,
                item.image,
                item.price,
                item.variant,
                item.name,
                item.product_id,
                item.variant_id
              )
            )
          );
      } catch (err) {
        console.error(err);
        openNotification("error", "Không thể tải giỏ hàng");
      }
    };

    fetchCart();
  }, [dataUser?.id, dispatch, dataCart.length]);

  // ================= UPDATE QUANTITY =================
  const changeInput = async (item, value) => {
    dispatch(updateCart(item.id_cart, value, item.variant, item.product_id));

    try {
      await addOrUpdateCartItem(
        item.id_cart,
        item.product_id,
        item.variant_id,
        value - item.quanlity,
        item.price
      );
    } catch (err) {
      console.error(err);
      openNotification("error", "Cập nhật thất bại");
    }
  };

  // ================= DELETE ITEM =================
  const deleteItem = async item => {
    try {
      await deleteCartItem(
        item.id_cart,
        item.product_id,
        item.variant_id
      );
      dispatch(deleteCart(item.variant, item.name));
    } catch (err) {
      console.error(err);
      openNotification("error", "Xóa thất bại");
    }
  };

  // ================= CHECKBOX =================
  const checkCart = (item, e) => {
    if (e.target.checked) {
      setCheckedItems(prev => [...prev, item]);
    } else {
      setCheckedItems(prev =>
        prev.filter(i => i.variant !== item.variant)
      );
    }
  };

  // ================= PLACE ORDER =================
  const handleClickOrder = () => {
    checkedItems.forEach(item =>{
      dispatch(
        addToOrder(
          item.id_user,
          item.id_cart,
          item.quanlity,
          item.image,
          item.price,
          item.variant,
          item.name,
          item.product_id,
          item.variant_id
        ))
      deleteItem(item)
      }
    );
    navigate("/placeOrder");
  };

  const inputProps = {
    min: 1,
    max: 10,
    style: {
      width: 100,
      height: 35,
      marginBottom: -14,
      backgroundColor: "#ddd"
    }
  };

  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (checkedItems.length > 0) {
      const total = checkedItems.reduce((sum, item) => {
        return sum + item.quanlity * item.price;
      }, 0);

      setPrice(total);
    } else {
      setPrice(0);
    }
  }, [checkedItems]);

  // ================= RENDER =================
  return (
    <>
      {contextHolder}
      <div className="cart">
        {dataCart.length > 0 &&
          dataCart.map(item => (
            <div className="cart__item" key={item.variant}>

              <div className="cart__item__checkbox">
                <Checkbox onChange={e => checkCart(item, e)} />
              </div>
              
              <div className="cart__item__image">
                <img src={item.image} />
              </div>
              <div className="cart__item__content">
                <div className="cart__item__content__name">{item.name}</div>


                <div className="cart__item__content__variant">{item.variant}</div>

                <div className="cart__item__content__price">
                  {formatVND(item.price)}
                </div>

                <div className="cart__item__content__total">
                  {formatVND(item.price * item.quanlity)}
                </div>

                <div className="cart__item__content__buttonItem">
                  <InputNumber
                    {...inputProps}
                    value={item.quanlity}
                    onChange={value => changeInput(item, value)}
                  />
                </div>
              </div>

          <div className="cart__item__delete">
            <Button className="cart__item__content__buttonItem--pc" danger type="primary" onClick={() => deleteItem(item)} icon={<DeleteOutlined />} >
                    Delete
                  </Button>
            <Button className="cart__item__content__buttonItem--mobi" danger type="primary" onClick={() => deleteItem(item)} icon={<DeleteOutlined />} >
            </Button>
          </div>
            </div>
          ))}
          <div className="cart__item__price--mobi">
                Tổng tiền:{formatVND(price)}
          </div>
        {checkedItems.length > 0 && (
          <div className="cart__buttonOrder">
            <Button type="primary" onClick={handleClickOrder}>
              Đặt hàng
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
