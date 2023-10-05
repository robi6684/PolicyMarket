package com.monocept.insurance.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.monocept.insurance.entities.Query;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.repository.QueryRepo;

import jakarta.transaction.Transactional;

@Service
public class QueryServiceImpl implements QueryService{
	
	
	
	@Autowired
	private QueryRepo queryRepo;
	
	
	private static final Logger logger = LoggerFactory.getLogger(QueryServiceImpl.class);
	
	//----------------------------------Save Query--------------------------------------
	@Transactional
	@Override
	public String addQuery(Query query) {
		LocalDate currentDate = LocalDate.now();
		Date date = Date.valueOf(currentDate);
		query.setDate(date);
		query.setStatus("Pending");
        queryRepo.save(query);
        logger.info("Query saved successfully");
        return "Query with ID added successfully.";
    }
	
	
	//-----------------------------------Fetch All Queries--------------------------------------
	@Override
	public Page<Query> getAllQuery(int pageno, int pagesize) {
		List<Query> allQuery = new ArrayList<>();
		List<Query> queries = queryRepo.findAll();
		if(queries.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		
		for(Query query : queries) {
			allQuery.add(new Query(query.getQueryid(),query.getEmail(),
					query.getContent(),query.getDate(),query.getStatus()));
		}
		pagesize = (pagesize<allQuery.size())?pagesize:allQuery.size();
		if(pagesize == allQuery.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allQuery.size());

	    List<Query> pageContent = allQuery.subList(start, end);
	    logger.info("All Queries Fetched Successfully");
	    return new PageImpl<>(pageContent, pageRequest, allQuery.size());
	}
	
	//-------------------------------Get Count of All Queries------------------------------
	@Override
    public long getTotalQueryCount() {
    	logger.info("Total Query:" + queryRepo.count());
        return queryRepo.count();
    }

	
	
	
	
	

}