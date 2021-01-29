import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import Scroll from '../components/Scroll.js';
import StayPut from '../components/StayPut';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from "../actions"

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: []
    }
  }

componentDidMount() {
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {this.setState({ monsters: users})});
}

render() {
  const { monsters } = this.state;
  const { searchField, onSearchChange } = this.props;
  const filteredMonsters = monsters.filter(monster => {
    const searchIn = (monster.name.toLowerCase() + monster.username.toLowerCase());
    return searchIn.toLowerCase().includes(searchField.toLowerCase());
  })
  return !monsters.length ?
    <h1 className='tc f1'>Loading</h1> :
    (
      <div className='tc'>
        <StayPut>
          <h1 className='f1'>Monsterfriends</h1>
          <SearchBox searchChange={onSearchChange}/>
        </StayPut>
        <ErrorBoundry>
          <CardList monsters={filteredMonsters}/>
        </ErrorBoundry>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
