package com.engine.search.entity;

import java.util.List;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "movies")
public class Movie {
    @Id
    private String id;
    
    private String url;
   
    private String name;
   
    private String type;
  
    private String language;

    private List<String> genres;

    public Movie() {
    }

   

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

   

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
   

}
