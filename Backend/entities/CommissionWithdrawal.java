package com.monocept.insurance.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="withdrawal")
public class CommissionWithdrawal {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int withdrawalid;
	@Column
	private int accountnumber;
	@Column
	private String ifsccode;
	@Column
	private double amount;
	@Column
	private String status;
	@Column
	private Date date;
	@Column
	private int agentid;
	@Column
	private int customerid;
	@Column
	private int policynumber;
	
	
	public CommissionWithdrawal() {
		super();
	}
	public CommissionWithdrawal(int accountnumber, String ifsccode, double amount, String status, Date date,
			int agentid, int customerid, int policynumber) {
		super();
		this.accountnumber = accountnumber;
		this.ifsccode = ifsccode;
		this.amount = amount;
		this.status = status;
		this.date = date;
		this.agentid = agentid;
		this.customerid = customerid;
		this.policynumber = policynumber;
	}
	public int getWithdrawalid() {
		return withdrawalid;
	}
	public void setWithdrawalid(int withdrawalid) {
		this.withdrawalid = withdrawalid;
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
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getAgentid() {
		return agentid;
	}
	public void setAgentid(int agentid) {
		this.agentid = agentid;
	}
	public int getCustomerid() {
		return customerid;
	}
	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}
	public int getPolicynumber() {
		return policynumber;
	}
	public void setPolicynumber(int policynumber) {
		this.policynumber = policynumber;
	}
	
	

}
