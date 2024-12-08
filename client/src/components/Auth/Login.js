import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleUserLogin } from '../../service/userService';
import { userLoginSuccess } from '../../store/actions/userAction';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import './Login.scss';

const withNavigate = (Component) => {
    return props => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginForm: true,
            isShowPassword: false,
            email: '',
            password: '',
            userName: '',
            errorMessage: '',
        }
    }

    toggleForm = () => {
        this.setState(preState => ({
            isLoginForm: !preState.isLoginForm
        }));
    }

    handleOnChangeInput = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    handleLogin = async (e) => {
        e.preventDefault();
        this.setState({
            errorMessage: '',
        });
        try {
            const userData = await handleUserLogin(this.state.email, this.state.password);

            if (userData.errCode === 0) {
                this.props.userLoginSuccess(userData.user);
                console.log(userData);
                this.props.navigate('/');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message,
                    });
                }
            }
        }
    }

    handleSignUp = async (e) => {
        console.log(this.state.userName);
        console.log(this.state.email);
        console.log(this.state.password);
    }

    // handleShowHidePassword = () => {
    //     this.setState(preState => ({
    //         isShowPassword: !preState.isShowPassword
    //     }));
    // }

    render() {
        const { isLoginForm, email, password, userName } = this.state;

        return (
            <div className="login-container">
                {/* chuyển tab Login, Sign up */}
                <div className="login-tabs">
                    <div className={`tab ${isLoginForm ? 'active' : ''}`}
                        onClick={() => this.setState({ isLoginForm: true })}>
                        Login
                    </div>
                    <div className={`tab ${isLoginForm ? '' : 'active'}`}
                        onClick={() => this.setState({ isLoginForm: false })}>
                        Sign up
                    </div>
                </div>

                {/* form login */}
                <div className="login-form">
                    {isLoginForm ? (
                        <form onSubmit={this.handleLogin}>
                            <div className="form-group">
                                <input className="form-control"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleOnChangeInput}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                    // type={this.state.isShowPassword ? 'text' : 'password'}
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleOnChangeInput}
                                    placeholder="Enter your password"
                                />
                            </div>
                            {this.state.errorMessage && (
                                <div className="error-message" style={{ color: 'red', fontSize: '14px', marginTop: '10px', textAlign: 'center', width: '92%' }}>
                                    {this.state.errorMessage}
                                </div>
                            )}
                            <button type="submit" className="submit-btn login" onClick={this.handleLogin}>Login</button>
                            <div className="forgot-password">
                                <a href="#">Forgot password?</a>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input className="form-control"
                                    type="text"
                                    name="userName"
                                    value={this.state.userName}
                                    onChange={this.handleOnChangeInput}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleOnChangeInput}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleOnChangeInput}
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button type="submit" className="submit-btn signup" onClick={this.handleSignUp}>Sign up</button>
                        </form>
                    )}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(userLoginFail()),
        userLoginSuccess: (userData) => dispatch(userLoginSuccess(userData)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withNavigate(Login));