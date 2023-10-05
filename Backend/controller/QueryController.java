package com.monocept.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.insurance.entities.Query;
import com.monocept.insurance.service.QueryService;

@RestController
@RequestMapping("/queryapp")
@CrossOrigin(origins="*")
public class QueryController {
	
	@Autowired
    private QueryService queryService;
	
	
    @PostMapping("/save")
    public ResponseEntity<String> addQuery(@RequestBody Query query) {
         queryService.addQuery(query);
        return new ResponseEntity<>("Query Added Successfully",HttpStatus.CREATED);
    }

	
	@PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/getAllQuery")
    public ResponseEntity<Page<Query>> getAllQueries(@RequestParam int pageno, @RequestParam int pagesize) {
        return new ResponseEntity<>(queryService.getAllQuery(pageno,pagesize),HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('EMPLOYEE')")
	@GetMapping("/count")
    public ResponseEntity<Long> getTotalQueryCount() {
        long totalQueryCount = queryService.getTotalQueryCount();
        return new ResponseEntity<>(totalQueryCount, HttpStatus.OK);
    }
	

}