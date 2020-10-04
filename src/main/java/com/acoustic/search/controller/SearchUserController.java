package com.acoustic.search.controller;

import java.util.List;

import com.acoustic.search.models.SearchTerm;
import com.acoustic.search.models.UserDetails;
import com.acoustic.search.service.SearchUserService;

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
    public ResponseEntity<List<UserDetails>> getUserDetails(@RequestBody SearchTerm searchTerm){
        try{
            return  new ResponseEntity<List<UserDetails>>(searchUserService.getUserDetails(searchTerm), HttpStatus.OK );
        }catch(Exception e){
            return  new ResponseEntity<List<UserDetails>>(HttpStatus.INTERNAL_SERVER_ERROR );
        }
        
    }
}
