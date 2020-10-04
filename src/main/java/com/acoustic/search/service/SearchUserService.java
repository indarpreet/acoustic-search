package com.acoustic.search.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    public int getTotalCount(String term) {
        int totalCount = userRepository.getTotalCount(term);
        return totalCount;
    }

    public List<UserDetails> getUserDetails(SearchTerm searchTerm) {
        return userRepository.findByFirstNameRegexAndAddressRegexAndCompanyRegex(searchTerm.getTerm(),
                PageRequest.of(searchTerm.getPageNo(), 10, Sort.by("id").descending()));
    }

    /***
     * 
     * @param searchTerm
     * @return The search query executes for two major columns in employee table 1.
     *         first name 2. address Fetching 10 records for each page Sorted by
     *         descending order of id
     * 
     * @Id - Higher the id number means higher order of preference in search that
     *     must be seen in the first page
     */
    public List<UserDetails> getDropDownResults(SearchTerm searchTerm) {
        List<UserDetails> userDetails = userRepository.getDropDownResults(searchTerm.getTerm());
        Map<String, UserDetails> topTenUniqueSearchResults = new LinkedHashMap<>();
        // O(n) - 10 records each time
        int index = 0;

        while (index < userDetails.size() && topTenUniqueSearchResults.size() < 10) {
            UserDetails item = userDetails.get(index);
            String firstName = item.getFirstName().toLowerCase();
            int firstNameIndex = firstName.indexOf(searchTerm.getTerm().toLowerCase());
            if (firstNameIndex != -1) {
                String searchIndex = firstName.substring(firstNameIndex);
                item.setSearchIndex(searchIndex);
                if (!topTenUniqueSearchResults.containsKey(searchIndex)) {
                    topTenUniqueSearchResults.put(searchIndex, item);
                }
                index++;
                continue;
            }
            String address = item.getAddress().toLowerCase();
            int addressIndex = address.indexOf(searchTerm.getTerm().toLowerCase());
            if (addressIndex != -1) {
                String searchIndex = address.substring(addressIndex);
                item.setSearchIndex(searchIndex);
                if (!topTenUniqueSearchResults.containsKey(searchIndex)) {
                    topTenUniqueSearchResults.put(searchIndex, item);
                }
                index++;
                continue;
            }
            String company = item.getCompany().toLowerCase();
            int companyIndex = company.indexOf(searchTerm.getTerm().toLowerCase());
            if (companyIndex != -1) {
                String searchIndex = company.substring(companyIndex);
                item.setSearchIndex(searchIndex);
                if (!topTenUniqueSearchResults.containsKey(searchIndex)) {
                    topTenUniqueSearchResults.put(searchIndex, item);
                }
                index++;
                continue;
            }

        }

        List<UserDetails> uniqueSortedList = new ArrayList<>(topTenUniqueSearchResults.values());

        /**
         * The search results are again sorted as per there alphabetical order first
         * preference to the results who's name starts with the given string second
         * preference to the results who name have the nearest index of the search
         * string third preference is to the results whos address starts with given
         * search string fourth preference is to the results who's address have the
         * nearest index of the search string fifth preference are to the remaining if
         * the string resides in the same place of two search object they are again
         * sorted in alphabetical/lexographical order like dictionary
         */
        Collections.sort(uniqueSortedList, new Comparator<UserDetails>() {

            @Override
            public int compare(UserDetails o1, UserDetails o2) {
                String sterm = searchTerm.getTerm().toLowerCase();
                String s1 = o1.getSearchIndex();
                String s2 = o2.getSearchIndex();
                int index1 = s1.indexOf(sterm);
                int index2 = s2.indexOf(sterm);
                if (index1 == index2) {
                    // sort by lexographical order or alphabetical order
                    int indexOfCodeMatch = index1 + sterm.length();
                    while (indexOfCodeMatch < s1.length() && indexOfCodeMatch < s2.length()) {
                        int charCode1 = (int) s1.charAt(indexOfCodeMatch);
                        int charCode2 = (int) s2.charAt(indexOfCodeMatch);
                        if (charCode1 != charCode2) {
                            if (charCode1 < charCode2) {
                                return -1;
                            }
                            return 1;
                        }
                        indexOfCodeMatch++;
                    }
                    if (s1.length() < s2.length())
                        return -1;
                    else
                        return 1;

                } else {
                    return index1 - index2;
                }
            }

        });
        return uniqueSortedList;
    }
}
