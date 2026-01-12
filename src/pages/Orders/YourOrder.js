/* eslint-disable jsx-a11y/alt-text */
import { Steps } from "antd";
import { useEffect, useState } from "react";
import {CodeSandboxSquareFilled, HomeFilled, LoadingOutlined, ScheduleFilled, TruckFilled} from '@ant-design/icons'
import {useSelector} from "react-redux"
import { getDataOrder, getDataOrderItem, getDataProduct, getPayment } from "../../components/fetch/getData";
import "./orders.scss"
import { formatVND } from "../../components/formatVND";
function YourOrder(){
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
  };
    const user_id = useSelector(state => state.reducerLogin)
    const [dataRender, setDataRender]= useState([]);

    useEffect(() => {
  if (!user_id?.id) return;

  const fetchData = async () => {
    try {
      // 1. ORDERS
      const orders = await getDataOrder(user_id.id);
      const unFinishOrders = orders.filter(o => o.status !== "complete");

      if (unFinishOrders.length === 0) return;

      // 2. ORDER ITEMS
      const orderItemsArr = await Promise.all(
        unFinishOrders.map(o => getDataOrderItem(o.id))
      );
      const orderItems = orderItemsArr.flat();

      // 3. PRODUCTS
      const productsArr = await Promise.all(
        orderItems.map(i => getDataProduct(i.product_id))
      );
      const products = productsArr.flat();

      // 4. PAYMENTS
      const paymentsArr = await Promise.all(
        unFinishOrders.map(o => getPayment(o.id))
      );
      const payments = paymentsArr.flat();

      // 5. GỘP DATA (KHÔNG DÙNG INDEX)
      const renderData = orderItems.map(item => {
        const product = products.find(p => p.id === item.product_id);
        const order = orders.find(o => o.id === item.order_id);
        const payment = payments.find(p => p.order_id === item.order_id);

        return {
          orderId: item.order_id,
          quantity: item.quantity,
          price: item.price,
          name: product?.name,
          image: product?.thumbnail,
          method: payment?.method,
          statusPay: payment?.status,
          orderStatus: order?.status
        };
      });

      setDataRender(renderData);

    } catch (err) {
      console.log("Lỗi:", err);
    }
  };

  fetchData();
}, [user_id?.id]);

    return(
        <>
        {dataRender.length>0&&dataRender.map((item,index)=>(
            <div className="yourOrder" key={index}>
            <div className="yourOrder__item">
                <div className="yourOrder__item__code">Mã đơn hàng: {item.orderId}</div>
                <div className="yourOrder__item__proceed">
                    {item.orderStatus==="pending"&&(
                        <Steps
                        current={current}
                        onChange={onChange}
                        responsive={false}
                        labelPlacement="vertical"
                        direction="horizontal"
                        items={[
                        {
                            title: 'Đơn mới tạo',
                            status: 'finish',
                            icon: <ScheduleFilled />
                        },
                        {
                            title: 'Shop đã xác nhận đơn',
                            status: 'wait',
                            icon: <CodeSandboxSquareFilled />
                        },
                        {
                            title: 'Đang giao hàng',
                            status: 'wait',
                            icon: <TruckFilled />
                        },
                        {
                            title: 'Hoàn tất',
                            status: 'wait',
                            icon: <HomeFilled />
                        },
                        ]}
                    />
                    )}

                    {item.orderStatus==="identify"&&(
                        <Steps
                        current={current}
                        onChange={onChange}
                        responsive={false}
                        labelPlacement="vertical"
                        direction="horizontal"
                        items={[
                        {
                            title: 'Đơn mới tạo',
                            status: 'finish',
                            icon: <ScheduleFilled />
                        },
                        {
                            title: 'Shop đã xác nhận đơn',
                            status: 'finish',
                            icon: <CodeSandboxSquareFilled />
                        },
                        {
                            title: 'Đang giao hàng',
                            status: 'wait',
                            icon: <TruckFilled />
                        },
                        {
                            title: 'Hoàn tất',
                            status: 'wait',
                            icon: <HomeFilled />
                        },
                        ]}
                    />
                    )}
                </div>
                <div className="borderBottom"></div>
                <div className="yourOrder__item__detailOrder">
                    <div className="yourOrder__item__detailOrder__image">
                            <img src={item.image}/>
                        </div>
                    <div className="yourOrder__item__detailOrder__content">
                        <div className="yourOrder__item__detailOrder__content__name">{item.name}</div>
                        <div className="yourOrder__item__detailOrder__content__price">{formatVND(item.price)}</div>

                        <div className="yourOrder__item__detailOrder__content__tranportFee">
                            <div className="yourOrder__item__detailOrder__content__tranportFee__title">Phí giao hàng</div>
                            <div className="yourOrder__item__detailOrder__content__tranportFee__price">{formatVND(25000)}</div>
                        </div>
                        <div className="yourOrder__item__detailOrder__content__pay">
                            <div className="yourOrder__item__detailOrder__content__pay__title">Hình thức thanh toán</div>
                            <div className="yourOrder__item__detailOrder__content__pay__method">{item.method}</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        ))}
        </>
    )
}
export default YourOrder;