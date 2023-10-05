package com.monocept.insurance.entities;

import java.sql.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="commission")
public class Commission {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private int customerid;
	
	@Column
	private int policynumber;
	
	@Column
	private Date date;
	
	@Column
	private double commission;
	
	@Column
	private String status;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH,CascadeType.PERSIST})
	@JoinColumn(name="agentid")
	private Agent agent;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="withdrawalid")
	private CommissionWithdrawal commissionwithdrawal;
	

	public Commission() {
		super();
	}


	public Commission(int customerid, int policynumber, Date date, double commission, String status, Agent agent,
			CommissionWithdrawal commissionwithdrawal) {
		super();
		this.customerid = customerid;
		this.policynumber = policynumber;
		this.date = date;
		this.commission = commission;
		this.status = status;
		this.agent = agent;
		this.commissionwithdrawal = commissionwithdrawal;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
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


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Agent getAgent() {
		return agent;
	}


	public void setAgent(Agent agent) {
		this.agent = agent;
	}


	public CommissionWithdrawal getCommissionwithdrawal() {
		return commissionwithdrawal;
	}


	public void setCommissionwithdrawal(CommissionWithdrawal commissionwithdrawal) {
		this.commissionwithdrawal = commissionwithdrawal;
	}

	
	

}
