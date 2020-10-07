package com.engine.search;

import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;

import com.engine.search.controller.SearchUserController;
import com.engine.search.models.SearchTerm;
import com.engine.search.models.UserDetails;
import com.engine.search.service.SearchUserService;

@WebMvcTest(SearchUserController.class)
public class SearchUserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    SearchUserService searchUserService;

    @Test
    public void getUserDetails() throws Exception{
        
        when(searchUserService.getDropDownResults(any(SearchTerm.class))).
        thenReturn( Arrays.asList(
            new UserDetails(237, "Dane", "massa@convallis.org" , "Et Magna Praesent LLC", "Ap #904-5634 Suspendisse St.")));
        
        RequestBuilder request = MockMvcRequestBuilders.post("/search").accept(MediaType.APPLICATION_JSON )
        .content("{\"term\":\"dan\" , \"pageNo\":0}")
        .contentType(MediaType.APPLICATION_JSON);

        MvcResult mvcResult = mockMvc.perform(request)
                // perform request and check status
                .andExpect(status().isOk())
                // check content
                // if response is easy check directly
                .andExpect(content().json("[{\"id\":237}]"))
                // return the object
                .andReturn();
    }
    
}
