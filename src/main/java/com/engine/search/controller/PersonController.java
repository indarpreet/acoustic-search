package com.engine.search.controller;

import java.util.List;
import java.util.Map;

import com.engine.search.service.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    @Autowired
    PersonService personService;

    @GetMapping(value = "/persons")
    @CrossOrigin
    public ResponseEntity<List<Map>> getPersons() {
        try {
            return new ResponseEntity<List<Map>>(personService.getPersonGroupByGender(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<List<Map>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
