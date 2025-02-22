import React, { Component } from "react";
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './Header.scss';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userProcessLogout } from "../../../store/actions/userAction"

const withNavigate = (Component) => {
    return props => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }
}

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleLogout = () => {
        this.props.userProcessLogout();
        this.props.navigate('/login');
    }


    render() {

        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                <div className="system-container">
                    <div className="header">
                        <ul>
                            <li className="dropdown">
                                <a href="#" className="dropbtn">System</a>
                                <div className="dropdown-content">
                                    <div className="user-manager">
                                        <a href="#" className="user-manager-title">Manage</a>
                                        <div className="sub-dropdown">
                                            <Link to="/system/user-manage">User Manage</Link>
                                            <Link to="/system/user-manage-redux">User Manager Redux</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className="logout-btn" onClick={this.handleLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userProcessLogout: () => dispatch(userProcessLogout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigate(Header));