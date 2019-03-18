import React from 'react';
import './index.less';

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="home-wrap">
                欢迎学习IMooc后台管理系统课程
            </div>
        );
    }
}
