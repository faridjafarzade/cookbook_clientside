import React, { Component } from 'react';
import { connect } from 'react-redux'


import Recipe from '../../components/recipe'
import * as recipeAction from '../../actions/recipeAction';
import fetch from 'cross-fetch';

import '../../assets/css/semantic.css';
import {  Button , Card } from 'semantic-ui-react'


class Home extends Component {

  constructor(props){
    super(props);
    this.getRecipes = this.getRecipes.bind(this,this.sate);


     this.state = {
      loading: 0
    }

    if(this.props.currentState.pageNumber === 1)
    this.getRecipes()
  }


getLoading(){
    if(this.props.currentState.pageNumber > 1 && this.state.loading === 0) return <Button fluid onClick={this.getRecipes}>More</Button>
    else return <Button loading fluid/>
}


getRecipes () {
    var clone = this;

    if(this.state.loading === 0){
     clone.setState({loading:1});

     fetch('http://www.maskeddream.com/cookbook/apis/recipe_api.php?action=get_page&page='+this.props.currentState.pageNumber).then(function(data) {

     data = JSON.parse(data._bodyInit);

     var recipes = data.page.items;
     var pageNumber = data.page.currentPage;

                for(var i=0;i<recipes.length;i++){

                    var item = recipes[i];

                    var recipe = {

                          title:item.title,
                          description: item.description,
                          id:item.id,
                          negativeRateCount: item.negativeRateCount,
                          positiveRateCount: item.positiveRateCount,
                          userRate: item.userRate,
                          date: item.date
                     }
                    

                  //load new or updated recipe to store
                  clone.props.loadRecipe(recipe);
                  //and change pageNumber in store
                  clone.props.changePage(pageNumber);
                }


     clone.setState({loading:0});
     clone.forceUpdate()

}).catch(function(err) {

     clone.setState({loading:0});
});
    }

}


 render() {

    var clone = this;


    return(
      <div>
       { <Card.Group>
             {this.props.currentState.recipes.map(function(recipe){
                  return <Recipe key= {recipe.id} object={recipe}  deleteRecipe={clone.props.deleteRecipe}/>;
                          })
              }
          </Card.Group>
        }
          {clone.getLoading()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentState: state.currentState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipe: recipe => dispatch(recipeAction.loadRecipe(recipe)),
    changePage: pageNumber => dispatch(recipeAction.changePage(pageNumber))
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
