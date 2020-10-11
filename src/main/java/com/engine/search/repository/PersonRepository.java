package com.engine.search.repository;

import com.engine.search.entity.Person;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonRepository extends MongoRepository<Person, String> {

}
