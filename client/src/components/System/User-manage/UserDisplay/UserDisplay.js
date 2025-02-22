import React, { Component } from 'react';
import './UserDisplay.scss';
import { handleFetchAllDoctorsAPI, handleDeleteDoctorAPI, handleEditDoctorAPI, handleCreateUserAPI } from '../../../../service/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import DoctorModal from '../ModalAddNew/doctorModal';
import DoctorEditModal from '../ModalEdit/modalEdit'

class UserManage extends Component {
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
            <div className="user-display-container">
                <DoctorModal
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
                <div className="user-display-table">
                    <h2>Users Manage</h2>

                    <button className="add-btn" onClick={() => this.handleAddDoctor()}><FontAwesomeIcon icon={faPlus} /> Add New User</button>

                    <table className="users">
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
                                    <tr key={item.userId}>
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
                </div>
            </div>
        )
    }
}

export default UserManage;   
