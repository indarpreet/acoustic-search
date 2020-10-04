package com.acoustic.search.controller;

import java.util.List;

import com.acoustic.search.models.SearchTerm;
import com.acoustic.search.models.UserDetails;
import com.acoustic.search.service.SearchUserService;

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
    
    // @PostMapping(value = "/search")
    // public List<UserDetails> getUserDetails(){
    //     return searchUserService.getUserDetails();
    // }

    @PostMapping(value="/total-count")
    @CrossOrigin
    public ResponseEntity<Integer> getTotalCount(@RequestBody SearchTerm searchTerm){
        try{
            return  new ResponseEntity<Integer>(searchUserService.getTotalCount(searchTerm.getTerm()) , HttpStatus.OK);
        }catch(Exception e){
            return  new ResponseEntity<Integer>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/search")
    @CrossOrigin
    public ResponseEntity<List<UserDetails>> getDropDownResults(@RequestBody SearchTerm searchTerm){
        try{
            return  new ResponseEntity<List<UserDetails>>(searchUserService.getDropDownResults(searchTerm), HttpStatus.OK );
        }catch(Exception e){
            e.printStackTrace();
            return  new ResponseEntity<List<UserDetails>>(HttpStatus.INTERNAL_SERVER_ERROR );
        }
        
    }


    
    @PostMapping(value = "/user-details")
    @CrossOrigin
    public ResponseEntity<List<UserDetails>> getUserDetails(@RequestBody SearchTerm searchTerm){
        try{
            return  new ResponseEntity<List<UserDetails>>(searchUserService.getUserDetails(searchTerm), HttpStatus.OK );
        }catch(Exception e){
            return  new ResponseEntity<List<UserDetails>>(HttpStatus.INTERNAL_SERVER_ERROR );
        }
        
    }
}
