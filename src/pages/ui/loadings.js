import React, {Component} from 'react';
import {Card, Button, Spin, Icon, Alert} from "antd";
import './ui.less';

class Loadings extends Component {
    render() {
        const icon = <Icon type="loading" style={{fontSize: 36}}/>;
        return (
            <div>
                <Card title="Spin的用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin: '0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{marginLeft: "15px"}}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert message="React" description="欢迎来到React高级实战课程" type="info"/>
                    <Spin>
                        <Alert message="React" description="欢迎来到React高级实战课程" type="warning"/>
                    </Spin>
                    <Spin tip="加载中..." indicator={icon}>
                        <Alert message="React" description="欢迎来到React高级实战课程" type="warning"/>
                    </Spin>
                </Card>
            </div>
        );
    }
}

export default Loadings;
