package com.monocept.insurance.service;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllClaimDto;
import com.monocept.insurance.entities.Claim;

public interface ClaimService {
	
	Page<AllClaimDto> getAllClaims(int pageno, int pagesize);
	Page<AllClaimDto> getCustomerClaims(String username,int pageno, int pagesize);
	String saveClaim(Claim claim,String username, int policynumber);
	long getTotalClaimCount();
	String getClaimStatus(int policynumber);
	String updateClaimStatus(int clamid);

}