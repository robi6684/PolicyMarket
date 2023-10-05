package com.monocept.insurance.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.monocept.insurance.dto.AllPolicyDto;
import com.monocept.insurance.dto.PremiumDto;
import com.monocept.insurance.dto.ReceiptDto;
import com.monocept.insurance.entities.Claim;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.Policy;
import com.monocept.insurance.entities.PremiumType;
import com.monocept.insurance.entities.Scheme;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.exception.NullValueException;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.repository.PolicyRepo;
import com.monocept.insurance.repository.SchemeRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PolicyServiceImpl implements PolicyService{
	
	@Autowired
	private PolicyRepo policyRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private SchemeRepo schemeRepo;
	
	private static final Logger logger = LoggerFactory.getLogger(PolicyServiceImpl.class);

	//--------------------------------Save Policy--------------------------------------------
	@Override
	public Policy savePolicy(Policy policy, int customerid, int schemeid, int investime) {
		LocalDate currentDate = LocalDate.now();
		LocalDate incrementedDate = currentDate.plusYears(investime);
		Date issueDate = Date.valueOf(currentDate);
		Date maturityDate = Date.valueOf(incrementedDate);
		
		Optional<Customer> getCustomer = customerRepo.findById(customerid);
		Optional<Scheme> getScheme = schemeRepo.findById(schemeid);
		
		Customer customer = getCustomer.get();
		Scheme scheme = getScheme.get();
		
		policy.setCustomer(customer);
		policy.setScheme(scheme);
		policy.setIssuedate(issueDate);
		policy.setMaturitydate(maturityDate);
		policyRepo.save(policy);	
		logger.info("Policy Saved Saccessfully");
		return policy;
	}

	//--------------------------------Get Receipt-------------------------------------------
	@Override
	public ReceiptDto getReceipt(int policynumber) {
		Optional<Policy> getPolicy = policyRepo.findById(policynumber);
		Policy policy = getPolicy.get();
		
		logger.info("Reciet fetched successfully");
		return new ReceiptDto(policy.getCustomer().getFirstname(),policy.getCustomer().getLastname(),
				policy.getCustomer().getAddress(),policy.getCustomer().getEmail(),
				policy.getCustomer().getMobilenumber(),policy.getPolicynumber(),policy.getScheme().getSchemename());
	}
	
	//--------------------------------Fetch All Policies-----------------------------
	@Override
	public Page<AllPolicyDto> getAllPolicies(int customerid, int pageno, int pagesize) {
		Customer customer = customerRepo.findById(customerid)
				.orElseThrow(() -> new EntityNotFoundException("Customer is null: " + customerid));
              
		System.out.println(customerid);
		//System.out.println("Hello");
		List<Policy> polices = customer.getPolicies();
		List<AllPolicyDto> allPolices = new ArrayList<>();
		
		if(polices.size() == 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		for(Policy policy : polices) {
			allPolices.add(new AllPolicyDto(policy.getScheme().getSchemeid(),policy.getScheme().getSchemename()
					,policy.getPolicynumber(),policy.getIssuedate(),policy.getMaturitydate(),
					policy.getPremiumtype(),policy.getPremiumamount()));
		}
		logger.info("Policies fetched successfully");
		pagesize = (pagesize<allPolices.size())?pagesize:allPolices.size();
		if(pagesize == allPolices.size())
			pageno = 0;
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

	    int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allPolices.size());

	    List<AllPolicyDto> pageContent = allPolices.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allPolices.size());
	}

	//--------------------------------Fetch Premiums-----------------------------------
	@Override
	public List<PremiumDto> getPremiums(int policynumber) {
		List<PremiumDto> premiums = new ArrayList<>();
		Policy policy = policyRepo.findById(policynumber).get();
		Date date1 = policy.getIssuedate();
		Date date2 = policy.getMaturitydate();
		
		LocalDate localDate1 = date1.toLocalDate();
        LocalDate localDate2 = date2.toLocalDate();
        Period period = Period.between(localDate1, localDate2);
        int years = period.getYears();
        int payments = policy.getPayments().size();
        int count;
        
        if(policy.getPremiumtype()==PremiumType.Yearly) {
        	count = (years * 12)/12;
        	System.out.println("Count" +count);
        	for(int i=0; i<count; i++) {
        		PremiumDto premium = new PremiumDto();
        		Date date = Date.valueOf(localDate1.plusYears(i));
        		premium.setDate(date);
        		
        		if(payments > 0) {
        			premium.setStatus("Paid");
        			premium.setPay("Payment Successful");
        		}
        		else if(payments == 0) {
        			premium.setStatus("Pending");
        			premium.setPay("Pay");
        		}
        		else if(payments < 0) {
        			premium.setStatus("Pending");
        			premium.setPay("----");
        		}
        		payments--;
        		premiums.add(premium);
        	}
        }
        else if(policy.getPremiumtype()==PremiumType.Monthly) {
        	count = (years * 12);
        	for(int i=0; i<count; i++) {
        		PremiumDto premium = new PremiumDto();
        		Date date = Date.valueOf(localDate1.plusMonths(i));
        		premium.setDate(date);
        		
        		if(payments > 0) {
        			premium.setStatus("Paid");
        			premium.setPay("Payment Successful");
        		}
        		else if(payments == 0) {
        			premium.setStatus("Pending");
        			premium.setPay("Pay");
        		}
        		else if(payments < 0) {
        			premium.setStatus("Pending");
        			premium.setPay("----");
        		}
        		payments--;
        		premiums.add(premium);
        	}
        }
        else if(policy.getPremiumtype()==PremiumType.Quarterly) {
        	count = (years * 12)/4;
        	for(int i=0; i<count; i++) {
        		PremiumDto premium = new PremiumDto();
        		Date date = Date.valueOf(localDate1.plusMonths(i*4));
        		premium.setDate(date);
        		
        		if(payments > 0) {
        			premium.setStatus("Paid");
        			premium.setPay("Payment Successful");
        		}
        		else if(payments == 0) {
        			premium.setStatus("Pending");
        			premium.setPay("Pay");
        		}
        		else if(payments < 0) {
        			premium.setStatus("Pending");
        			premium.setPay("----");
        		}
        		payments--;
        		premiums.add(premium);
        	}
        }
        logger.info("Premiums fetched successfully");
		return premiums;
	}

	//---------------------------------Get Claim Status-----------------------------------
	@Override
	public String getStatus(int policynumber) {
		Policy policy = policyRepo.findById(policynumber).get();
		List<Claim> claims = policy.getClaims();
		logger.info("Claim Status Fetched Successfully");
		if(claims.size()==0) {
			return "Not Claimed";
		}
		return claims.get(0).getStatus();
	}

	//-------------------------------Get Amount--------------------------------------
	@Override
	public double getAmount(int policynumber) {
		Optional<Policy> getPolicy = policyRepo.findById(policynumber);
		Policy policy = null;
		if(getPolicy.isPresent()) {
			policy = getPolicy.get();
		}
		
		if(policy == null) {
			throw new NullValueException("Policy is null",HttpStatus.NOT_FOUND);
		}
		return policy.getPremiumamount();
	}
	

}
