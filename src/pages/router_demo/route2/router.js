import React, {Component} from 'react';
import {HashRouter, Route} from "react-router-dom";
import Main from "../route1/Main";
import About from "../route1/about";
import Topics from "../route1/topic";
import Home from "./Home";

class IRoute extends Component {
    render() {
        return (
            <HashRouter>
                <Home>
                    <Route exact={true} path="/main" render={()=>
                        <Main>
                            <div>
                                <Route path="/main/a" component={About}/>
                            </div>
                        </Main>
                    }/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                </Home>
            </HashRouter>
        );
    }
}

export default IRoute;
