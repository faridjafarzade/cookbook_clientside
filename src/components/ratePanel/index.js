import React, { Component } from 'react';
        import { connect } from 'react-redux'

        import * as recipeAction from '../../actions/recipeAction';
        import '../../assets/css/semantic.css';
        import {  Button ,Container} from 'semantic-ui-react'
        import fetch from 'cross-fetch';

        class RatePanel extends Component {

        constructor(props){

            super(props);

            this.rate=this.rate.bind(this);
            this.like=this.like.bind(this);
            this.unlike=this.unlike.bind(this);
            this.antiLike=this.antiLike.bind(this);
            this.antiUnlike=this.antiUnlike.bind(this);

            this.state={
              userRate:this.props.object.userRate || 0,
              oldUserRate:this.props.object.userRate || 0,
              negativeRateCount:this.props.object.negativeRateCount || 0,
              positiveRateCount:this.props.object.positiveRateCount || 0,
              object:this.props.object,
              buttonNumber:0,
              positive:0
           }

        }

        like(){

          //console.log('like')
          let nr = this.state.object.userRate;

          this.setState({
            userRate:2,
            buttonNumber:1,
            oldUserRate:nr,
            positive:1
         }, () => {
          this.rate()
      })
        }

        unlike(){

          //console.log('unlike')
          let nr = this.state.object.userRate;

          this.setState({
            userRate:1,
            buttonNumber:2,
            positive:0,
            oldUserRate:nr
         }, () => {
          this.rate()
      })
        }

        antiLike(){

          //console.log('antilike')
          let nr = this.state.object.userRate;

          this.setState({
            userRate:0,
            buttonNumber:3,
            oldUserRate:nr
         }, () => {
          this.rate()
      })
        }

        antiUnlike(){
 //console.log('antiUnlike')
          let nr = this.state.object.userRate;

          this.setState({
            userRate:0,
            buttonNumber:4,
            oldUserRate:nr
         }, () => {
          this.rate()
      })
        }

        rate(){

          var clone =this;
          console.log('user rateeeee====='+clone.state.userRate)
          console.log('user rateeeee number ====='+clone.state.buttonNumber)
                var url = ''
                if(clone.state.buttonNumber>2)
                  url = 'http://www.maskeddream.com/cookbook/apis/recipe_api.php?action=remove_rate&recipe_id=' + clone.props.object.id;
                else
                  url = 'http://www.maskeddream.com/cookbook/apis/recipe_api.php?action=save_rate&recipe_id=' + clone.props.object.id + '&positive=' + clone.state.positive + '&rate_id=' + clone.state.oldUserRate;

                fetch(url).then(function(data) {
                        data=JSON.parse(data._bodyInit);

                if (data.http_status_codes === 201){

                     let nr = clone.state.userRate
                     let or = clone.state.oldUserRate

                     let nc = 0;
                     let pc = 0;

                      if(or === 0 && nr === 1){
                             nc = ++clone.state.object.negativeRateCount;
                             pc = clone.state.object.positiveRateCount;
                       }
                       else if(or === 0 && nr === 2){
                             nc = clone.state.object.negativeRateCount;
                             pc = ++clone.state.object.positiveRateCount;
                           }
                       else if(or === 1 && nr === 2){
                                nc = --clone.state.object.negativeRateCount;
                                pc = ++clone.state.object.positiveRateCount;
                       }
                       else if(or === 1 && nr === 0){
                           nc = --clone.state.object.negativeRateCount;
                           pc = clone.state.object.positiveRateCount;
                        }
                        else if(or === 2 && nr === 1){
                                 nc = ++clone.state.object.negativeRateCount;
                                 pc = --clone.state.object.positiveRateCount;
                        }
                        else if(or === 2 && nr === 0){
                            nc = clone.state.object.negativeRateCount;
                            pc = --clone.state.object.positiveRateCount;
                         }

                        let obj = clone.state.object

                        obj.userRate = clone.state.userRate;
                        obj.negativeRateCount=nc;
                        obj.positiveRateCount=pc;

                        clone.props.createRecipe(obj);

                         clone.setState({
                           oldUserRate:nr,
                           negativeRateCount:nc,
                           positiveRateCount:pc
                         })

                   }
                   else {

                     let or = clone.state.oldUserRate
                     clone.setState({
                       userRate:or
                     })

                   }
                  }).catch(function(err) {


                  });


        }

        generatePanel(){
            if(this.state.object.userRate===2)
               return   <Container textAlign='center'><Button
                            onClick={this.antiUnlike}
                            color='red'
                             size='mini'
                            content=''
                            icon='thumbs up'
                            label={{ basic: true, color: 'red', pointing: 'left', content: this.state.object.positiveRateCount }}
                          />

                          <Button
                            onClick={this.unlike}
                            size='mini'
                            content=''
                            icon='thumbs down'
                            label={{ as: 'a', basic: true,  pointing: 'left', content: this.state.object.negativeRateCount }}
                          />
                          </Container>

             else if(this.state.object.userRate===1)
               return   <Container textAlign='center'><Button
                            onClick={this.like}
                            content=''
                            icon='thumbs up'
                             size='mini'
                            label={{ basic: true, pointing: 'left', content: this.state.object.positiveRateCount }}
                          />

                          <Button
                            onClick={this.antiUnlike}
                            size='mini'
                            color='red'
                            content=''
                            icon='thumbs down'
                            label={{ as: 'a', basic: true, color: 'red', pointing: 'left', content: this.state.object.negativeRateCount }}
                          />
                          </Container>

            else
            return   <Container textAlign='center'>
                     <Button
                         onClick={this.like}
                         size='mini'

                         content=''
                         icon='thumbs up'
                         label={{ basic: true, color: 'grey', pointing: 'left', content: this.state.object.positiveRateCount }}
                       />

                       <Button
                       onClick={this.unlike}
                        size='mini'

                         content=''
                         icon='thumbs down'
                         label={{ as: 'a', basic: true, color: 'grey', pointing: 'left', content: this.state.object.negativeRateCount }}
                       /></Container>

       }


        render() {
            let clone = this;
            return(
                  <div>
                      {clone.generatePanel()}
                  </div>
               )
            }
        }

const mapStateToProps=(state, ownProps) => {
  return {

  }
};

const mapDispatchToProps=(dispatch) => {
  return {
    createRecipe: recipe => dispatch(recipeAction.createRecipe(recipe))
  }
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(RatePanel)
