import React, {Component} from 'react';
import { Card, Row, Col, Modal } from 'antd';
import './ui.less'

class Gallery extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    openGallery = (imgSrc) => {
        this.setState({
            currentImg: imgSrc,
            visible: true
        });
    };

    render() {

        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png'],
            ['21.png', '22.png', '23.png', '24.png', '25.png']
        ];

        const imgList = imgs.map((list) => list.map((item) =>
            <Card
                style={{marginBottom: 10, marginLeft: 20}}
                cover={<img src={'/gallery/'+item}/>}
                onClick={()=>this.openGallery(item)}
            >
                <Card.Meta
                    title="React Admin"
                    description="慕课网"
                />
            </Card>
        ));

        return (
            <div className="card-wrap">
                <Row>
                    <Col md={5}>
                        {
                            imgList[0]
                        }
                    </Col>
                    <Col md={5}>
                        {
                            imgList[1]
                        }
                    </Col>
                    <Col md={5}>
                        {
                            imgList[2]
                        }
                    </Col>
                    <Col md={5}>
                        {
                            imgList[3]
                        }
                    </Col>
                    <Col md={5}>
                        {
                            imgList[4]
                        }
                    </Col>
                </Row>
                <Modal
                    width={550}
                    height={750}
                    visible={this.state.visible}
                    title="图片画廊"
                    onCancel={()=>{
                        this.setState({
                            visible: false
                        })
                    }}
                    footer={null}
                >
                    <img src={'/gallery/' + this.state.currentImg} style={{width: '100%'}}/>
                </Modal>
            </div>
        );
    }
}

export default Gallery;
