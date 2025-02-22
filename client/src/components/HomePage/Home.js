import React, { Component } from 'react';
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHospital, faCalendar, faUserDoctor, faHouseChimneyMedical } from '@fortawesome/free-solid-svg-icons';
import Services from '../../assets/images/service.jpg'
import Navigation from '../Navigation/Navigation';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="home-container">
                {/*Navigation*/}
                <Navigation />
                {/* --About-- */}
                <div className="about-container">
                    <div className="about-content">
                        <div className="about-name">About Us</div>
                        <div className="about-title">
                            <span className="main-title">Healthcare Solutions</span>
                        </div>
                        <div className="about-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <button className="about-button">Find Doctors</button>
                    </div>
                </div>

                <div className="more-container">
                    <div className="more-content-1">
                        <div className="more-title">
                            <span className="test">Opening Hours</span>
                            <FontAwesomeIcon icon={faClock} size="1x" />
                        </div>
                        <div className="more-description">
                            <div className="more-weekday">
                                <span className="more-day">Monday - Friday</span>
                                <span className="more-time">8:00 AM - 17:00 PM</span>
                            </div>

                            <div className="more-weekend">
                                <span className="more-day">Saturday - Sunday</span>
                                <span className="more-time">9:00 AM - 15:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className="more-content-2">
                        <div className="more-title">
                            <span className="test">Appointment</span>
                            <FontAwesomeIcon icon={faCalendar} />
                        </div>
                        <div className="more-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.

                            </p>
                        </div>
                        <div className="more-button">
                            <button className="button">More</button>
                        </div>
                    </div>

                    <div className="more-content-2">
                        <div className="more-title">
                            <span className="test">Find Doctors</span>
                            <FontAwesomeIcon icon={faUserDoctor} />
                        </div>
                        <div className="more-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.

                            </p>
                        </div>
                        <div className="more-button">
                            <button className="button">Doctors</button>
                        </div>
                    </div>

                    <div className="more-content-2">
                        <div className="more-title">
                            <span className="test">Find Clinic</span>
                            <FontAwesomeIcon icon={faHouseChimneyMedical} />
                        </div>
                        <div className="more-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="more-button">
                            <button className="button">Clinics</button>
                        </div>
                    </div>
                </div>

                {/* --Services-- */}
                <div className="services-container">

                    <div className="services-name">Services</div>
                    <div className="services-title">
                        <span className="main-title">Our Medical Services</span>
                    </div>
                    <div className="services-content">
                        <div className="services-image">
                            <img src={Services} alt="Services" />
                        </div>
                        <div className="services-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                            <button className="services-button">See More</button>
                        </div>
                    </div>

                </div>

                {/* --Features-- */}
                <div className="features-container">
                    <div className="features-name">Features</div>
                    <div className="features-title">
                        <span className="main-title">Our Specialities</span>
                    </div>
                    <div className="features-content">
                        <div className="features-icon">
                            <FontAwesomeIcon icon={faHospital} />
                        </div>
                        <div className="features-description">
                            <div className="features-title">
                                <span className="main-title-2">Online Appointment</span>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                            <button className="features-button">See More</button>
                        </div>
                        <div className="features-image">
                            <img src={""} alt="Features" />
                        </div>
                    </div>
                </div>

                {/* --TimeTable-- */}
                <div className="timetable-container">
                    <div className="timetable-content">
                        <div className="timetable-name">TimeTable</div>
                        <div className="timetable-title">
                            <span className="main-title">Our TimeTable</span>
                        </div>
                        <div className="timetable-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <button className="timetable-button">Schedule</button>
                    </div>
                    <div className="timetable-image">
                        <img src={Services} alt="Timetable" />
                    </div>
                </div>

                {/* --Doctors-- */}
                <div className="doctors-container">
                    <div className="content-name">Doctors</div>
                    <div className="content-title">
                        <span className="main-title">Our Doctors</span>
                    </div>
                    <div className="doctors-content">
                        <div className="doctors-info">
                            <div className="doctors-image">
                                <img src={Services} alt="Doctors" />
                            </div>
                            <div className="doctors-name">
                                <span className="main-title-2">Dr. John Doe</span>
                            </div>
                            <div className="doctors-speciality  ">
                                <span className="main-title-2">Cardiologist</span>
                            </div>
                        </div>

                        <div className="doctors-info">
                            <div className="doctors-image">
                                <img src={Services} alt="Doctors" />
                            </div>
                            <div className="doctors-name">
                                <span className="main-title-2">Dr. John Doe</span>
                            </div>
                            <div className="doctors-speciality  ">
                                <span className="main-title-2">Cardiologist</span>
                            </div>
                        </div>

                        <div className="doctors-info">
                            <div className="doctors-image">
                                <img src={Services} alt="Doctors" />
                            </div>
                            <div className="doctors-name">
                                <span className="main-title-2">Dr. John Doe</span>
                            </div>
                            <div className="doctors-speciality  ">
                                <span className="main-title-2">Cardiologist</span>
                            </div>
                        </div>

                        <div className="doctors-info">
                            <div className="doctors-image">
                                <img src={Services} alt="Doctors" />
                            </div>
                            <div className="doctors-name">
                                <span className="main-title-2">Dr. John Doe</span>
                            </div>
                            <div className="doctors-speciality  ">
                                <span className="main-title-2">Cardiologist</span>
                            </div>
                        </div>
                    </div>

                    <button className="doctors-button">See All</button>
                </div>
            </div>

        )
    }
}

export default Home;