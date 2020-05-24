import React, { Component } from 'react';
import {Grid, Form, Segment,Button,Header,Message,Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';


export default class Register extends Component {
    state = {
        email:'',
        username:'',
        password:'',
        passwordConfirmation:'',
        errors:[],
        loading:false , 
        usersRef: firebase.database().ref('users')
    }

    handleChange = (event)=> {
        this.setState({[event.target.name]:event.target.value})
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
    displayErrors = errors => errors.map((error,i) =><p key={i} >{error.message} </p> )

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.isFormValid()){
            this.setState({error:[], loading:true })
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(createdUser =>{
            console.log(createdUser);
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
                })
            })
            .catch(err => {
                console.error(err);
                this.setState({ errors: this.state.errors.concat(err) , loading:false })
            })
        })
        .catch(err =>{
            console.error(err)
            this.setState({errors:this.state.errors.concat(err), loading:false  })
        })
      }
    }
    saveUser = (createdUser) =>{
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName ,
            avatar: createdUser.user.photoURL
        })
    }

    handleInputError = ( errors , inputName ) =>{
       return errors.some(error => 
            error.message.toLowerCase().includes(inputName)) 
            ? "error"
            : ""
    }

    render() {
        const {email , username , passwordConfirmation , password , errors , loading} = this.state ;
        return (
            <Grid textAlign="center" verticalAlign="middle" style={{transform:'translateY(50%)'}} >
             <Grid.Column style={{maxWidth:450}}  >
                 <Header as="h2" icon color="orange">
                     <Icon name="puzzle piece" color="orange"/>
                     Register for MKM
                 </Header>
                 <Form size='large' onSubmit={this.handleSubmit} >
                     <Segment stacked >
                         <Form.Input fluid name="username" icon="user" iconPosition="left"
                         placeholder="Username" onChange={this.handleChange} type="text" value={username} />

                         <Form.Input fluid name="email" icon="mail" iconPosition="left"
                         placeholder="Email Address" value={email} className={this.handleInputError(errors,'email')} onChange={this.handleChange} type="email" />

                         <Form.Input fluid name="password" icon="lock" iconPosition="left"
                         placeholder="Password" onChange={this.handleChange} className={this.handleInputError(errors,'password')} type="password" value={password} />

                         <Form.Input fluid name="passwordConfirmation" icon="lock" iconPosition="left"
                         placeholder="Password Confirmation" onChange={this.handleChange} className={this.handleInputError(errors,'passwordConfirmation')} type="password" value={passwordConfirmation} />
                         <Button
                         disabled={loading}
                         className={loading ? 'loading' : ''}
                          color="orange" 
                          fluid size="large">Submit</Button>
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
