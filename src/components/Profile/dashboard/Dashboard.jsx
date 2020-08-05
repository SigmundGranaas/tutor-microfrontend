import React, { Fragment, useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from '@edx/frontend-platform/i18n';
import {
  getCourseEnrollments,
  getProgramEnrollments,
} from '../../../data/actions/dashboard';
import { sendPageEvent } from '@edx/frontend-platform/analytics';
import { AppContext } from '@edx/frontend-platform/react'
import { Carousel } from 'react-bootstrap';
import cardImage from '../../../assets/ntnu_alt_versjon_uten_slagord.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCertificate, faStar } from '@fortawesome/free-solid-svg-icons'
import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer';

import CourseEnrollments from './CourseEnrollments';


function Dashboard({
  dashboard: {
    isLoadingCourses,
    isLoadingPrograms,
    courseEnrollments,
    courseEnrollmentCount,
    programEnrollments,
  },
  getCourseEnrollments,
  getProgramEnrollments,
}) {

  useEffect(() => {
    sendPageEvent('Dashboard');
    getCourseEnrollments();
    getProgramEnrollments();
  }, []);

  const [programIndex, setProgramIndex] = useState(0);
  const { authenticatedUser } = useContext(AppContext);

  const handleCarouselSelect = (selectedIndex, e) => {
    setProgramIndex(selectedIndex);
  };

  const renderCourses = () => {
    if(courseEnrollments != undefined){
    const enrollments = courseEnrollments;
    console.log(enrollments);
    return (
      <div className="dashboard-courses-container">
        <CourseEnrollments enrollments={enrollments} />
      </div>
    )}
  };

  const mockPrograms = [
    {
      "title": "Master's Degree in Chemistry",
      "points": 300,
      "image": cardImage,
      "short_description": "Totally legit",
      "link": "https://ntnu.no/"

    },
    {
      "title": "Bachelor's Degree in Gender Studies",
      "points": 180,
      "image": cardImage,
      "short_description": "Totally not legit",
      "link": "https://ntnu.no/"

    },
    {
      "title": "Docker Certification",
      "points": 15,
      "image": cardImage,
      "short_description": "Totally awesome",
      "link": "https://ntnu.no/"

    },
  ]

  const renderPrograms = () => {
    const programs = mockPrograms;
    const elements = []

    for (let i = 0; i < programs.length; i++) {
      elements.push(
        <Carousel.Item>
          <img src={cardImage} className="d-block dashboard-carousel-card-image" alt="" />
          <div style={{ zIndex: "-5000", height: "500px", width: "100%", position: "absolute", top: "0", left: "0", display: "inline-block" }}></div>
          <Carousel.Caption>
            <div className="dashboard-carousel-card-caption">
              <a href="https://ntnu.no/" target="_blank" className="h4">{programs[i].title}</a>
              <div style={{ marginBottom: "0em" }}>
                <FontAwesomeIcon icon={faStar} style={{ display: "inline", color: "#482776" }} />
                {' '}<span style={{ fontWeight: 600 }}>{programs[i].points}</span>
              </div>
              <p>{programs[i].short_description}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      )
    }

    return (
      <div className="dashboard-carousel-container">
        <Carousel activeIndex={programIndex} onSelect={handleCarouselSelect} interval={null} >
          {elements}
        </Carousel>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <div className="dashboard-programs">
          <h4 className="dashboard-courses-title">My Programs</h4>
          {isLoadingPrograms ? <p>Loading...</p> : renderPrograms()}
        </div>
        <div className="dashboard-courses">
          <h4 className="dashboard-courses-title">
            My Courses
          </h4>
          {isLoadingCourses ? <p>Loading...</p> : renderCourses()}
        </div>
        <div className="dashboard-summary">
          <h4 className="dashboard-courses-title">
            Summary
          </h4>
          <div className="dashboard-summary-content">
            <div style={{ marginBottom: "1em" }}>
              <FontAwesomeIcon icon={faUser} style={{ display: "inline" }} />
              {' '}{authenticatedUser.username}
            </div>
            <p>Enrolled Programs: 3</p>
            <p>Enrolled Courses: {courseEnrollmentCount}</p>
            <p>Available Courses: 20</p>
            <p style={{ fontWeight: "bold" }}>Badges</p>
            <div style={{ marginBottom: "1em" }}>
              <FontAwesomeIcon icon={faCertificate} style={{ display: "inline", color: "gold" }} />
              {' '}Master's in Chemistry Completed
            </div>
            <div style={{ marginBottom: "1em" }}>
              <FontAwesomeIcon icon={faCertificate} style={{ display: "inline", color: "gold" }} />
              {' '}Bachelor's in Gender Studies Completed
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {
  getCourseEnrollments,
  getProgramEnrollments,
})(injectIntl(Dashboard));
