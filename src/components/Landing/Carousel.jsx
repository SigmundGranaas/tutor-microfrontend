import React from 'react';
import Karousel from 'react-multi-carousel';



  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType } 
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button className="more-course-button" onClick={() => onClick()} />;
  };
  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType } 
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button className="more-course-button" onClick={() => onClick()} />;
  };

function Carousel(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 400 },
      items: props.noItems,
      slidesToSlide: 3, // optional, default to 1.
      partialVisibilityGutter: 1,
    },
    tablet: {
      breakpoint: { max: 1000, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
   return (
    <div>
       <Karousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              partialVisible={false}
              ssr={false} // means to render carousel on server-side.
              infinite={true}
              autoPlaySpeed={20000}
              autoPlay={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={700}
              deviceType="desktop"
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-50-px"
              customTransition="transform 300ms ease-in-out"
              focusOnSelect={true}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
              renderButtonGroupOutside={true}
              >
              {props.render()}
              
            </Karousel> 
    </div>)
}

export default Carousel;