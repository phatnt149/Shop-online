import { Grid, Tabs } from "antd";
import "./orders.scss"
import YourOrder from "./YourOrder";
import HistoryOrder from "./HistoryOrder";
function Orders (){
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const item = [
         {
            label: `Đơn hàng của bạn`,
            key: 1,
            children: <YourOrder/>,
        },
        {
            label: `Lịch sử đơn đặt hàng`,
            key: 2,
            children: <HistoryOrder/>,
        }
    ]
    return (<>
    <div className="Cart">
        <Tabs
        tabPlacement="top"
        items={item}
      />
    </div>
    </>)
}
export default Orders;