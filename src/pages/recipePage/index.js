import React, { Component } from 'react';
import {Link } from 'react-router-dom'


import RatePanel from '../../components/ratePanel'
import '../../assets/css/semantic.css';
import {  Icon, Container , Header } from 'semantic-ui-react'


class Recipe extends Component {

  constructor(props){
    super(props);

    this.state = {
      title: this.props.location.state.title,
      description: this.props.location.state.description,
      id: this.props.location.state.id,
      object: this.props.location.state.object
    }

  }

render() {

    return(
     <Container text>
        <Header as='h2'>{this.state.title}</Header>
        <p>{this.state.description}</p>

        <Container textAlign='left'>
        <Link to={{
            pathname: '/add',
            state: { title: this.state.title ,id:this.state.id,description:this.state.description}
          }} >
              <Icon name='edit' />
        </Link>
        </Container>

        <Container textAlign='right'>
           <RatePanel object={this.state.object} />
        </Container>
      </Container>
   )
  }
}

export default Recipe
