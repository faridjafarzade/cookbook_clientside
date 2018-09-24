import React from 'react';
import { Route, Link } from 'react-router-dom'

import Home from './pages/home'
import Add from './pages/add'
import RecipePage from './pages/recipePage'

import './assets/css/semantic.css';
import { Icon ,Menu,  Button } from 'semantic-ui-react'

const App=() => (
  <div>
  <Menu >

    <Menu.Item >
       <Link to="/" >
         <Button animated='vertical' circular basic >
             <Button.Content hidden> Home </Button.Content>
             <Button.Content visible>
                 <Icon name='home' / >
         </Button.Content>
        </Button>
       </Link >
    </Menu.Item>

    <Menu.Menu position='right' >

        <Menu.Item  >
            <Link to={{
                  pathname: '/add',
                  state: { title: "", id:0, description:""}
                  }} >
                <Button basic  animated='vertical' circular >

                <Button.Content hidden> Add </Button.Content>
                  <Button.Content visible>
                      <Icon name='add' / >
                  </Button.Content>
                </Button>

           </Link >
    </Menu.Item>

</Menu.Menu>

</Menu>

    <main >
        <Route exact path="/" component={Home} / >
        <Route exact path="/add" component={Add} / >
        <Route exact path="/recipepage" component={RecipePage} / >
    </main>

  </div>
)

export default App
