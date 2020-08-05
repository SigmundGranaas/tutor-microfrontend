import React from 'react';
import './UserStory.css'

function UserStory(props) {
   return (
    <div className="user-story">
        <img src={props.imgSrc} alt="" className="user-story-image"/>
        <div className="user-story-content">
        <blockquote cite="Andreas Krokan">
            
            <div
            dangerouslySetInnerHTML={{
              __html:
                props.text ||
                '<p>No short description available</p>',
            }}
          />
          </blockquote>
        </div>
    </div> )
} 

export default UserStory;