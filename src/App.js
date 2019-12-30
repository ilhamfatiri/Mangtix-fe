import React, {Component} from 'react';
import Switcer from "./components/Switcer";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import SwitcherTicket from "./components/SwitcherTicket";
import SwitcherEvent from "./components/SwitcherEvent";
import SwitcerCustomer from "./components/SwitcerCustomer";

export default class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
            <div id="wrapper">
                <Switcer/>
                <SwitcherTicket/>
                <SwitcherEvent/>
                <SwitcerCustomer/>
            </div>
                </Switch>
            </Router>
        );
    }
}
