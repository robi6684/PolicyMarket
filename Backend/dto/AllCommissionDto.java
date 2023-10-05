package com.monocept.insurance.dto;

import java.sql.Date;

public class AllCommissionDto {
    private int id;
    private String customerUsername;
    private String customerFirstname;
    private int policynumber;
    private Date date;
    private double commission;
    private String requeststatus;
    private String withdrawstatus;
	public AllCommissionDto(int id, String customerUsername, String customerFirstname, int policynumber, Date date,
			double commission, String requeststatus, String withdrawstatus) {
		super();
		this.id = id;
		this.customerUsername = customerUsername;
		this.customerFirstname = customerFirstname;
		this.policynumber = policynumber;
		this.date = date;
		this.commission = commission;
		this.requeststatus = requeststatus;
		this.withdrawstatus = withdrawstatus;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCustomerUsername() {
		return customerUsername;
	}
	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}
	public String getCustomerFirstname() {
		return customerFirstname;
	}
	public void setCustomerFirstname(String customerFirstname) {
		this.customerFirstname = customerFirstname;
	}
	public int getPolicynumber() {
		return policynumber;
	}
	public void setPolicynumber(int policynumber) {
		this.policynumber = policynumber;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public double getCommission() {
		return commission;
	}
	public void setCommission(double commission) {
		this.commission = commission;
	}
	public String getRequeststatus() {
		return requeststatus;
	}
	public void setRequeststatus(String requeststatus) {
		this.requeststatus = requeststatus;
	}
	public String getWithdrawstatus() {
		return withdrawstatus;
	}
	public void setWithdrawstatus(String withdrawstatus) {
		this.withdrawstatus = withdrawstatus;
	}
	

    
}
