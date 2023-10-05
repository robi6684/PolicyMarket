package com.monocept.insurance.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllPolicyDto;
import com.monocept.insurance.dto.PremiumDto;
import com.monocept.insurance.dto.ReceiptDto;
import com.monocept.insurance.entities.Policy;

public interface PolicyService {
	
	Policy savePolicy(Policy policy, int customerid, int schemeid, int investime);
	ReceiptDto getReceipt(int policynumber);
	Page<AllPolicyDto> getAllPolicies(int customerid, int pageno, int pagesize);
	List<PremiumDto> getPremiums(int policynumber);
	String getStatus(int policynumber);
	double getAmount(int policynumber);

}
