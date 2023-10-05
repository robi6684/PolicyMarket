package com.monocept.insurance.service;

import java.sql.Date;
import java.time.LocalDate;
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

import com.monocept.insurance.dto.AllPaymentDto;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.Payment;
import com.monocept.insurance.entities.Policy;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.repository.PaymentRepo;
import com.monocept.insurance.repository.PolicyRepo;


@Service
public class PaymentServiceImpl implements PaymentService{
	
	@Autowired
	private PaymentRepo paymentRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private PolicyRepo policyRepo;
	
	
	private static final Logger logger = LoggerFactory.getLogger(PaymentServiceImpl.class);
	
	
	
	//----------------------------------Fetch All Payments-------------------------------------
	@Override
	public Page<AllPaymentDto> getAllPayments(int pageno, int pagesize) {
		List<AllPaymentDto> allPayments = new ArrayList<>();
		List<Payment> payments = paymentRepo.findAll();
		if(payments.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Payments fetched successfully");
		for(Payment payment: payments) {
			allPayments.add(new AllPaymentDto(payment.getId(),payment.getPaymenttype(),payment.getDate(),
					payment.getAmount(),payment.getTax(),payment.getTotalpayment(),payment.getCustomer().getUser().getUsername(),
					payment.getPolicy().getPolicynumber()));
		}
		pagesize = (pagesize<allPayments.size())?pagesize:allPayments.size();
		if(pagesize == allPayments.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allPayments.size());

	    List<AllPaymentDto> pageContent = allPayments.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allPayments.size());
	}



	//------------------------------------Save Payment-------------------------------
	@Override
	public String savePayment(Payment payment, int customerid, int policynumber) {
		LocalDate currentDate = LocalDate.now();
		Date date = Date.valueOf(currentDate);
		
		Optional<Customer> getCustomer = customerRepo.findById(customerid);
		Optional<Policy> getPolicy = policyRepo.findById(policynumber);
		
		Customer customer = getCustomer.get();
		Policy policy = getPolicy.get();
		
		payment.setDate(date);
		payment.setCustomer(customer);
		payment.setPolicy(policy);
		paymentRepo.save(payment);
		logger.info("Payment Added Successfully");
		return "Payment Added Successfully";
	}
	
	//--------------------------------Get Count of Payments----------------------------------
	@Override
    public long getTotalPaymentCount() {
    	logger.info("Total Payments:" + paymentRepo.count());
        return paymentRepo.count();
    }



	//-------------------------------Get Payment Between Dates---------------------------
	@Override
	public Page<AllPaymentDto> getPaymentsBetweenDates(Date fromdate, Date todate, int pageno, int pagesize) {
		List<AllPaymentDto> allPayments = new ArrayList<>();
		List<Payment> payments = paymentRepo.findAll();
		if(payments.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Payments fetched successfully");
		for(Payment payment: payments) {
			if(payment.getDate().compareTo(fromdate) >= 0 && payment.getDate().compareTo(todate) <= 0)
			allPayments.add(new AllPaymentDto(payment.getId(),payment.getPaymenttype(),payment.getDate(),
					payment.getAmount(),payment.getTax(),payment.getTotalpayment(),payment.getCustomer().getUser().getUsername(),
					payment.getPolicy().getPolicynumber()));
		}
		if(allPayments.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		pagesize = (pagesize<allPayments.size())?pagesize:allPayments.size();
		if(pagesize == allPayments.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allPayments.size());

	    List<AllPaymentDto> pageContent = allPayments.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allPayments.size());
	}




	//-----------------------------Get Payments From Date----------------------------------
	@Override
	public Page<AllPaymentDto> getPaymentsFromDate(Date fromdate, int pageno, int pagesize) {
		List<AllPaymentDto> allPayments = new ArrayList<>();
		List<Payment> payments = paymentRepo.findAll();
		if(payments.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Payments fetched successfully");
		for(Payment payment: payments) {
			if(payment.getDate().compareTo(fromdate) >= 0)
			allPayments.add(new AllPaymentDto(payment.getId(),payment.getPaymenttype(),payment.getDate(),
					payment.getAmount(),payment.getTax(),payment.getTotalpayment(),payment.getCustomer().getUser().getUsername(),
					payment.getPolicy().getPolicynumber()));
		}
		if(allPayments.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		pagesize = (pagesize<allPayments.size())?pagesize:allPayments.size();
		if(pagesize == allPayments.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allPayments.size());

	    List<AllPaymentDto> pageContent = allPayments.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allPayments.size());
	}




	//---------------------------------Get Payments To Date---------------------------------
	@Override
	public Page<AllPaymentDto> getPaymentsToDate(Date todate, int pageno, int pagesize) {
		List<AllPaymentDto> allPayments = new ArrayList<>();
		List<Payment> payments = paymentRepo.findAll();
		if(payments.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Payments fetched successfully");
		for(Payment payment: payments) {
			if(payment.getDate().compareTo(todate) <= 0)
			allPayments.add(new AllPaymentDto(payment.getId(),payment.getPaymenttype(),payment.getDate(),
					payment.getAmount(),payment.getTax(),payment.getTotalpayment(),payment.getCustomer().getUser().getUsername(),
					payment.getPolicy().getPolicynumber()));
		}
		if(allPayments.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		pagesize = (pagesize<allPayments.size())?pagesize:allPayments.size();
		if(pagesize == allPayments.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allPayments.size());

	    List<AllPaymentDto> pageContent = allPayments.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allPayments.size());
	}
	

}