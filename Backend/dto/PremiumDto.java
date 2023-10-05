package com.monocept.insurance.dto;

import java.sql.Date;

public class PremiumDto {
	
	private Date date;
	private String status;
	private String pay;
	
	public PremiumDto() {
		super();
	}
	public PremiumDto(Date date, String status, String pay) {
		super();
		this.date = date;
		this.status = status;
		this.pay = pay;
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
	public String getPay() {
		return pay;
	}
	public void setPay(String pay) {
		this.pay = pay;
	}
	

}
