package cz.luzoubek.mininotes.controller;

import cz.luzoubek.mininotes.model.Note;
import cz.luzoubek.mininotes.service.NoteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    @Autowired
    private NoteService noteService;

    @GetMapping("/notes/{author}/{textMatch}")
    public List<Note> retrieveNotesByAuthor(@PathVariable(required = false) String author, @PathVariable(required = false) String textMatch) {
        return noteService.findByAuthorAndTextMatch(author, textMatch);
    }

    @PostMapping("/add_note")
    public Note addNote(@RequestBody Note note) {
        return noteService.save(note);
    }
    
    @PutMapping("update_note")
    public Note updateNote(@RequestBody Note note) {
        return noteService.save(note);
    }
    
    @DeleteMapping("delete_note")
    public boolean deleteNote(@RequestBody Note note){
        return noteService.delete(note);
    }

}
