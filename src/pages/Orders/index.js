import { Tabs } from "antd";
import "./orders.scss"
function Orders (){
    const item = [
        {
            label: `Giỏ hàng`,
            key: 1,
            children: `Content of Tab gio hàng `,
        },
         {
            label: `Trạng thái đơn hàng`,
            key: 2,
            children: `Content of Tab tt đơn hàng`,
        },
        {
            label: `Lịch sử đơn đặt hàng`,
            key: 3,
            children: `Content of Tab lịch sử `,
        }
    ]
    return (<>
    <div className="Cart">
        <Tabs
        tabPlacement="start"
        items={item}
      />
    </div>
    </>)
}
export default Orders;