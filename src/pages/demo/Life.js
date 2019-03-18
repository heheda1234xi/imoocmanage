import React from 'react';
import {Button} from 'antd';
// import "antd/dist/antd.css";

export default class Life extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0 
        };
    }

    handleClick(){
        this.setState({
            count: this.state.count + 1
        });
    }

    render(){
        return (
            <div>
                <Button onClick={this.handleClick.bind(this)}>点击一下</Button>
                <p>
                    {this.state.count}
                </p>
            </div>
        );
    }
}