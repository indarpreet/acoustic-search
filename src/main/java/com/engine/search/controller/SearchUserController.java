package com.engine.search.controller;

import java.util.List;

import com.engine.search.entity.UserDetails;
import com.engine.search.models.SearchTerm;
import com.engine.search.service.SearchUserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchUserController {

    @Autowired
    SearchUserService searchUserService;

    Logger logger = LoggerFactory.getLogger(SearchUserController.class);

    /**
     * This method is called for each key stroke of search engine
     * @param searchTerm
     * @return {@link List} of {@link UserDetails}
     */
    @PostMapping(value = "/search")
    @CrossOrigin
    public ResponseEntity<List<UserDetails>> getDropDownResults(@RequestBody SearchTerm searchTerm){
        try{
            logger.info("Inside search controller method");
            return  new ResponseEntity<List<UserDetails>>(searchUserService.getDropDownResults(searchTerm), HttpStatus.OK );
        }catch(Exception e){
            e.printStackTrace();
            return  new ResponseEntity<List<UserDetails>>(HttpStatus.INTERNAL_SERVER_ERROR );
        }
        
    }


    /**
     * The method is to get all the employees/user for selected criteria in search engine
     * @param searchTerm
     * @return {@link List} of {@link UserDetails}
     */
    @PostMapping(value = "/user-details")
    @CrossOrigin
    public ResponseEntity<List<UserDetails>> getUserDetails(@RequestBody SearchTerm searchTerm){
        try{
            logger.info("Inside user details controller method");
            return  new ResponseEntity<List<UserDetails>>(searchUserService.getUserDetails(searchTerm), HttpStatus.OK );
        }catch(Exception e){
            e.printStackTrace();
            return  new ResponseEntity<List<UserDetails>>(HttpStatus.INTERNAL_SERVER_ERROR );
        }
        
    }

    /**
     * Get total count of search results
     * @param searchTerm
     * @return int
     */
    @PostMapping(value="/total-count")
    @CrossOrigin
    public ResponseEntity<Integer> getTotalCount(@RequestBody SearchTerm searchTerm){
        try{    
            logger.info("Inside total count controller method");
            return  new ResponseEntity<Integer>(searchUserService.getTotalCount(searchTerm.getTerm()) , HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return  new ResponseEntity<Integer>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
