import React, { Fragment } from 'react';
import { formatDate } from '../../../utils/index';
import { getConfig } from '@edx/frontend-platform'

function CourseEnrollments({ enrollments }) {

    return (
        <Fragment>
            {
                enrollments.map(enrollment => {
                    return (
                        <div
                            className="card"
                            style={{ width: '300px', margin: '5px' }}
                            key={enrollment.course_details.course_id}
                        >
                            {/* TODO: Change the link to our courseDetail page */}
                            <a
                                className="h2"
                                href={
                                    getConfig().LMS_BASE_URL +
                                    '/courses/' +
                                    enrollment.course_details.course_id +
                                    '/course/'
                                }
                                target="_blank"
                            >
                                {enrollment.course_details.course_name}
                            </a>
                            <p>Course start {formatDate(enrollment.course_details.course_start)}</p>
                            <div
                                className="card-body"
                                style={{ flex: '1 0 21%', margin: '15px' }}
                            >
                                <img
                                    src={enrollment.discovery.data.image.src.replace("edx.devstack.lms","localhost")}
                                    alt="Course Image"
                                    style={{ width: '50%', margin: '5px' }}
                                />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            enrollment.short_description ||
                                            '<p>This course has no short description</p>',
                                    }}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default CourseEnrollments;
