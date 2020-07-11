import  * as actionTypes from '../actions/types';
import { combineReducers } from 'redux';

const initiaUserState = {
    currentUser:null ,
    students:true ,
    teacher: false
};

const user_reducer = (state = initiaUserState , action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            console.log(action)
            return {
                currentUser: action.payload.currentUser
            } 
        case actionTypes.CLEAR_USER:
                return {
                    ...state,
                }
            default:
                return state;
    }
}
const rootReducer = combineReducers({
    user:user_reducer
});

export default rootReducer;