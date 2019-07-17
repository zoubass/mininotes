package cz.luzoubek.mininotes.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "feedback", type = "notes")
public class Note {

    @Id
    private String id;

    @Field(type = FieldType.Text, store = true)
    private String author;

    @Field(type = FieldType.Text, store = true)
    private String text;
}
