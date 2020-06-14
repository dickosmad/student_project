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
import {createStore} from 'redux';
import { Provider, connect } from 'react-redux' ; 
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'
import { setUser ,clearUser } from './actions';
import Login from '../src/components/Auth/Login';
import Register from '../src/components/Auth/Register';
import FindTeacher from "./components/findTeacher/FindTeacher";
import userDashboard from "./components/userDashboard/userDashboard";



const store = createStore(rootReducer ,composeWithDevTools() );

class Root extends React.Component {
// if the user 
// create two collections (students ,teacher )
// every when i
    // componentDidMount(){
    //     firebase.auth().onAuthStateChanged(user =>{
    //         console.log('St')
    //         if(user){
    //             console.log(user);
    //             this.props.setUser(user)
    //             // this.props.history.push('/userDashboard');
                
    //         }else {
    //             this.props.clearUser()
    //             this.props.history.push('/');
    //         }
    //     })
    // }
    render(){ 
        return(
    
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/findTeacher" component={FindTeacher} />
            <Route path="/userDashboard" component={userDashboard} />
        </Switch>
    )
    }
}



const RootWithAuth = withRouter(
    connect(
       null, 
        {setUser , clearUser }
        )(Root)
 );



ReactDOM.render( 
    <Provider store={store} >
        <Router>
            <RootWithAuth />
        </Router> 
    </Provider>, document.getElementById('root'));
