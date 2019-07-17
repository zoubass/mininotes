import React, {Component} from "react";
import Input from "./Input";
import Button from "./Button";
import {SearchResult} from "./SearchResult";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWaiting: true,
      note: [],
      author: "",
      textMatch: ""
    };
    this.fetchNotes = this.fetchNotes.bind(this);
    this.handleAuthorInput = this.handleAuthorInput.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/api/notes/' + "\"\"/\"\"");

    const bodyJson = await response.json();
    console.log(bodyJson);
    this.setState({notes: bodyJson, isWaiting: false});
  }

  handleAuthorInput(e) {
    this.state.isBeforeChange = false;
    let value = e.target.value;
    this.setState(
        prevState => ({
          author: value
        }),
        () => console.log(this.state.author)
    );
  }

  async fetchNotes(e) {
    console.log("Author")
    console.log(this.state.author)
    const response = await fetch(
        '/api/notes/' + (this.state.author === "" ? "\"\""
            : this.state.author) + '/' + (this.state.textMatch === "" ? "\"\""
            : this.state.textMatch));

    const bodyJson = await response.json();
    console.log(bodyJson);
    this.setState({notes: bodyJson, isWaiting: false});
  }

  render() {
    return (
        <div className="container-fluid">
          <Input
              inputtype={"text"}
              name={"match"}
              value={this.state.author}
              placeholder={"Enter author or part of searched text"}
              style={inputStyle}
              handleChange={this.handleAuthorInput}
          />
          <Button
              action={this.fetchNotes}
              type={"primary"}
              title={"Search"}
              style={buttonStyle}
          />{" "}

          <h2>Results</h2>
          <SearchResult isWaiting={this.state.isWaiting}
                        notes={this.state.notes}/>
        </div>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

const inputStyle = {
  width: "30%",
  margin: "0 auto"
};