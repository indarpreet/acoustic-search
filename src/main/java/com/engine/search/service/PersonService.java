package com.engine.search.service;

import java.util.List;
import java.util.Map;

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
public class PersonService {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Map> getPersonGroupByGender() {
        MatchOperation matchOperation = Aggregation.match(Criteria.where("dob.age").gt(50));
        GroupOperation groupOperation = Aggregation.group("$gender").count().as("totalPersonsPerGender").avg("$dob.age")
                .as("avg");
        SortOperation sortOperation = Aggregation.sort(Direction.DESC, "totalPersonsPerGender");
        Aggregation aggregation = Aggregation.newAggregation(matchOperation, groupOperation, sortOperation);
        AggregationResults<Map> response = mongoTemplate.aggregate(aggregation, "persons", Map.class);
        System.out.println(response.getMappedResults());
        return response.getMappedResults();
    }
}
