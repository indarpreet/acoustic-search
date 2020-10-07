package com.engine.search.repository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.engine.search.models.UserDetails;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface UserMongoRepository extends MongoRepository<UserDetails, Integer>  {


    

    // @Query(value = "SELECT ud FROM movies ud WHERE LOWER(ud.name) LIKE %?1% OR LOWER(ud.url) LIKE %?1% OR LOWER(ud.company) LIKE %?1%")
    // public List<UserDetails> findByFirstNameRegexAndAddressRegexAndCompanyRegex(String term, PageRequest pageRequest);

    // @Query(value = "SELECT ud FROM movies ud WHERE LOWER(ud.name) LIKE %?1% OR LOWER(ud.url) LIKE %?1% OR LOWER(ud.company) LIKE %?1% order by ud.id desc")
    // public List<UserDetails> getDropDownResults(String term);

    // @Query(value = "SELECT COUNT(*) FROM UserDetails ud WHERE LOWER(ud.name) LIKE %?1% OR LOWER(ud.url) LIKE %?1% OR LOWER(ud.company) LIKE %?1%")
    // public int getTotalCount(String term);
    
}
