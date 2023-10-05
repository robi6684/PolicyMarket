package com.monocept.insurance.dto;

import java.sql.Date;

public class WithdrawalDto {
	
	private int id;
	private String agentname;
	private String customername;
	private int policynumber;
	private double commission;
	private Date date;
	private String status;
	public WithdrawalDto(int id, String agentname, String customername, int policynumber, double commission, Date date,
			String status) {
		super();
		this.id = id;
		this.agentname = agentname;
		this.customername = customername;
		this.policynumber = policynumber;
		this.commission = commission;
		this.date = date;
		this.status = status;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAgentname() {
		return agentname;
	}
	public void setAgentname(String agentname) {
		this.agentname = agentname;
	}
	public String getCustomername() {
		return customername;
	}
	public void setCustomername(String customername) {
		this.customername = customername;
	}
	public int getPolicynumber() {
		return policynumber;
	}
	public void setPolicynumber(int policynumber) {
		this.policynumber = policynumber;
	}
	public double getCommission() {
		return commission;
	}
	public void setCommission(double commission) {
		this.commission = commission;
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
