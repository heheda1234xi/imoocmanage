import React from 'react';
import {Row, Col} from 'antd';
import Util from "../../utils/util";
import axios from "../../axios";
import "./index.less";
import "antd/dist/antd.css";

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.setState({
            userName: 'imoocer'
        });

        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            });
        },1000);

        this.getWeatherAPIData();
    }

    getWeatherAPIData(){
        // let city = '北京';
        // axios.jsonp({
        //     url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=VcPo2bFVeGpO79L38EECQyKcGGgIC9eo'
        // }).then((res)=>{
        //     if(res.status === 'success'){
        //         let data = res.results[0].weather_data[0];
        //         this.setState({
        //             dayPictureUrl:data.dayPictureUrl,
        //             weather:data.weather
        //         })
        //     }
        // })
    }

    render() {

        const menuType = this.props.menuType;

        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ?
                            <Col span={6} className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>
                                    IOOC 通用管理系统
                                </span>
                            </Col>: ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' :
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                首页
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-detail">多云</span>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}
