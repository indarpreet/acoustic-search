package com.acoustic.search.controller;

import java.util.List;

import com.acoustic.search.models.SearchTerm;
import com.acoustic.search.models.UserDetails;
import com.acoustic.search.service.SearchUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    public int getTotalCount(@RequestBody SearchTerm searchTerm){
        System.out.println(searchTerm.getTerm());
        return searchUserService.getTotalCount(searchTerm.getTerm());
    }

    @PostMapping(value = "/search")
    @CrossOrigin
    public List<UserDetails> getUserDetails(@RequestBody SearchTerm searchTerm){
        return searchUserService.getUserDetails(searchTerm);
    }
}
