import React from 'react';
import './doctorModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

class DoctorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: '',
        }
    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleParent();
    }

    handleOnChangeInput = (event, id) => {
        const copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            // console.log("check state after change: ", this.state)
        })
    }

    validateInput = () => {
        let isValid = true;
        const arrInput = ['email', 'userName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing input parameter ' + arrInput[i])
                break;
            }
        }

        return isValid;
    }

    handleAddNewDoctor = async (e) => {
        let isValid = this.validateInput();

        if (isValid) {
            console.log(this.props)
            this.props.createDoctor(this.state);
            console.log("data log: ", this.state);
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.Open} toggle={() => this.toggle()} className="custom-modal">
                <ModalHeader className="modal-header">Add New Doctor
                    <button onClick={() => this.toggle()} className="close-button"><FontAwesomeIcon icon={faXmark} /></button>
                </ModalHeader>
                <ModalBody className="modal-body">
                    <hr />
                    <div className="modal-body-content">
                        <label>Full Name</label>
                        <input
                            type="text"
                            onChange={(event) => this.handleOnChangeInput(event, "userName")}
                            className="input-modal"
                            placeholder="Enter name"
                            name="userName"
                            value={this.state.userName}
                        />

                        {/* <label>Speciality</label>
                        <input
                            type="text"
                            onChange={(event) => this.handleOnChangeInput(event, "Speciality")}
                            className="input-modal"
                            placeholder="Enter speciality"
                            name="speciality"
                            value={this.state.speciality}
                        /> */}

                        <label>Phone Number</label>
                        <input
                            type="text"
                            onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                            className="input-modal"
                            placeholder="Enter phone number"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            onChange={(event) => this.handleOnChangeInput(event, "email")}
                            className="input-modal"
                            placeholder="Enter email"
                            name="email"
                            value={this.state.email}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            onChange={(event) => this.handleOnChangeInput(event, "password")}
                            className="input-modal"
                            placeholder="Enter password"
                            name="password"
                            value={this.state.password}
                        />

                        <label>Address</label>
                        <input
                            type="text"
                            onChange={(event) => this.handleOnChangeInput(event, "address")}
                            className="input-modal"
                            placeholder="Enter address"
                            name="address"
                            value={this.state.address}
                        />
                    </div>
                    <hr />
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <Button onClick={() => this.handleAddNewDoctor()} color="primary" className="btn-primary">
                        Add Doctor
                    </Button>
                    <Button onClick={() => this.toggle()} color="secondary" className="btn-secondary">
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        // isOpen: state.app.isOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // toggle: () => dispatch(actions.toggleModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorModal);
