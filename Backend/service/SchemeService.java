package com.monocept.insurance.service;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllSchemeDto;
import com.monocept.insurance.entities.Scheme;


public interface SchemeService {
	
	Scheme saveScheme(Scheme scheme,int planid);
	Page<AllSchemeDto> getAllSchemes(int planid, int pageno, int pagesize);
	String updateScheme(Scheme scheme,int schemeid);
	AllSchemeDto getScheme(String schemename,int planid);

}
