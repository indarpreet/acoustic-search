package com.engine.search.controller;

import java.util.List;

import com.engine.search.entity.Movie;
import com.engine.search.service.MovieService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieController {

    @Autowired
    MovieService movieService;

    Logger logger = LoggerFactory.getLogger(SearchUserController.class);

    /**
     * The method is to get all the movies
     *
     * @return {@link List} of {@link Movie}
     */
    @GetMapping(value = "/movies")
    @CrossOrigin
    public ResponseEntity<List<Movie>> getMovies() {
        try{
            logger.info("Inside user details controller method");
            return  new ResponseEntity<List<Movie>>(movieService.getMovies(), HttpStatus.OK );
        }catch(Exception e){
            e.printStackTrace();
            return  new ResponseEntity<List<Movie>>(HttpStatus.INTERNAL_SERVER_ERROR );
        }
        
    }
    
}
