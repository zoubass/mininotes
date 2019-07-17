import React, {Component} from "react";
import Button from "./Button";
import TextArea from "./TextArea";

export class SearchResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      note: {
        id: "",
        author: "",
        text: "",
        isEditing: false
      }
    };
    this.handleDeletion = this.handleDeletion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleDeletion(note) {
    console.log(note);
    fetch("/api/delete_note", {
      method: "DELETE",
      body: JSON.stringify(note),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    let index = this.props.notes.indexOf(note)

    if (index > -1) {
      this.props.notes.splice(index, 1);
    }
    this.forceUpdate()
  }

  async handleUpdate(note) {
    note.isEditing = true;
    this.forceUpdate()
  }
  
  async handleSave(note){
    fetch("/api/add_note", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then();
    note.isEditing=false;
    this.forceUpdate()
  }
  
  handleChange(note, e) {
    note.text = e.target.value;
    this.forceUpdate()
  }

  render() {

      if (this.props.isWaiting) {
      return (
          <div>
            Loading data...
          </div>
      );
    }

    return (
        <div className="results">
          {this.props.notes.map(note =>
              <div className="note" key={note.author}>
                <div> {note.author} wrote:</div>
                <div>
                  {note.isEditing ?
                      (<div className="noteText">
                          <TextArea
                              name={"note_text"}
                              rows={5}
                              cols={10}
                              value={note.text}
                              placeholder={"Enter text of the note."}
                              handleChange={(e) => this.handleChange(note, e)}
                          />
                      </div>) :
                      (<div className="noteText">{note.text}</div>)
                  }

                  {note.isEditing ?
                      (<Button
                          action={() => this.handleSave(note)}
                          title={"Save"}
                      />) :
                      (<Button
                          action={() => this.handleUpdate(note)}
                          title={"Edit"}
                      />)
                  }
                  <Button
                      action={() => this.handleDeletion(note)}
                      title={"Delete"}
                  />{""}
                </div>
              </div>
          )}
        </div>
    );
  }
}