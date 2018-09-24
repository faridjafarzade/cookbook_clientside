import { combineReducers } from 'redux';
import currentState from './recipeReducer';

export default combineReducers({
    currentState: currentState
});
