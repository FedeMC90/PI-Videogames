import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Componentes
import Home from './components/Home/Home';
import About from './components/About/About'
import Landing from './components/Landing/Landing';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import NavBar from './components/NavBar/NavBar';
import './App.css';

function App() {
	return (
		
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <NavBar />          
      </Switch>      
      <Route exact path='/home' component={Home}/>
      <Route exact path='/videogame/:id' component={VideogameDetail}/>
      <Route exact path='/create' component={CreateVideogame}/>
      <Route exact path='/about' component={About}/>
      
		</div>
    
	)
}

export default App;
