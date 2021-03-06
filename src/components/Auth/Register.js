import React, { Component } from 'react';
import {Grid, Form, Segment,Button,Header,Message,Icon ,Checkbox, Dropdown } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import TeacherInfo from './TeacherInfo'
import md5 from 'md5';

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
export default class Register extends Component {
    state = {
        email:'',
        username:'',
        password:'',
        passwordConfirmation:'',
        schoolName:'',
        teachingField:'',
        experience:'',
        showteacherForm: false,
        errors:[],
        loading:false , 
        usersRef: firebase.database().ref('users')
    }

    handleChange = (event)=> {
        this.setState({[event.target.name]:event.target.value})
    }

    toggleForm = () => {
        this.setState({showteacherForm: !this.state.showteacherForm})
    }


    isFormValid = () =>{
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = {message: 'Fill in all fields'};
            this.setState({errors : errors.concat(error)});
            return false;
            // throw error
        } else if(!this.isPasswordValid(this.state)){
            // throw an error
            error = { message: 'Password is invalid' }
            this.setState({errors:  errors.concat(error)});
            return false
        }else {
            return true
        }
    }
    isFormEmpty = ({username,email,password,passwordConfirmation}) =>{
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }
    isPasswordValid = ({password, passwordConfirmation}) => {
        if( password.length < 6 || passwordConfirmation.length < 6 ){
            return false ;    
        } else if (password !== passwordConfirmation) {
            return false ;
        } else {
            return true ;
        }
    }
    isTeacherValid = ({showteacherForm , experience }) => showteacherForm && experience ; 

    displayErrors = errors => errors.map((error,i) =><p key={i} >{error.message} </p> )

    users = () => this.firebase.auth.ref('users');

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.isFormValid()){
            this.setState({error:[], loading:true })
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(createdUser => {
            createdUser.user.updateProfile({
                displayName: this.state.username,
                photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                
            })
            .then(() =>{
                this.setState({loading:false})
            })
            .then(() =>{
                this.saveUser(createdUser).then(()=> {
                    console.log('User Saved');
                    console.log('')
                })
            }).then(()=>{
                firebase.database().ref('users/').once('value', function (snapshot) {
                    console.log(snapshot.val())
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({ errors: this.state.errors.concat(err) , loading:false })
            })
        })
        .catch(err =>{
            console.error(err)
            this.setState({errors:this.state.errors.concat(err), loading:false  })
        }).then(()=>{
            firebase.database().ref('users/').once('value', function (snapshot) {
                console.log(snapshot.val())
            });
        })
        
      }
    }
    saveUser = (createdUser) =>{
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName ,
            avatar: createdUser.user.photoURL,
            roles :  this.state.showteacherForm ? ['teacher'] : ['student'],
            skills : 'skills',
            teachingExperience : 'teaching'
           
        })
    }


    handleInputError = ( errors , inputName ) =>{
       return errors.some(error => 
            error.message.toLowerCase().includes(inputName)) 
            ? "error"
            : ""
    }
    render() {
        const {email , username , passwordConfirmation , password , errors , loading,teachingField,experience} = this.state ;
        return (
            <Grid textAlign="center" verticalAlign="middle" style={{transform:'translateY(50%)'}} >
             <Grid.Column style={{maxWidth:450}}  >
                 <Header as="h2" icon color="orange">
                     <Icon name="puzzle piece" color="orange"/>
                     Register for MKM
                 </Header>
                 <Form size='large' onSubmit={this.handleSubmit} >
                     <Segment stacked >
                     <Form.Field>
                            Are you a Teacher: <b>{this.state.value}</b>
                        </Form.Field>
                        <Form.Field>
                        <Checkbox
                            toggle
                            label='Teacher'
                            onChange={this.toggleForm}
                        />
                       
                        </Form.Field>
                         <Form.Input fluid name="username" icon="user" iconPosition="left"
                         placeholder="Username" onChange={this.handleChange} type="text" value={username} />

                         <Form.Input fluid name="email" icon="mail" iconPosition="left"
                         placeholder="Email Address" value={email} className={this.handleInputError(errors,'email')} onChange={this.handleChange} type="email" />

                         <Form.Input fluid name="password" icon="lock" iconPosition="left"
                         placeholder="Password" onChange={this.handleChange} className={this.handleInputError(errors,'password')} type="password" value={password} />

                         <Form.Input fluid 
                            name="passwordConfirmation" 
                            icon="lock" iconPosition="left"
                            placeholder="Password Confirmation" 
                            onChange={this.handleChange} 
                            className={this.handleInputError(errors,'passwordConfirmation')} 
                            type="password" value={passwordConfirmation} 
                         />
                          {this.state.showteacherForm && 
                          <>
             
                            <Form.Input fluid name="text" icon="globe" iconPosition="left"
                              placeholder="Teaching Field" value={teachingField} 
                              className={this.handleInputError(errors,'teachingField')} 
                            onChange={this.handleChange} type="text" />

                            <Dropdown placeholder='Skills' 
                            fluid multiple selection 
                            options={skillsOptions} />
                                <br/>
                            <Dropdown 
                            placeholder='"Experience in Teaching"' 
                            fluid multiple selection
                              value = {experience}
                              className={this.handleInputError(errors,'teachingField')} 
                            options={experienceOptions} />
                                <br/>
                            </>
                            }
                        <Button
                            disabled={loading}
                            className={loading ? 'loading' : ''}
                            color="orange" 
                            fluid size="large">Submit
                        </Button>
                     </Segment>
                 </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    ) }

                 <Message>Already a user? <Link to='/login' >Login</Link> </Message>
             </Grid.Column>
            </Grid>
        )
    }
}
