import * as actionTypes from './actionTypes';

export const createRecipe = (recipe) => {
    return {
      type: actionTypes.SAVE_RECIPE,
      recipe: recipe
    }
  };

 export const changePage = (pageNumber) => {
    return {
      type: actionTypes.CHANGE_PAGE,
      pageNumber:pageNumber
    }
  };

 export const loadRecipe = (recipe) => {
    return {
      type: actionTypes.LOAD_RECIPE,
      recipe: recipe
    }
  };

export const deleteRecipe = (id) => {
    return {
        type: actionTypes.DELETE_RECIPE,
        id: id
    }
}
