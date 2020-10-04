package com.acoustic.search.repository;

import java.util.List;

import com.acoustic.search.models.UserDetails;

import org.hibernate.type.TrueFalseType;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDetails, Integer> {

    /***
     * @param name
     * @param request
     * @return the regex match to first name or address order by id and limit to 10 rows per page
     */
    @Query(value = "SELECT ud FROM UserDetails ud WHERE LOWER(ud.firstName) LIKE %?1% OR LOWER(ud.address) LIKE %?1% OR LOWER(ud.company) LIKE %?1%")
    public List<UserDetails> findByFirstNameRegexAndAddressRegexAndCompanyRegex(String term, PageRequest pageRequest);

    @Query(value = "SELECT COUNT(*) FROM UserDetails ud WHERE LOWER(ud.firstName) LIKE %?1% OR LOWER(ud.address) LIKE %?1% OR LOWER(ud.company) LIKE %?1%")
    public int getTotalCount(String term);
}
