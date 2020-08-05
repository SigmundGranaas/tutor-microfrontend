import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer';
import Coursecard from './CourseCard'
import './Courses.css'
import {updateUrl} from '../../utils'
import history from '../../data/history'
import { SearchField} from '@edx/paragon'
import { sendPageEvent } from '@edx/frontend-platform/analytics';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>


function Courses(props) {
  const [page, setPage] = useState(1);
  useEffect(() => {
    sendPageEvent('Courses');
    props.getCourses({page: page});
  }, []);

  const renderCourses = () => {
    let elements = [];
    if(props.courses.courses != undefined && props.courses.courses.length != 0 ){
     props.courses.courses.results.map((course) => {
       elements.push(
         <Coursecard key={course.key} cardType="Card" 
         anchor={`${process.env.LMS_BASE_URL}/courses/${course.key}/about`} 
         name={course.name} 
         imgSrc={course.media.image.small}
         short_description={course.short_description}
         />
       );
     });
    };
     return elements.length == 0?<p>No courses found</p>:elements;
    };
    

  const handlePageClick = data => {
    pageUrl(data.selected + 1)
    let selected = data.selected + 1;

    let page = Math.ceil(selected);
    setPage(page);
    props.getCourses({page:page});
  };

  const pageUrl = page =>{
    let basePath = '/courses';
    if(page != 1){
      basePath= basePath.concat('/page/'+ page)
    }
    history.push(basePath)
  }
  
  const searchCourses = value => {
    setPage(1);
    if(value != null){
      updateUrl({value, page:1})
      props.getCourses({page:page, search_term:value})}
    else{
      history.push('/courses')
      props.getCourses({page:page})
    }
  }
  return (
    <div className="CourseMain">
      <Header coursesLink={false} />
      <div className="courses-header">
          <h2>Courses</h2>
        </div>
      <div className="searchField">
      <SearchField 
              onClear={() => {searchCourses(null);}}
              onSubmit={(filter) => {
                  searchCourses(filter);
              }}
             
            />
           </div>
      <div className="CoursesContent">
      <div className="Courses">
      {renderCourses()}
      </div>
      <div className="paginateDADDY">
        {props.courses.courses.pagination && props.courses.courses.length != 0 != undefined ?
      <ReactPaginate
         previousLabel={<i class="fa fa-chevron-left"></i>}
         nextLabel={<i class="fa fa-chevron-right"></i>}
         breakLabel={'...'}
         breakClassName={'pagination-break'}
         pageCount={props.courses.courses.pagination.num_pages}
         marginPagesDisplayed={2}
         pageRangeDisplayed={5}
         onPageChange={handlePageClick}
         containerClassName={'pagination-container'}
         pageClassName={'pagespagination'}
         activeClassName={'pagination-active'}
         previousClassName={'pagination-previous'}
         nextClassName={'pagination-next'}
         activeLinkClassName={'pagination-active-page'}
         nextLinkClassName={'pagination-active'}
         previousLinkClassName={'pagination-active'}
         pageLinkClassName={'pagination-active'}
        /> :''}
      </div>
      </div>
      <Footer />
    </div>
  );
}
export default Courses;
 