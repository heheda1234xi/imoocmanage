import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from "antd";

export default class Axios{
    // static jsonp(options) {
    //     // return new Promise((resolve, reject) => {
    //     //     JsonP(options.url, {
    //     //         param: 'callback'
    //     //     }, function (err, response) {
    //     //         if (response.status === 'success') {
    //     //             resolve(response);
    //     //         } else {
    //     //             reject(response.messsage);
    //     //         }
    //     //     })
    //     // })
    // }

    static ajax(options){
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        //当请求成功了调用resolve失败了调用reject
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'GET',
                baseURL: baseApi,
                timedOutAt: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if(response.status === 200){
                    let res = response.data;
                    if(res.code === "0"){
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        });
                    }
                } else {
                    reject(response.data);
                }
            })
        })
    }
}
