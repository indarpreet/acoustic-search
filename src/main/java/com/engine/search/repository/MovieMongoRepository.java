package com.engine.search.repository;

import com.engine.search.entity.Movie;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieMongoRepository extends MongoRepository<Movie, Integer>  {


    

    // @Query(value = "SELECT ud FROM movies ud WHERE LOWER(ud.name) LIKE %?1% OR LOWER(ud.url) LIKE %?1% OR LOWER(ud.company) LIKE %?1%")
    // public List<UserDetails> findByFirstNameRegexAndAddressRegexAndCompanyRegex(String term, PageRequest pageRequest);

    // @Query(value = "SELECT ud FROM movies ud WHERE LOWER(ud.name) LIKE %?1% OR LOWER(ud.url) LIKE %?1% OR LOWER(ud.company) LIKE %?1% order by ud.id desc")
    // public List<UserDetails> getDropDownResults(String term);

    // @Query(value = "SELECT COUNT(*) FROM UserDetails ud WHERE LOWER(ud.name) LIKE %?1% OR LOWER(ud.url) LIKE %?1% OR LOWER(ud.company) LIKE %?1%")
    // public int getTotalCount(String term);
    
}
