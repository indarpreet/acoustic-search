package com.acoustic.search.repository;

import java.util.List;

import com.acoustic.search.models.UserDetails;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDetails , Integer> {
    
    // @Query( value = "SELECT * FROM USER_DATA ud where lower(ud.first_name) like %:query%" , nativeQuery = true)
    // List<UserDetails> findByFirstNameRegex(@Param("query") String query);

    @Query("SELECT ud FROM UserDetails ud WHERE LOWER(ud.firstName) LIKE %?1% OR LOWER(ud.address) LIKE %?1%")
    public List<UserDetails> findByFirstNameRegexAndAddressRegex(String name , PageRequest request);
}
