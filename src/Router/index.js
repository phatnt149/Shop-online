
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
                path:"accessories",
                element:<Accessories/>,
            },
            {
                path:"cart",
                element:<Cart/>,
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
