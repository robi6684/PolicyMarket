package com.monocept.insurance.dto;

public class PolicyRegistrationDto {
	
	private int customerid;
	private String username;
	private String firstname;
	private int policynumber;
	private String documentStatus;
	public PolicyRegistrationDto(int customerid, String username, String firstname, int policynumber,
			String documentStatus) {
		super();
		this.customerid = customerid;
		this.username = username;
		this.firstname = firstname;
		this.policynumber = policynumber;
		this.documentStatus = documentStatus;
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
	public int getPolicynumber() {
		return policynumber;
	}
	public void setPolicynumber(int policynumber) {
		this.policynumber = policynumber;
	}
	public String getDocumentStatus() {
		return documentStatus;
	}
	public void setDocumentStatus(String documentStatus) {
		this.documentStatus = documentStatus;
	}
	
	

}
