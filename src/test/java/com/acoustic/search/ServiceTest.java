package com.acoustic.search;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import com.acoustic.search.models.SearchTerm;
import com.acoustic.search.models.UserDetails;
import com.acoustic.search.repository.UserRepository;
import com.acoustic.search.service.SearchUserService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
class ServiceTest {

	@InjectMocks
	SearchUserService searchUserService;

	@Mock
	UserRepository userRepository;


	@Test
	void getUserDetails() {
		SearchTerm searchTerm = new SearchTerm();
		searchTerm.setTerm("jo");
		searchTerm.setPageNo(0);
		List<UserDetails> userDetails = new ArrayList<>();
		userDetails.add(new UserDetails(123,"John" ,"john@gmail.com" , "Google","San Jose" ));
		userDetails.add(new UserDetails(124,"Jonny" ,"jonny@gmail.com" , "Amazon","San Jose" ));
		userDetails.add(new UserDetails(125,"James" ,"james@gmail.com" , "Netflix","San Jose" ));

		when(userRepository.findByFirstNameRegexAndAddressRegexAndCompanyRegex(searchTerm.getTerm() , 
		PageRequest.of(searchTerm.getPageNo(), 10, Sort.by("id").descending())))
		.thenReturn(userDetails);

		List<UserDetails> userDetailsActual = searchUserService.getUserDetails(searchTerm);
		assertEquals("John", userDetailsActual.get(0).getFirstName());
		assertEquals("Jonny", userDetailsActual.get(1).getFirstName());
	}

}
