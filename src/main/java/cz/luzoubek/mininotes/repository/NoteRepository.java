package cz.luzoubek.mininotes.repository;

import cz.luzoubek.mininotes.model.Note;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface NoteRepository extends ElasticsearchRepository<Note, String> {
    
}
