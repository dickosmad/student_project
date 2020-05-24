import React, { Component } from 'react';
import { MDBBtn } from
"mdbreact";
import { Divider, Grid, Image, Segment } from 'semantic-ui-react';

import classrom from '../../assets/images/teaching_math.png'
import banner from '../../assets/images/banner_hero.png'
import './Hero.css'

export default class Hero extends Component {
    
    render() {
        
        return (
       <>
        <div className="hero-header">
            <div class="content">
                <h1> 📗 Apprenez  <br/>
                📘 Perfectionnez vous <br/>
                  📕En choisissez le meilleur professeur où que vous soyez.</h1>
                <button class="commencer">Commencer</button>
            </div>
            <div class=" slider">
                <img src={classrom} />   
            </div>
        </div>
        
        </>     

        )
    }
}


 