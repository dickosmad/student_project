import React, { Component } from 'react';
import {Grid, Form, Dropdown } from 'semantic-ui-react' 
import firebase from '../../firebase';

const skillsOptions = [

    { key: 'mathematiques', text: 'Mathematiques', value: 'Mathematiques' },
    { key: 'Biology', text: 'Biology', value: 'Biology' },
    { key: 'Physics', text: 'Physics', value: 'Physics' },
    { key: 'Philosophy', text: 'Philosophy', value: 'Philosophy' },
];

const experienceOptions = [

    { key: 1, text: '0 - 1 year', value: 1 },
    { key: 1, text: '1 - 3 years', value: 1 },
    { key: 1, text: '3 year +', value: 1 },
    
]
export default class TeacherInfo extends Component {
    state = {
        
        schoolName:'',
        level:'',
        teachingField:'',
        showTeachearForm: false,
        errors:[],
        loading:false , 
        teacherRef: firebase.database().ref('teacher')
    }
    render() {
        return (
            <>
             
                          <Form.Input fluid name="text" icon="globe" iconPosition="left"
                        //   placeholder="Teaching Field" value={teachingField} 
                        //   className={this.handleInputError(errors,'teachingField')} 
                          onChange={this.handleChange} type="text" />

                          <Dropdown placeholder='Skills' 
                          fluid multiple selection 
                          options={skillsOptions} />
                            <br/>
                         <Dropdown 
                          placeholder='"Experience in Teaching"' 
                          fluid multiple selection
                        //   value = {experience}
                        //   className={this.handleInputError(errors,'teachingField')} 
                           options={experienceOptions} />
                            <br/>
                     
                          } 
            </>
        )
    }
}
