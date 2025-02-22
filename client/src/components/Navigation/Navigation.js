import React, { Component } from 'react';
import './Navigation.scss';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="nav-container">
                <div className="nav-left">
                    <div className="app-logo">Logo</div>
                    <div className="about">About</div>
                    <div className="services">Services</div>
                    <div className="contact">Contact</div>
                    <div className="doctor">Doctors</div>
                    <div className="blog">Blog</div>
                </div>
                <div className="nav-right">
                    <div className="appointment">Appointment</div>
                </div>
            </div>
        )
    }
}

export default Navigation;