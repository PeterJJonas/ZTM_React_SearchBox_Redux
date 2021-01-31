import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import Scroll from '../components/Scroll.js';
import StayPut from '../components/StayPut';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestMonsters } from "../actions"

const mapStateToProps = (state) => {
  return {
    searchField: state.searchMonsters.searchField,
    monsters: state.requestMonsters.monsters,
    isPending: state.requestMonsters.isPending,
    error: state.requestMonsters.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestMonsters: () => dispatch(requestMonsters())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestMonsters();
}

render() {
  const { searchField, onSearchChange, monsters, isPending } = this.props;
  const filteredMonsters = monsters.filter(monster => {
    const searchIn = (monster.name.toLowerCase() + monster.username.toLowerCase());
    return searchIn.toLowerCase().includes(searchField.toLowerCase());
  })
  return isPending ?
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
