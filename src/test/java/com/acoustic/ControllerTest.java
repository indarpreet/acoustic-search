package com.acoustic;

import com.acoustic.search.controller.SearchUserController;
import com.acoustic.search.models.SearchTerm;
import com.acoustic.search.models.UserDetails;
import com.acoustic.search.service.SearchUserService;

import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;

@WebMvcTest(SearchUserController.class)
public class ControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    SearchUserService searchUserService;

    @Test
    public void getUserDetails() throws Exception{
        SearchTerm searchTerm = new SearchTerm();
        searchTerm.setTerm("dan");
        searchTerm.setPageNo(0);
        when(searchUserService.getUserDetails(searchTerm)).
        thenReturn( Arrays.asList(
            new UserDetails(237, "Dane", "massa@convallis.org" , "Et Magna Praesent LLC", "Ap #904-5634 Suspendisse St.")));
        
        RequestBuilder request = MockMvcRequestBuilders.post("/search").accept(MediaType.APPLICATION_JSON )
        .content("{\"term\":\"dan\",\"pageNo\": 0}")
        .contentType(MediaType.APPLICATION_JSON);

        MvcResult mvcResult = mockMvc.perform(request)
                // perform request and check status
                .andExpect(status().isOk())
                // check content
                // if response is easy check directly
                .andExpect(content().string("[{id:237,firstName:Dane,email:massa@convallis.org,company:Et Magna Praesent LLC,address:Ap #904-5634 Suspendisse St.,searchIndex:dane}]"))
                // return the object
                .andReturn();
    }
    
}
