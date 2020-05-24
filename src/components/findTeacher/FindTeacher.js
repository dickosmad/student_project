import React, { Component } from 'react';
import './FindTeacher.css';

export default class FindTeacher extends Component {
    render() {
        return (

                <div className="card">
                    <img src="https://i.pravatar.cc/125?image=3" alt="" className="profile-img"/>
                    <div className="teacher-description">
                    <h2 className="profile-name">Ramsey Harper</h2>
                    <p className="profile-position">Mathematics Professor</p> 
                    <p className="profile-info">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Facere a tempore, dignissimos odit accusantium
                        Repellat quidem, sit molestias dolorum placeat quas debitis ipsum esse rerum?
                    </p>
                    </div>  
                     <ul className="skills-list">
                        <li>Maths</li>
                        <li>JS</li>
                        <li>CSS</li>
                        <li>CSS</li>
                        <li>CSS</li>
                        <li>CSS</li>
                    </ul>
                </div>
        )
    }
}
