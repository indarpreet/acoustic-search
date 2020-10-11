package com.engine.search;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.isNotNull;
import static org.mockito.ArgumentMatchers.isNull;

import java.util.List;

import com.engine.search.entity.UserDetails;
import com.engine.search.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class UserRepositoryTest {
    @Autowired
    
    UserRepository userRepository;

    @Test
    public void findAll() {
        List<UserDetails> items = userRepository.getDropDownResults("dan");
        assertNotNull(items);
        assertFalse(items.isEmpty());
    }
}
