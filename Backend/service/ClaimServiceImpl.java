package com.monocept.insurance.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
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

import com.monocept.insurance.dto.AllClaimDto;
import com.monocept.insurance.entities.Claim;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.Policy;
import com.monocept.insurance.entities.PremiumType;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.repository.ClaimRepo;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.repository.PolicyRepo;



@Service
public class ClaimServiceImpl implements ClaimService{
	

	@Autowired
	private ClaimRepo claimRepo;
	@Autowired
	private CustomerRepo customerRepo;
	@Autowired
	private PolicyRepo policyRepo;
	
	
	private static final Logger logger = LoggerFactory.getLogger(ClaimServiceImpl.class);
	


	//-------------------Fetch All Claims----------------------
	@Override
	public Page<AllClaimDto> getAllClaims(int pageno, int pagesize) {
		List<AllClaimDto> allClaims = new ArrayList<>();
		List<Claim> claims = claimRepo.findAll();
		if(claims.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Claims fetched successfully");
		for(Claim claim: claims) {
			allClaims.add(new AllClaimDto(claim.getId(),claim.getCustomer().getUser().getUsername(),
					claim.getPolicy().getPolicynumber(),claim.getAmount(),claim.getAccountnumber(),claim.getIfsccode(),
					claim.getDate(),claim.getStatus()
					));
		}
		pagesize = (pagesize<allClaims.size())?pagesize:allClaims.size();
		if(pagesize == allClaims.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allClaims.size());

	    List<AllClaimDto> pageContent = allClaims.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allClaims.size());
	}


	//-------------------Fetch All Claims of Customers----------------------
	@Override
	public Page<AllClaimDto> getCustomerClaims(String username, int pageno, int pagesize) {
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username)) {
				customer = cust;
				break;
			}
		}
		
		List<Claim> claims = customer.getClaims();
		List<AllClaimDto> allClaims = new ArrayList<>();
		if(claims.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Claims fetched successfully");
		for(Claim claim: claims) {
			allClaims.add(new AllClaimDto(claim.getId(),claim.getCustomer().getUser().getUsername(),
					claim.getPolicy().getPolicynumber(),Math.ceil(claim.getAmount()),claim.getAccountnumber(),claim.getIfsccode(),
					claim.getDate(),claim.getStatus()
					));
		}
		pagesize = (pagesize<allClaims.size())?pagesize:allClaims.size();
		if(pagesize == allClaims.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allClaims.size());

	    List<AllClaimDto> pageContent = allClaims.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allClaims.size());

	}


	//-------------------Save Claim----------------------
	@Override
	public String saveClaim(Claim claim, String username, int policynumber) {
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username)) {
				customer = cust;
				break;
			}
		}
		
		Policy policy = policyRepo.findById(policynumber).get();
		Date date1 = policy.getIssuedate();
		Date date2 = policy.getMaturitydate();
		PremiumType premiumType = policy.getPremiumtype();
		double premiumamount = policy.getPremiumamount();
		double profitratio = policy.getScheme().getProfitratio();
		
	    LocalDate d1 = date1.toLocalDate();
        LocalDate d2 = date2.toLocalDate();
        Period period = Period.between(d1, d2);
        int differenceInYears = period.getYears();
        double amount = 0;
        
        if(premiumType == PremiumType.Yearly) {
        	double val = premiumamount * differenceInYears;
        	amount = val + ((profitratio*val)/100);
        }
        if(premiumType == PremiumType.Monthly) {
        	double val = premiumamount * (differenceInYears*12);
        	amount = val + ((profitratio*val)/100);
        }
        if(premiumType == PremiumType.Quarterly) {
        	double val = premiumamount * (differenceInYears*3);
        	amount = val + ((profitratio*val)/100);
        }
		
		LocalDate currentDate = LocalDate.now();
		Date date = Date.valueOf(currentDate);
		
		Claim c = new Claim();
		c.setAccountnumber(claim.getAccountnumber());
		c.setAmount(amount);
		c.setCustomer(customer);
		c.setDate(date);
		c.setIfsccode(claim.getIfsccode());
		c.setPolicy(policy);
		c.setStatus("Pending");
		claimRepo.save(c);
		
		logger.info("Claim saved successfully");
		return "Claim saved successfully";
	}
	
	//-------------------Get Count of Claims----------------------
	@Override
    public long getTotalClaimCount() {
    	logger.info("Total Claims:" + claimRepo.count());
        return claimRepo.count();
    }


	//-------------------Get Claim Status-------------------------
	@Override
	public String getClaimStatus(int policynumber) {
		Policy policy = policyRepo.findById(policynumber).get();
		Date date1 = policy.getIssuedate();
		Date date2 = policy.getMaturitydate();
		
		LocalDate localDate1 = date1.toLocalDate();
        LocalDate localDate2 = date2.toLocalDate();
        Period period = Period.between(localDate1, localDate2);
        int years = period.getYears();
        int payments = policy.getPayments().size();
        int count=0;
        String status="Pending";
        if(policy.getPremiumtype()==PremiumType.Yearly) {
        	count = (years * 12)/12;
        }
        if(policy.getPremiumtype()==PremiumType.Monthly) {
        	count = (years * 12);
        }
        if(policy.getPremiumtype()==PremiumType.Quarterly) {
        	count = (years * 12)/4;
        }
        
        if(count == payments) {
        	status = "Claim";
        }
        logger.info("Claim Status Fetched Successfully");
		return status;
	}



	//-------------------Update Claim Status-------------------------	
	@Override
	public String updateClaimStatus(int claimid) {
		Claim claim = claimRepo.findById(claimid).get();
		claim.setStatus("Verified");
		claimRepo.save(claim);
		logger.info("Claim status updates successfully");
		return null;
	}

}
