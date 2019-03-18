import React, {Component} from 'react';
import {Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/util';

const FormItem = Form.Item;
const Option = Select.Option;

class Order extends Component {
    state = {
        orderConfirmVisble: false,
        orderInfo: {}
    };

    params = {
      page: 1
    };

    componentDidMount() {
        this.requestList();
    }

    onRowClick = (record,index)=>{
        let selectKey = [index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem: record
        })
    }

    requestList = () => {
        const _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: this.params.page
            }
        }).then((res)=>{
            if(res.code === "0"){
                let list = res.result.item_list.map((item, index)=>{
                    item.key = index;
                    return item;
                });

                this.setState({
                    list,
                    pagination: Utils.pagination(res, (current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    };


    //订单确认
    handleConfirm = () => {
        let item = this.state.selectedItem;

        if(!item){
            Modal.info({
                title: "信息",
                content: "请选择一条需要结束的订单"
            });

            return ;
        }
        axios.ajax({
            url: "/order/ebike_info",
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code === "0"){
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisble: true
                });
            }
        });
    };

    openOrderDetail = () => {
      let item = this.state.selectedItem;

      if(!item){
          Modal.info({
              title: "信息",
              content: "请选择一条订单"
          });
          return ;
      }

      window.open(`/#/common/order/detail/${item.id}`, '_blank');
    };

    //结束订单
    handleOrderFinish = () => {
        let item = this.state.selectedItem;

        axios.ajax({
            url: "/order/finish_order",
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code === "0"){
                message.success("订单结束成功");
                this.setState({
                    orderConfirmVisble: false
                });
                this.requestList();
            }
        });
    };

    render() {

        const columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn"
            },
            {
                title: "车辆编号",
                dataIndex: "bike_sn"
            },
            {
                title: "用户名",
                dataIndex: "user_name"
            },
            {
                title: "手机号码",
                dataIndex: "mobile"
            },
            {
                title: "里程",
                dataIndex: "distance",
                render(distance){
                    return distance / 1000 + "km";
                }
            },
            {
                title: "行驶时长",
                dataIndex: "total_time"
            },
            {
                title: "状态",
                dataIndex: "status"
            },
            {
                title: "开始时间",
                dataIndex: "start_time"
            },
            {
                title: "结束时间",
                dataIndex: "end_time"
            },
            {
                title: "订单金额",
                dataIndex: "total_fee"
            },
            {
                title: "实付金额",
                dataIndex: "user_pay"
            },

        ];

        const formLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        };

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }

        return (
            <div>
                <Card>
                    <FilterForm>

                    </FilterForm>
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft: 10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                    onOk={this.handleOrderFinish}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号：" {...formLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量：" {...formLayout}>
                            {this.state.orderInfo.battery + "%"}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Order;

class FilterForm extends React.Component {

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{width: 100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        )
                    }
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{width: 80}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

FilterForm = Form.create({})(FilterForm);
