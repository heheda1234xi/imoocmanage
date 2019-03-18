import React, {Component} from 'react';
import {Card, Carousel} from "antd";
import './ui.less';

class CarouselComponent extends Component {
    render() {
        return (
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay>
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片背景轮播" className="slider-wrap">
                    <Carousel autoplay>
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt="" style={{width: '100%'}}/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt="" style={{width: '100%'}}/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="" style={{width: '100%'}}/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}

export default CarouselComponent;
