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

import com.monocept.insurance.dto.AllCommissionDto;
import com.monocept.insurance.dto.WithdrawalDto;
import com.monocept.insurance.entities.Agent;
import com.monocept.insurance.entities.Commission;
import com.monocept.insurance.entities.CommissionWithdrawal;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.exception.NullValueException;
import com.monocept.insurance.repository.AgentRepo;
import com.monocept.insurance.repository.CommissionRepo;
import com.monocept.insurance.repository.CommissionWithdrawalRepo;
import com.monocept.insurance.repository.CustomerRepo;



@Service
public class CommissionServiceImpl implements CommissionService{
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private AgentRepo agentRepo;
	
	
	@Autowired
	private CommissionRepo commissionRepo;
	
	@Autowired
	private CommissionWithdrawalRepo commissionWithdrawalRepo;
	
	private static final Logger logger = LoggerFactory.getLogger(CommissionServiceImpl.class);
	
	
	
	//------------------------Fetch All Commissions-----------------------------
	@Override
	public Page<AllCommissionDto> getAllCommissions( String username, int pageno, int pagesize) {
	     Agent agent = agentRepo.findByUsername(username);
	     if(agent == null) {
	    	 throw new NullValueException("Agent is null",HttpStatus.NOT_FOUND);
	     }
	    List<Commission> commissions= agent.getCommissions();
		List<AllCommissionDto> allCommissions = new ArrayList<>();
		if(commissions.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Commissions fetched successfully");
		for(Commission commission : commissions) {
			String status = commission.getStatus();
			if(status == null) {
				status = "Pending";
			}
			String withdrawstatus;
			CommissionWithdrawal comm = commission.getCommissionwithdrawal();
			if(comm == null) {
				withdrawstatus = "Pending";
			}
			else
				withdrawstatus = comm.getStatus();
			
		Customer customer = customerRepo.findById(commission.getCustomerid()).get();
			allCommissions.add(new AllCommissionDto(commission.getId(),customer.getUser().getUsername(),
					customer.getFirstname(),commission.getPolicynumber(),commission.getDate(),Math.ceil(commission.getCommission()),
					status,withdrawstatus));
		}
		pagesize = (pagesize<allCommissions.size())?pagesize:allCommissions.size();
		if(pagesize == allCommissions.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allCommissions.size());

	    List<AllCommissionDto> pageContent = allCommissions.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allCommissions.size());
	}




	//------------------------Save Commissions Withdrawal-----------------------------
	@Override
	public String saveCommisionWithdrawal(CommissionWithdrawal comm, int commissionid) {
		LocalDate currentDate = LocalDate.now();
		Date date = Date.valueOf(currentDate);
		Commission commission = commissionRepo.findById(commissionid).get();
		CommissionWithdrawal commissionWithdrawal = new CommissionWithdrawal(comm.getAccountnumber(),
				comm.getIfsccode(),commission.getCommission(),"Pending",date,commission.getAgent().getAgentid(),
				commission.getCustomerid(),commission.getPolicynumber());
		
		commissionWithdrawalRepo.save(commissionWithdrawal);
		commission.setCommissionwithdrawal(commissionWithdrawal);
		commission.setStatus("Request Sent");
		commissionRepo.save(commission);
		
		logger.info("Withdrawal Request Sent Successfully");
		return "Withdrawal Request Sent Successfully";
	}



	//--------------------------Fetch All Withdrawals------------------------
	@Override
	public Page<WithdrawalDto> getWithdrawals(int pageno, int pagesize) {
		List<CommissionWithdrawal> commissionWithdrawals = commissionWithdrawalRepo.findAll();
		
		List<WithdrawalDto> allWithdrawals = new ArrayList<>();
		if(commissionWithdrawals.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Withdrawals fetched successfully");
		for(CommissionWithdrawal commissionWithdrawal : commissionWithdrawals) {
			Agent agent = agentRepo.findById(commissionWithdrawal.getAgentid()).get();
			Customer customer = customerRepo.findById(commissionWithdrawal.getCustomerid()).get();
			allWithdrawals.add(new WithdrawalDto(commissionWithdrawal.getWithdrawalid(),
					agent.getFirstname(),customer.getFirstname(),commissionWithdrawal.getPolicynumber(),
					commissionWithdrawal.getAmount(),
					commissionWithdrawal.getDate(),commissionWithdrawal.getStatus()));
		}
		pagesize = (pagesize<allWithdrawals.size())?pagesize:allWithdrawals.size();
		if(pagesize == allWithdrawals.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allWithdrawals.size());

	    List<WithdrawalDto> pageContent = allWithdrawals.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allWithdrawals.size());
	}



	//--------------------Update Withdrawal Status--------------------------
	@Override
	public String updateStatus(int id) {
		CommissionWithdrawal comm = commissionWithdrawalRepo.findById(id).get();
		comm.setStatus("Approved");
		commissionWithdrawalRepo.save(comm);
		return "Status changed successfully";
	}
	
	
	
	

}