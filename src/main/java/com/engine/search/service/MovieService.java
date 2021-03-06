package com.engine.search.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.engine.search.entity.Movie;
import com.engine.search.repository.MovieMongoRepository;

import org.aspectj.weaver.patterns.TypePattern.MatchKind;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
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

    public List<Movie> getMoviesFromTemplate() {
        return mongoTemplate.findAll(Movie.class);
    }

}
