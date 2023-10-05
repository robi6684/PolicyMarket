package com.monocept.insurance.dto;

public class AllAgentDto {
	
	private int agentid;
	private String username;
	private String firstname;
	private String lastname;
	private double commission;
	
	public AllAgentDto(int agentid, String username, String firstname, String lastname, double commission) {
		super();
		this.agentid = agentid;
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.commission = commission;
	}

	public int getAgentid() {
		return agentid;
	}

	public void setAgentid(int agentid) {
		this.agentid = agentid;
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

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public double getCommission() {
		return commission;
	}

	public void setCommission(double commission) {
		this.commission = commission;
	}
	

}