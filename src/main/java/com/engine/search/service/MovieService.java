package com.engine.search.service;

import java.util.List;

import com.engine.search.entity.Movie;
import com.engine.search.repository.MovieMongoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    @Autowired
    MovieMongoRepository movieMongoRepository;

    @Autowired
    MongoTemplate mongoTemplate;

	public List<Movie> getMovies() {
        return getMoviesFromTemplate();
    }
    
    public List<Movie> getMoviesFromTemplate(){
       return mongoTemplate.findAll(Movie.class);
    }
    
}
