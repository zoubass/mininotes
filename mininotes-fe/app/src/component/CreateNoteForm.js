import React, {Component} from "react";
import Input from "./Input";
import Button from "./Button";
import TextArea from "./TextArea";

export class CreateNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note:
          {
            author: "",
            text: ""
          },
      message: ""
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.state.isBeforeChange = false;
    let value = e.target.value;
    this.setState(
        prevState => ({
          note: {
            ...prevState.note,
            author: value
          }
        }),
        () => console.log(this.state.note)
    );
  }

  handleTextArea(e) {
    let value = e.target.value;
    this.setState(
        prevState => ({
          note: {
            ...prevState.note,
            text: value
          }
        })
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();

    fetch("/api/add_note", {
      method: "POST",
      body: JSON.stringify(this.state.note),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    
    this.setState({
      note: {
        author: "",
        text: ""
      },
      message: "Note saved"
    })
  }

  render() {

    return (
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
          <Input
              inputtype={"text"}
              name={"author"}
              title={"Author name"}
              value={this.state.note.author}
              placeholder={"Enter your name"}
              style={inputStyle}
              handleChange={this.handleInput}
          />
          <TextArea
              name={"note_text"}
              title={"Note's text"}
              rows={5}
              cols={10}
              value={this.state.note.text}
              placeholder={"Enter text of the note."}
              handleChange={this.handleTextArea}
          />
          <Button
              action={this.handleFormSubmit}
              type={"primary"}
              title={"Save note"}
              style={buttonStyle}
          />{" "}
          <div className="message">{this.state.message}</div>
        </form>
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