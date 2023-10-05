package com.monocept.insurance.dto;

import java.sql.Date;
public class AllPaymentDto {
	
	
	private int id;
	private String paymenttype;
	private Date date;
	private double amount;
	private double tax;
	private double totalpayment;
	private String customerUsername;
	private int policyNumber;
	
	public AllPaymentDto(int id, String paymenttype, Date date, double amount, double tax, double totalpayment,
			String customerUsername, int policyNumber) {
		super();
		this.id = id;
		this.paymenttype = paymenttype;
		this.date = date;
		this.amount = amount;
		this.tax = tax;
		this.totalpayment = totalpayment;
		this.customerUsername = customerUsername;
		this.policyNumber = policyNumber;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPaymenttype() {
		return paymenttype;
	}
	public void setPaymenttype(String paymenttype) {
		this.paymenttype = paymenttype;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getTax() {
		return tax;
	}
	public void setTax(double tax) {
		this.tax = tax;
	}
	public double getTotalpayment() {
		return totalpayment;
	}
	public void setTotalpayment(double totalpayment) {
		this.totalpayment = totalpayment;
	}
	public String getCustomerUsername() {
		return customerUsername;
	}
	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}
	public int getPolicyNumber() {
		return policyNumber;
	}
	public void setPolicyNumber(int policyNumber) {
		this.policyNumber = policyNumber;
	}
}