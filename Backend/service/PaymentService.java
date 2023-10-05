package com.monocept.insurance.service;

import java.sql.Date;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllPaymentDto;
import com.monocept.insurance.entities.Payment;

public interface PaymentService {
	
	Page<AllPaymentDto> getAllPayments(int pageno, int pagesize);
	String savePayment(Payment payment, int customerid, int policynumber);
	long getTotalPaymentCount();
	Page<AllPaymentDto> getPaymentsBetweenDates(Date fromdate, Date todate, int pageno, int pagesize);
	Page<AllPaymentDto> getPaymentsFromDate(Date fromdate,int pageno, int pagesize);
	Page<AllPaymentDto> getPaymentsToDate(Date todate, int pageno, int pagesize);

}