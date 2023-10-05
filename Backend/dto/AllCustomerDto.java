package com.monocept.insurance.dto;

public class AllCustomerDto {
	private int customerid;
	private String username;
	private String firstname;
	private String email;
	
	public AllCustomerDto(int customerid, String username, String firstname, String email) {
		super();
		this.customerid = customerid;
		this.username = username;
		this.firstname = firstname;
		this.email = email;
	}

	public int getCustomerid() {
		return customerid;
	}

	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
	
	

}
