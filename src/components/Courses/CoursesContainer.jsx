import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getCourses } from '../../data/actions/courses';
import Courses from './Courses';

const mapStateToProps = (state) => ({
  courses: state.courses,
});

// const mapDispatchToProps = (dispatch) => ({ getCourses });

const CoursesContainer = connect(mapStateToProps, { getCourses }, null, {
  forwardRef: true,
})(Courses);

export default withRouter(CoursesContainer);
