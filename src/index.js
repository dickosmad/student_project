import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch,Route,withRouter } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'semantic-ui-css/semantic.min.css'
import "./index.css";
import App from "./App";
import firebase from './firebase';
import Login from '../src/components/Auth/Login';
import Register from '../src/components/Auth/Register';
import FindTeacher from "./components/findTeacher/FindTeacher";



class Root extends React.Component {

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{

            if(user){
                console.log(user);
                
                this.props.history.push('/');
                
            }
        })
    }
    render(){ 
        return(
    
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/findTeacher" component={FindTeacher} />
        </Switch>
    )
    }
}

const RootWithAuth = withRouter(Root)



ReactDOM.render( 
<Router>
    <RootWithAuth />
</Router> , document.getElementById('root'));
