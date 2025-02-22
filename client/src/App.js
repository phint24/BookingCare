import './assets/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/HomePage/Home';
import Login from './components/Auth/Login';
import Navigation from './components/Navigation/Navigation';
import DoctorDisplay from './components/Doctors/doctorDisplay';
import System from './container/System/system';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { isLoggedIn } = this.props;
        console.log("check props to take isLoggedIn", this.props)
        return (
            <React.Fragment>
                <div className="main-container">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
                            <Route path="/doctors" element={<DoctorDisplay />} />
                            <Route path="/system/*" element={<System />} />
                            <Route path="/test" element={<Navigation />} />
                        </Routes>
                    </BrowserRouter>
                </div>

            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        // started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
