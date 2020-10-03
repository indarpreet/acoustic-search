package com.acoustic.search.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.acoustic.search.models.SearchTerm;
import com.acoustic.search.models.UserDetails;
import com.acoustic.search.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SearchUserService {

    @Autowired
    UserRepository userRepository;

    /**
     * The search query executes for two major columns in employee table 1. first
     * name 2. address Fetching 10 records for each page Sorted by descending order
     * of id
     * 
     * @Id - Higher the id number means higher order of preference in search
     * 
     */
    public List<UserDetails> getUserDetails(SearchTerm searchTerm) {
        List<UserDetails> userDetails = userRepository.findByFirstNameRegexAndAddressRegex(searchTerm.getTerm(),
                PageRequest.of(searchTerm.getPageNo(), 10, Sort.by("id").descending()));

        /**
         * The search results are again sorted as per there alphabetical order first
         * preference to the results who's name starts with the given string second
         * preference to the results who name have the nearest index of the search
         * string third preference is to the results whos address starts with given
         * search string fourth preference is to the results who's address have the
         * nearest index of the search string fifth preference are to the remaining
         */
        Collections.sort(userDetails, new Comparator<UserDetails>() {

            @Override
            public int compare(UserDetails o1, UserDetails o2) {
                if (o1.getFirstName().startsWith(searchTerm.getTerm())
                        && o2.getFirstName().startsWith(searchTerm.getTerm())) {
                    return 1;
                }
                return 0;
                // if( o2.getFirstName().startsWith(searchTerm.getTerm())){
                // return 1;
                // }

                // return o1.getFirstName().indexOf(searchTerm.getTerm()) -
                // o2.getFirstName().indexOf(searchTerm.getTerm());

            }

        });

        return userDetails;
    }
}
