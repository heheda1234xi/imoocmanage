import React from 'react';
import { Row, Col } from 'antd';
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import Home from "./pages/home";

import "antd/dist/antd.css";
import "./style/common.less";

export default class Admin extends React.Component{
    render() {
        return (
            <Row className="container">
                <Col span="4" className="nav-left">
                    <NavLeft></NavLeft>
                </Col>
                <Col span="20" className ="main">
                    <Header></Header>
                    <Row className="content">
                        {/*使用this.props.children动态加载路由组件*/}
                        {this.props.children}
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        );
    }
}
