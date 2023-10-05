package com.monocept.insurance.service;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllCustomerDto;
import com.monocept.insurance.entities.Customer;

public interface CustomerService {
	Customer saveCustomer(Customer customer);
	Page<AllCustomerDto> getAllCustomers(int pageno, int pagesize);
	String deleteCustomer(int customerid);
	long getTotalCustomerCount();
	Customer getCustomer(String username);
	String updatePassword(int customerid, String password);
	String updateCustomer(int customerid, Customer customer);
	int getCustomersPoliciesCount(String username);
	int getCustomersClaimsCount(String username);
	String getDocumentStatus(int customerid);
	String updateStatus(int customerid);
	int getId(String username);
	String getStatus(String username);
	int getAge(String username);
	
}
