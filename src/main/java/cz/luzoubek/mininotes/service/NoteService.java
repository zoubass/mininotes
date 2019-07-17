package cz.luzoubek.mininotes.service;

import cz.luzoubek.mininotes.model.Note;
import java.util.List;

public interface NoteService {

    /**
     * Searches for the notes with given string match for author and for the note's text 
     * @param author - author's string to match
     * @param textMatch - note's text match
     * @return list of notes matching given input
     */
    List<Note> findByAuthorAndTextMatch(String author, String textMatch);
    
    Note save(Note note);

    boolean delete(Note note);
}
