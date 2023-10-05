package com.monocept.insurance.dto;

public class AllPlanDto {
	private int planid;
	private String planname;
	
	public AllPlanDto(int planid, String planname) {
		super();
		this.planid = planid;
		this.planname = planname;
	}
	
	public int getPlanid() {
		return planid;
	}
	public void setPlanid(int planid) {
		this.planid = planid;
	}
	public String getPlanname() {
		return planname;
	}
	public void setPlanname(String planname) {
		this.planname = planname;
	}
	
	

}
