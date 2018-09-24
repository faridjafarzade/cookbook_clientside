import * as actionTypes from '../actions/actionTypes';


var recipe_id = 0;

const initialState = {
  pageNumber: 1,
  recipes: []
}

export default (state = initialState, action) => {
    switch (action.type){
      case actionTypes.SAVE_RECIPE:
          if(action.recipe.id===0){
              recipe_id++;
          action.recipe.id = recipe_id;
          state.recipes[recipe_id] = action.recipe
      }
      else {state.recipes[action.recipe.id] = action.recipe}
      return state;

      case actionTypes.CHANGE_PAGE:
           state.pageNumber  = ++ action.pageNumber;
      return state;

      case actionTypes.LOAD_RECIPE:
         state.recipes[action.recipe.id] = action.recipe

      return state;

      case actionTypes.DELETE_RECIPE:
      return state.recipes.filter((data, i) => i !== action.id);
      default:
            return state;
    }
  };
