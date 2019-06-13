import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import AddMovie from './Movies/AddMovie';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = (movie) => {
    console.log(this.state.savedList)
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  addMovie = movie => {
    axios.post('http://localhost:5000/api/movies/', movie)
    .then( res => {
      console.log('sucess! message: ' + res); 
    })
    .catch( err => {
      console.error(err);
    });
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route exact path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route exact path='/movie/add' render={props => <AddMovie {...props} addMovie={this.addMovie} />} />
      </div>
    )
  }
}
