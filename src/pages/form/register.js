import React, {Component} from 'react';
import {Card,
    Form,
    Button,
    Input,
    Checkbox,
    Radio,
    Select,
    Switch,
    DatePicker,
    TimePicker,
    Upload,
    Icon,
    message,
    InputNumber
} from "antd";
import Login from "../login";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class FormRegister extends Component {

    constructor(props){
        super(props);
        this.state = {
            userImage: ''
        };
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl: imageUrl,
                loading: false,
            }));
        }
    };

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 20
            }
        };

        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        };
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules:[
                                        {
                                            required: true,
                                            message: '用户名不能为空。'
                                        },
                                        {
                                            min: 5, max: 10,
                                            message: '长度不在范围内'
                                        },
                                        {
                                            pattern: new RegExp('^\w+$', 'g'),
                                            message: '用户名必须是英文字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input type="text" placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('userPassword', {
                                    initialValue: '',
                                    rules:[
                                        {
                                            required: true,
                                            message: '密码不能为空。'
                                        },
                                        {
                                            min: 5, max: 10,
                                            message: '长度不在范围内'
                                        },
                                        {
                                            pattern: new RegExp('^\w+$', 'g'),
                                            message: '用户名必须是英文字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input type="text" placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: ''
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber/>
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: ''
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">大橘猫</Option>
                                        <Option value="3">百度FE</Option>
                                        <Option value="4">创业者</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ['1']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">吃鸡</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">跑步</Option>
                                        <Option value="5">骑行</Option>
                                        <Option value="6">桌球</Option>
                                        <Option value="7">爬山</Option>
                                        <Option value="8 ">唱歌</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-08-08')
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '北京市海淀区奥林匹克公园'
                                })(
                                    <TextArea
                                        autosize={
                                            {
                                                minRows: 4,
                                                maxRows: 6
                                            }
                                        }
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImage')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                        {
                                            this.state.userImage? <img src={this.state.userImage} alt=""/>: <Icon type="plus"/>
                                        }
                                    </Upload>
                                )
                            }
                        </FormItem>
                        {/*<FormItem {...offsetLayout} labelCol={{offset: 3}}>*/}
                            {/*{*/}
                                {/*getFieldDecorator()(*/}
                                    {/*<Checkbox>*/}
                                        {/*我已经阅读过 <a href="#">慕课协议</a>*/}
                                    {/*</Checkbox>*/}
                                {/*)*/}
                            {/*}*/}
                        {/*</FormItem>*/}
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormRegister);
