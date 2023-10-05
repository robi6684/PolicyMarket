package com.monocept.insurance.dto;

import java.sql.Date;

public class AllClaimDto {
	
    private int id;
    private String username;
	private int policyNumber;
	private double amount;
	private int accountnumber;
	private String ifsccode;
	private Date date;
	private String status;
	public AllClaimDto(int id, String username, int policyNumber, double amount, int accountnumber, String ifsccode,
			Date date, String status) {
		super();
		this.id = id;
		this.username = username;
		this.policyNumber = policyNumber;
		this.amount = amount;
		this.accountnumber = accountnumber;
		this.ifsccode = ifsccode;
		this.date = date;
		this.status = status;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getPolicyNumber() {
		return policyNumber;
	}
	public void setPolicyNumber(int policyNumber) {
		this.policyNumber = policyNumber;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public int getAccountnumber() {
		return accountnumber;
	}
	public void setAccountnumber(int accountnumber) {
		this.accountnumber = accountnumber;
	}
	public String getIfsccode() {
		return ifsccode;
	}
	public void setIfsccode(String ifsccode) {
		this.ifsccode = ifsccode;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	

	
}
