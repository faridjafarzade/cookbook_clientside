import React, { Component } from 'react';
        import {Link } from 'react-router-dom'

        import RatePanel from '../ratePanel'

        import '../../assets/css/semantic.css';
        import {  Icon, Card ,Container } from 'semantic-ui-react'

        class Recipe extends Component {

        constructor(props){
            super(props);
            this.state={  }
        }

        deleteRecipe(e, id){
                e.preventDefault();
                this.props.deleteRecipe(id);
        }


        render() {

        return(
              <Card >
                  <Card.Content >
                      <Card.Header >
                          {this.props.object.title}
                      </Card.Header>
                      <Card.Description >
                          {this.props.object.description}
                      </Card.Description>
                  </Card.Content>
                  <Card.Content extra >
                      <RatePanel object={this.props.object} />
                      <Container textAlign='center'>
                          <Link to={{
                                pathname: '/recipepage',
                                state: { object: this.props.object,title: this.props.object.title, id:this.props.object.id, description:this.props.object.description}
                                }} >
                                <Icon name='arrow circle right' / > Read
                          </Link>
                      </Container>
                   </Card.Content>
               </Card>
           )
        }
        }

export default Recipe
