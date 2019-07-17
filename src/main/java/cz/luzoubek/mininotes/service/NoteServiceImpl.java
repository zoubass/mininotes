package cz.luzoubek.mininotes.service;

import cz.luzoubek.mininotes.model.Note;
import cz.luzoubek.mininotes.repository.NoteRepository;
import java.util.List;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

@Service
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;

    private ElasticsearchTemplate template;
    
    private static final String AUTHOR_FIELD = "author";
    private static final String TEXT_FIELD = "text";

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, ElasticsearchTemplate elasticsearchTemplate) {
        this.noteRepository = noteRepository;
        this.template = elasticsearchTemplate;
    }

    @Override
    public List<Note> findByAuthorAndTextMatch(String author, String textMatch) {
        QueryBuilder query = QueryBuilders.boolQuery()
                .should(QueryBuilders.queryStringQuery(author)
                        .lenient(true)
                        .field(AUTHOR_FIELD)
                        .field(TEXT_FIELD))
                .should(QueryBuilders.queryStringQuery("*" + author + "*")
                        .lenient(true)
                        .field(AUTHOR_FIELD)
                        .field(TEXT_FIELD));
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder().withQuery(query).build();

        return template.queryForList(searchQuery, Note.class);
    }

    @Override
    public Note save(Note note) {
        return noteRepository.save(note);
    }

    @Override
    public boolean delete(Note note) {
        noteRepository.delete(note);
        return true;
    }
}
