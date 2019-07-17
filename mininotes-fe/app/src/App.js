import React, {Component} from 'react';
import './App.css';
import {CreateNoteForm} from "./component/CreateNoteForm";
import {SearchBar} from "./component/SearchBar";

class App extends Component {
  state = {
    isLoading: true,
    notes: []
  };

  async componentDidMount() {
    this.setState({isLoading: false});
  }

  render() {
    if (this.state.isLoading) {
      return (
          <div className="App-intro">
            <header className="App-header">
              <h2>Loading..</h2>
            </header>
          </div>
      );
    }
    return (
        <div>
          <div className="App-header">
            <header className="App-header">
              <h1>Welcome to Mini Notes!</h1>
              <span>Some beautiful logo</span>
            </header>
          </div>
          <div className="App-content">
            <h2>Create note</h2>
            <CreateNoteForm/>
          </div>
          <div className="dark">
            <div className="App-content">
              <h2>Search notes</h2>
              <SearchBar/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
