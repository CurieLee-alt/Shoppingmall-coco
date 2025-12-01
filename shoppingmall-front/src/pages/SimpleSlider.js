import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/SimpleSlider.css';
import bannerImgSkincare from '../images/banner/banner_skincare_bg.png';
import bannerImgMakeup from '../images/banner/banner_makeup_bg.png';
import bannerImgBody from '../images/banner/banner_body_bg.png';
import bannerImgHomme from '../images/banner/banner_homme_bg.png';

function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '20px'
    };
    return (
        <div className="slider_container">
            <Slider {...settings}>
                {/* 1번째 슬라이드 (스킨케어) */}
                <div>
                    <div 
                        className="slide page1 skincare-slide"
                        style={{ backgroundImage: `url(${bannerImgSkincare})` }}
                    >
                        <div className="banner-content-skincare">
                            <h3>촉촉하게 차오르는<br/>수분 광채</h3>
                            <p>건조한 피부에 즉각적인 생기를 더하는<br/>코코의 수분 솔루션</p>
                            {/* 스킨케어 카테고리(예: categoryNo=1)로 이동 */}
                            <Link to="/product?categoryNo=1" className="btn-skincare-link">
                                스킨케어 라인 보기 &gt;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2번째 슬라이드 (메이크업) */}
                <div>
                    <div 
                        className="slide page2 makeup-slide"
                        style={{ backgroundImage: `url(${bannerImgMakeup})` }}
                    >
                        <div className="banner-content-makeup">
                            <h3>설렘 가득,<br/>메이크업</h3>
                            <p>당신의 일상을 화사하게 밝혀줄<br/>코코의 로맨틱 컬렉션</p>
                            {/* 메이크업 카테고리(categoryNo=2)로 이동 */}
                            <Link to="/product?categoryNo=2" className="btn-makeup-link">
                                메이크업 라인 보기 &gt;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 3번째 슬라이드 (바디케어) */}
                <div>
                    <div 
                        className="slide page3 body-slide"
                        style={{ backgroundImage: `url(${bannerImgBody})` }}
                    >
                        <div className="banner-content-body">
                            <h3>일상 속 작은 쉼표,<br/>내추럴 바디 케어</h3>
                            <p>지친 몸과 마음에 전하는<br/>자연의 깊은 위로</p>
                            {/* 바디케어 카테고리(예: categoryNo=3)로 이동 */}
                            <Link to="/product?categoryNo=3" className="btn-body-link">
                                바디/헤어 라인 보기 &gt;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4번째 슬라이드 (옴므) */}
                <div>
                    <div
                        className="slide page4 homme-slide"
                        style={{ backgroundImage: `url(${bannerImgHomme})` }}
                    >
                        {/* 텍스트 내용을 감싸는 컨테이너 */}
                        <div className="banner-content-right">
                            <h3>그 남자의 관리법,<br />코코 옴므</h3>
                            <p>복잡한 단계 없이, 심플하고 완벽하게</p>
                            {/* 버튼 클릭 시 옴므 카테고리(예: categoryNo=4)로 이동 */}
                            <Link to="/product?categoryNo=4" className="btn-banner-link">
                                옴므 라인 보기 &gt;
                            </Link>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default SimpleSlider;