package com.monocept.insurance.dto;

import java.sql.Date;

import com.monocept.insurance.entities.PremiumType;


public class AllPolicyDto {
	
	private int schemeId;
	private String schemeName;
    private int policynumber;
	private Date issuedate;
	private Date maturitydate;
	private PremiumType premiumtype;
	private double premiumamount;
	public AllPolicyDto(int schemeId, String schemeName, int policynumber, Date issuedate, Date maturitydate,
			PremiumType premiumtype, double premiumamount) {
		super();
		this.schemeId = schemeId;
		this.schemeName = schemeName;
		this.policynumber = policynumber;
		this.issuedate = issuedate;
		this.maturitydate = maturitydate;
		this.premiumtype = premiumtype;
		this.premiumamount = premiumamount;
	}
	public int getSchemeId() {
		return schemeId;
	}
	public void setSchemeId(int schemeId) {
		this.schemeId = schemeId;
	}
	public String getSchemeName() {
		return schemeName;
	}
	public void setSchemeName(String schemeName) {
		this.schemeName = schemeName;
	}
	public int getPolicynumber() {
		return policynumber;
	}
	public void setPolicynumber(int policynumber) {
		this.policynumber = policynumber;
	}
	public Date getIssuedate() {
		return issuedate;
	}
	public void setIssuedate(Date issuedate) {
		this.issuedate = issuedate;
	}
	public Date getMaturitydate() {
		return maturitydate;
	}
	public void setMaturitydate(Date maturitydate) {
		this.maturitydate = maturitydate;
	}
	public PremiumType getPremiumtype() {
		return premiumtype;
	}
	public void setPremiumtype(PremiumType premiumtype) {
		this.premiumtype = premiumtype;
	}
	public double getPremiumamount() {
		return premiumamount;
	}
	public void setPremiumamount(double premiumamount) {
		this.premiumamount = premiumamount;
	}
	
	
	

}