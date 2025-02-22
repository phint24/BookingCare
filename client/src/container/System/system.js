import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManage from '../../components/System/User-manage/UserDisplay/UserDisplay';
import Header from '../../components/System/Header/Header';
import UserRedux from '../../components/System/UserManageRedux/UserManageRedux';
import { connect } from 'react-redux';

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    render() {
        // const { isLoggedIn } = this.props;
        const isLoggedIn = true;
        console.log("check isLoggedIn props: ", this.props);
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <Routes>
                        <Route path="/" element={<UserManage />} />
                        <Route path="/user-manage" element={<UserManage />} />
                        <Route path="/user-manage-redux" element={<UserRedux />} />
                    </Routes>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("check state: ", state.user.isLoggedIn)
    return {
        // started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(System);
