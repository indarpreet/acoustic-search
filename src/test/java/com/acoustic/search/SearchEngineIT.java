package com.acoustic.search;

import java.util.List;

import com.acoustic.search.models.SearchTerm;
import com.acoustic.search.models.UserDetails;

import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

// Integration test
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class SearchEngineIT {
    @Autowired
    private  TestRestTemplate restTemplate;   
    
    @Test
    public void contextLoads() throws JSONException{
        SearchTerm searchTerm = new SearchTerm();
		searchTerm.setTerm("dan");
		searchTerm.setPageNo(0);
        String response = this.restTemplate.postForObject("/search", searchTerm,String.class);
        JSONAssert.assertEquals("[{id:158},{id:237},{id:285},{id:89},{id:295}]", response, false);

    }
}
