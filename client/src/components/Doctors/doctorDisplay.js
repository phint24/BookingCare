import React, { Component } from 'react';
import './doctorDisplay.scss';
import { handleFetchAllDoctorsAPI, handleDeleteDoctorAPI, handleEditDoctorAPI, handleCreateUserAPI } from '../../service/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import DoctorModal from '../System/User-manage/ModalAddNew/doctorModal';
import DoctorEditModal from '../System/User-manage/ModalEdit/modalEdit'

class DoctorDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            isOpenModalDoctor: false,
            isOpenModalEdit: false,
        }
    }

    async componentDidMount() {
        await this.handleGetAllUser();
    }

    handleGetAllUser = async () => {
        let respond = await handleFetchAllDoctorsAPI();
        // console.log('check respond: ', respond);
        if (respond && respond.errCode === 0) {
            this.setState({
                doctors: respond.data,
                isOpenModalDoctor: false,
                isOpenModalEdit: false,
            }, () => {
                // console.log('check doctors after setState: ', this.state.doctors);
            })
        }
    }

    handleDeleteDoctor = async (id) => {
        const respond = await handleDeleteDoctorAPI(id);
        if (respond && respond.errCode === 0) {
            alert(respond.message);
            await this.componentDidMount();
        }
    }

    handleEditDoctor = async (data) => {
        console.log("Receive edit req", data)
        const respond = await handleEditDoctorAPI(data);
        await this.componentDidMount();
    }

    handleAddDoctor = () => {
        this.setState({
            isOpenModalDoctor: true,
        })
    }

    handleOpenEditModal = (item) => {
        this.setState({
            isOpenModalEdit: true,
            doctorInfo: item
        })
    }

    toggle = () => {
        this.setState({
            isOpenModalDoctor: !this.state.isOpenModalDoctor,
        })
    }

    toggleEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        })
    }

    handleCreateDoctor = async (data) => {
        try {
            console.log("Get req create user: ", data)
            const newUser = await handleCreateUserAPI(data);
            console.log("check data add new: ", newUser)
            await this.componentDidMount();
        } catch (e) {
            console.log("Error!", e)
        }
    }

    render() {
        const arrUser = this.state.doctors;
        console.log(arrUser)
        return (
            <div className="doctor-display-container">
                {/* <DoctorModal
                    Open={this.state.isOpenModalDoctor}
                    toggleParent={this.toggle}
                    createDoctor={this.handleCreateDoctor}
                />

                {this.state.isOpenModalEdit &&
                    <DoctorEditModal
                        Open={this.state.isOpenModalEdit}
                        toggleParent={this.toggleEdit}
                        doctorEdit={this.state.doctorInfo}
                        editDoctor={this.handleEditDoctor}
                    />
                }
                <div className="doctor-display-table">
                    <h2>Doctors</h2>

                    <button className="add-btn" onClick={() => this.handleAddDoctor()}><FontAwesomeIcon icon={faPlus} /> Add New Doctor</button>

                    <table className="doctors">
                        <tbody>
                            <tr>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrUser && arrUser.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.userName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td >
                                            <button className="action-button" onClick={() => this.handleOpenEditModal(item)}><FontAwesomeIcon icon={faPencil} /></button>
                                            <button className="action-button" onClick={() => this.handleDeleteDoctor(item.userId)}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div> */}

                <div className="doctor-content-1">
                    <div className="top-doctor">
                        <div className="title">Top Medical Experts</div>

                        <div className="doctor-banner">
                            {arrUser && arrUser.map((item, index) => {
                                return (
                                    <div className="doctor-info">
                                        <div className="doctors-image">
                                            <img src="" alt="Doctors" />
                                        </div>
                                        <div className="doctors-name">
                                            <span className="main-title-2">{item.userName}</span>
                                        </div>
                                        <div className="doctors-speciality  ">
                                            <span className="main-title-2">{item.phoneNumber}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <hr />
                    </div>


                </div>

                <div className="doctor-content-2">
                    <div className="top-doctor">
                        <div className="title">All Doctors</div>

                        <div className="doctor-banner">
                            {arrUser && arrUser.map((item, index) => {
                                return (
                                    <div className="doctor-info">
                                        <div className="doctors-image">
                                            <img src="" alt="Doctors" />
                                        </div>
                                        <div className="doctors-name">
                                            <span className="main-title-2">{item.userName}</span>
                                        </div>
                                        <div className="doctors-speciality  ">
                                            <span className="main-title-2">{item.phoneNumber}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <hr />
                    </div>

                </div>
            </div>
        )
    }
}

export default DoctorDisplay;   
