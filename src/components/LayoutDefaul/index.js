/* eslint-disable jsx-a11y/alt-text */
import { NavLink, Outlet } from 'react-router-dom';
import './LayoutDefaul.scss'
import { FieldTimeOutlined,PhoneOutlined,HomeOutlined, TruckOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined, TikTokOutlined, ShoppingCartOutlined, LogoutOutlined, UserOutlined, LoginOutlined, GiftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSixDo } from '../actions';
import { Badge, notification } from 'antd';
import { useEffect } from 'react';

function LayoutDefaul(){
    const userLogin = useSelector(state=>state.reducerLogin);
    let isLogin=false
    if(userLogin){
    isLogin=true;
    }
    else{
        isLogin=false;
}

    const dispatch = useDispatch();
    const handLogout =()=>{
        dispatch(logoutSixDo());
    }

    const quanlity = useSelector(state =>state.reducerCart)
    const quanlityCart = quanlity.reduce((sum, item)=>(sum = sum+item.quanlity),0)
    useEffect(() => {
    if (isLogin) {
      openNotificationWithIcon('success', "Chào mừng bạn đã ghé thăm");
    }
  }, [isLogin]);


    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mes) => {
        api[type]({
        title: type === 'success' ? "Thành công" : "Lỗi",
        description: mes,
    })}
    return(
        <>
        {contextHolder}
        <div className='LayoutDefaul'>
            <header className="header">
            <div className="menu">
                <div className="menu__logo"><NavLink to={'/'}><img src={"https://sixdo.vn/images/logo.svg"}></img></NavLink></div>
                <div className="menu__item">
                    <ul>
                        <div className='menu__default'>
                            <li><NavLink to={'/'}>Trang chủ</NavLink></li>
                            <li><NavLink to={'/new-products'}>Sản phẩm mới</NavLink></li>
                            <li><NavLink to={'/uniform'}>Đồng phục</NavLink></li>
                            <li><NavLink to={'/accessories'}>Phụ kiện</NavLink></li>
                        </div>
                        <div className='menu__personal'>
                            <li><NavLink to={'/cart'}><Badge count={quanlityCart}><div className="menu__personal__icon"><ShoppingCartOutlined /></div></Badge></NavLink></li>
                            {isLogin ? (
                                <>
                                <li><NavLink onClick={handLogout} to={'/login'}><div className="menu__personal__icon"><LogoutOutlined /></div></NavLink></li>
                                <li><NavLink to={'/orders'}><div className="menu__personal__icon"><GiftOutlined /></div></NavLink></li>
                                <li>
                                    <NavLink to={'/profile'}><div className="menu__personal__icon"><UserOutlined /></div></NavLink>
                                </li>
                                 <li className="menu__personal__userName">Xin chào {userLogin.name} !</li>
                                </>
                            ):(<>
                            <li><NavLink to={'/login'}><LoginOutlined /></NavLink></li>
                            </>)}
                        </div>               
                    </ul>
                </div>
            </div>
            </header>
            <main className="main">
                <div><Outlet/></div>
            </main>
            <footer className="footer">
                <div className="footer__infor">
                    <div className="footer__infor__item">
                        <div className="footer__infor__item__icon">
                         <FieldTimeOutlined />
                        </div>
                        <div className="footer__infor__item__title--prime">6 NGÀY ĐỔI TRẢ SẢN PHẨM</div>
                        <div className="footer__infor__item__title--sub">Đổi trả sản phẩm trong 6 ngày</div>
                    </div>

                    <div className="footer__infor__item">
                        <div className="footer__infor__item__icon">
                            <PhoneOutlined />
                        </div>
                        <div className="footer__infor__item__title--prime">HOTLINE 18006509</div>
                        <div className="footer__infor__item__title--sub">Hành chính 8h00-17h00, T2-CN nghỉ Tết Âm lịch</div>
                    </div>

                    <div className="footer__infor__item">
                        <div className="footer__infor__item__icon">
                            <HomeOutlined />
                        </div>
                        <div className="footer__infor__item__title--prime">HỆ THỐNG CỬA HÀNG</div>
                        <div className="footer__infor__item__title--sub">80 cửa hàng trên toàn hệ thống</div>
                    </div>

                    <div className="footer__infor__item">
                        <div className="footer__infor__item__icon">
                            <TruckOutlined />
                        </div>
                        <div className="footer__infor__item__title--prime">VẬN CHUYỂN</div>
                        <div className="footer__infor__item__title--sub">Đồng giá 25k toàn quốc</div>
                    </div>
                </div>
                <div className="footer__link">
                    <div className="footer__link__product">
                        <NavLink to={'/new-products'}>SẢN PHẨM MỚI</NavLink>
                        <NavLink to={'/uniform'}>ĐỒNG PHỤC</NavLink>
                        <NavLink to={'/accessories'}>PHỤ KIỆN</NavLink>
                    </div>
                    <div className="footer__link__store">
                        <NavLink to={'/about'}>VỀ CHÚNG TÔI</NavLink>
                        <NavLink to={'/contact'}>LIÊN HỆ</NavLink>
                    </div>
                    <div className="footer__link__social">
                        <div className='footer__link__social__GroupIcon'>
                            <div className="footer__link__social__GroupIcon__icon"><a href="https://www.facebook.com/sixdo.vn" target='_blank' rel="noreferrer"><FacebookOutlined /></a></div>
                            <div className="footer__link__social__GroupIcon__icon"><a href="https://www.instagram.com/sixdovn/" target='_blank' rel="noreferrer"><InstagramOutlined /></a></div>
                            <div className="footer__link__social__GroupIcon__icon"><a href="https://www.youtube.com/@SIXDO" target='_blank' rel="noreferrer"><YoutubeOutlined /></a></div>
                            <div className="footer__link__social__GroupIcon__icon"><a href="https://www.tiktok.com/@sixdoofficial?lang=vi-VN" target='_blank' rel="noreferrer"><TikTokOutlined /></a></div>
                        </div>
                        <div className="footer__link__social__image">
                            <img src="https://sixdo.vn/images/Thongbaobocongthuong.svg"/>
                        </div>
                    </div>
                </div>
                <div id="borderBottom"></div>
                <div className="footer__end">Copyright @2026 by PhatNguyen</div>

            </footer>
        </div>
        </>
    )
}
export default LayoutDefaul;