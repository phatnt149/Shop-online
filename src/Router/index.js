
import PrivateRouter from "../components/PrivateRouter";
import ProductNew from "../pages/ProductNew";
import Uniform from "../pages/Uniform";
import Accessories from "../pages/Accessories";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Resigter from "../pages/Resigter";
import About from "../pages/About";
import Contact from "../pages/Contact";



import LayoutDefaul from "../components/LayoutDefaul";
import DetailProduct from "../pages/DetailProduct";
import Orders from "../pages/Orders";
import PlaceOrder from "../pages/PlaceOrder";



export const router =[
    {
        path:"/",
        element:<LayoutDefaul/>,
        children:[
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/:id",
                element:<DetailProduct/>,
            },
            {
                path:"new-products",
                element:<ProductNew/>,
            },
            {
                path: "new-products/:id",
                element: <DetailProduct />, // trang chi tiết
            },
            {
                path:"uniform",
                element:<Uniform/>,
            },
            {
                path: "uniform/:id",
                element: <DetailProduct />, // trang chi tiết
            },
            {
                path:"accessories",
                element:<Accessories/>,
            },
            {
                path:"accessories/:id",
                element:<DetailProduct/>,
            },
            {
                path:"cart",
                element:<Cart/>,
            },
            {
                path:"placeOrder",
                element:<PlaceOrder/>,
            },
            {
                path:"orders",
                element:<Orders/>,
            },
             {
                path:"login",
                element:<Login/>,
            },
            {
                path:"resigter",
                element:<Resigter/>,
            },
            {
                path:"about",
                element:<About/>,
            },
            {
                path:"contact",
                element:<Contact/>,
            },
            {
                element:<PrivateRouter/>,
                children:[
                    {
                        path:"login",
                        element:<Login/>
                    },
                    {
                        path:"profile",
                        element:<Profile/>
                    },
                ]
            },
        ]
    }
]
