import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import about from '../../../assets/images/about_me.png'
import description from '../../../assets/images/mkm_description.svg'
import relation from '../../../assets/images/mkm_relation.svg'
import objectif from '../../../assets/images/mkm_objectif.svg'
import progres from '../../../assets/images/mkm_progres.svg'
import assistance from '../../../assets/images/mkm_assistance.svg'

import './About.css'

export default class About extends Component {
    render() {
        return (
            <>
            <section className="about">
                <div className='title_about' >
                    <h2>About <span>US</span> </h2>
                </div>
                <MDBContainer>
                    <MDBRow >
                        <MDBCol xs="12" sm="12" md="6" lg="6" >
                            <div className="title" >
                            <p> <span className='icons'><img  src={description} /> </span> Mali Kalan Mentor est une plateforme dedié aux éléves et aux profs .
                            Elle a pour but essentielle de mettre relation professeurs et eleves .  </p>
                            <p><span className='icons'><img  src={objectif} /> </span> Ses objectifs sont entre autres : </p>
                            <ul>
                                <li><span className='icons'><img  src={assistance} /> </span> Aider les éleves dans leur cursus scolaire </li>
                                <li><span className='icons'><img  src={relation} /> </span> Combler le manque de professeurs dans le pays  </li>
                                <li><span className='icons'><img  src={progres} /> </span>Permettre de progresser vite dans sa matière preferée avec le prof qu'on aime </li>
                            </ul>
                            </div>
                           
                        </MDBCol>
                        <MDBCol xs="12" sm="12" md="6" lg="6">
                            <img src={about} />
                        </MDBCol>
                        
                    </MDBRow>
                </MDBContainer>
            </section>

                
            </>
        )
    }
}
