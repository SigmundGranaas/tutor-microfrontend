import React from 'react';
import './CourseCard.css'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

function CourseCard(props) {
   return (
    <div className={props.cardType}>
        <img src={props.imgSrc} alt="" className="CourseCardImage"/>
            <div className="CardContent">
            <div className="CardTextContent">
            <h4><a href={props.anchor} className="Card_title">{props.name}</a></h4>
            
            <p>{props.short_description}</p>
            </div>
            <hr/>
            <div className="viktigeDatoer">
                <div > 03.07.2020</div> <div>-</div> <div> 20.12.2020</div>
            </div>
            <div className="CardButtonsDiv">
                <a href={props.anchor}><div className={`${"CardButtonsReadMore"} ${"CardButtonsColorBlue"}`}>Read More</div></a>
                <a href="/courses"><div className="fa fa-check CardButtonsEnroll"></div></a>
                <a href="/courses"><div className="fa fa-bell CardButtonsEnroll"></div></a>
                <a href="/courses"><div className="fa fa-share CardButtonsEnroll"></div></a>
            </div>
        </div>
            
    </div>)
}

export default CourseCard;