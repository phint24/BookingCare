import React from 'react';
import './modalEdit.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import _isEmpty from 'lodash/isEmpty';

class DoctorEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            email: '',
            phoneNumber: '',
            address: '',
        }
    }

    componentDidMount() {
        console.log("check prop doctor: ", this.props)
        const { doctorEdit } = this.props;
        if (doctorEdit && !_isEmpty(doctorEdit)) {
            this.setState({
                userId: doctorEdit.userId,
                userName: doctorEdit.userName,
                email: doctorEdit.email,
                phoneNumber: doctorEdit.phoneNumber,
                address: doctorEdit.address,
            })

        }
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

    handleEditDoctorModal = async (e) => {
        let isValid = this.validateInput();

        if (isValid) {
            console.log(this.props)
            this.props.editDoctor(this.state);
            console.log("data log: ", this.state);
        }
    }

    render() {
        console.log("check doctor edit: ", this.props)
        return (
            <Modal isOpen={this.props.Open} toggle={() => this.toggle()} className="custom-modal">
                <ModalHeader className="modal-header">Edit Doctor Infomation
                    <button onClick={() => this.toggle()} className="close-button"><FontAwesomeIcon icon={faXmark} /></button>
                </ModalHeader>
                <ModalBody className="modal-body">
                    <hr />
                    <div className="modal-body-content">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={this.state.userName}
                            onChange={(event) => this.handleOnChangeInput(event, "userName")}
                            className="input-modal"
                            placeholder="Enter name"
                            name="userName"

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
                            value={this.state.phoneNumber}
                            onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                            className="input-modal"
                            placeholder="Enter phone number"
                            name="phoneNumber"

                        />

                        <label>Email</label>
                        <input
                            type="email"
                            value={this.state.email}
                            onChange={(event) => this.handleOnChangeInput(event, "email")}
                            className="input-modal"
                            placeholder="Enter email"
                            name="email"

                        />

                        <label>Address</label>
                        <input
                            type="text"
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, "address")}
                            className="input-modal"
                            placeholder="Enter address"
                            name="address"

                        />
                    </div>
                    <hr />
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <Button color="primary" className="btn-primary" onClick={() => this.handleEditDoctorModal()}>
                        Update
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
        isOpen: state.app.isOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // toggle: () => dispatch(actions.toggleModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorEditModal);
