package com.monocept.insurance.service;

import org.springframework.data.domain.Page;

import com.monocept.insurance.entities.Query;

public interface QueryService {

	String addQuery(Query query);
	Page<Query> getAllQuery(int pageno, int pagesize);
	long getTotalQueryCount();

}