/* eslint-disable jsx-a11y/alt-text */

import { Carousel } from 'antd';
import DrawAllProduct from './DrawAllProduct';
import InstagramSocial from './InstagramSocial';
function Home(){
 
    return(
        <>
        <div className='Caroussel'>
            <Carousel autoplaySpeed={2000} autoplay>
                <div>
                    <img src='https://sixdo.vn/images/banners/resized/web-six-1766068503.webp'/>
                </div>
                <div>
                    <img src='https://sixdo.vn/images/banners/resized/cover-page-six-1766108229.webp'/>
                </div>
            </Carousel>
        </div>

        <div className='newArival'>
            <h2 className='titleSection'>NEW ARRIVAL</h2>
            <DrawAllProduct/>
            <div id="borderBottom"></div>
        </div>

        <div className='InstagramSocial'>
            <h2 className='titleSection'>INSTAGRAM<br/>@sixdo.vn</h2>
            <InstagramSocial/>
        </div>
        </>
    )
}

export default Home;