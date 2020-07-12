import React, { Component } from 'react';
import {Grid, Form, Segment,Button,Header,Message,Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import {connect} from 'react-redux';
import {setUser} from '../../actions'


 class Login extends Component {
    state = {
        email:'',
        password:'',
        passwordConfirmation:'',
        errors:[],
        loading:false 
    }

    handleChange = (event)=> {
        this.setState({[event.target.name]:event.target.value})
    }

    displayErrors = errors => errors.map((error,i) =><p key={i} >{error.message} </p> )

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.isFormValid(this.state)){
            this.setState({error:[], loading:true })
            //changing
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email , this.state.password)
            .then(signedInUser => {
                this.props.setUser(signedInUser)
                console.log(signedInUser);
                console.log("Login -> handleSubmit -> signedInUser", signedInUser.user.uid)
                
                firebase.database().ref(`users/${signedInUser.user.uid}`).once('value',  (snapshot) => {
                    const value = snapshot.val()
                    console.log("Login -> handleSubmit -> value", value)
                    if(value.roles.includes('student')){
                        this.props.history.push('/userDashboard');
                    }else{
                        this.props.history.push('/teacherDashboard');
                    }
                    
                })
            })
            .catch(err =>{
                console.error(err)
                this.setState({
                    errors:this.state.errors.concat(err) ,
                    loading: false

                })
            })
        
      }
    }

    // changing 
    isFormValid = ({email , password}) => email && password

    handleInputError = ( errors , inputName ) =>{
       return errors.some(error => 
            error.message.toLowerCase().includes(inputName)) 
            ? "error"
            : ""
    };

    render() {
        console.log(this.props)
        const {email , password , errors , loading} = this.state ;
        return (
            <Grid style={{transform:'translateY(50%)'}} textAlign="center" verticalAlign="middle" className="app" >
             <Grid.Column style={{maxWidth:450}}  >
                 <Header as="h2" icon color="violet">
                     <Icon name="code branch" color="violet"/>
                     Login for MKM
                 </Header>
                 <Form size='large' onSubmit={this.handleSubmit} >
                     <Segment stacked >
                         <Form.Input fluid name="email" icon="mail" iconPosition="left"
                         placeholder="Email Address" 
                         value={email} 
                         className={this.handleInputError(errors,'email')} 
                         onChange={this.handleChange} type="email" />

                         <Form.Input fluid name="password" icon="lock" iconPosition="left"
                         placeholder="Password" 
                         onChange={this.handleChange} 
                         className={this.handleInputError(errors,'password')} 
                         type="password" value={password} />

                         <Button
                         disabled={loading}
                         className={loading ? 'loading' : ''}
                          color="violet" 
                          fluid size="large">Submit</Button>
                     </Segment>
                 </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    ) }

                 <Message>Don't have an account? <Link to='/register' >Register</Link> </Message>
             </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state =>({
    
    user: state.user.currentUser
  })
  
  export default connect(mapStateToProps,
    {setUser}
    )(Login)
