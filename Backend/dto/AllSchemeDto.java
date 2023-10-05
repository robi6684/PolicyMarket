package com.monocept.insurance.dto;

public class AllSchemeDto {
	private int schemeid;
	private String schemename;
	private int minage;
	private int maxage;
	private double minamount;
	private double maxamount;
	private int mininvesttime;
	private int maxinvesttime;
	private double profitratio;
	private double registrationcommission;
	public AllSchemeDto(int schemeid, String schemename, int minage, int maxage, double minamount, double maxamount,
			int mininvesttime, int maxinvesttime, double profitratio, double registrationcommission) {
		super();
		this.schemeid = schemeid;
		this.schemename = schemename;
		this.minage = minage;
		this.maxage = maxage;
		this.minamount = minamount;
		this.maxamount = maxamount;
		this.mininvesttime = mininvesttime;
		this.maxinvesttime = maxinvesttime;
		this.profitratio = profitratio;
		this.registrationcommission = registrationcommission;
	}
	public int getSchemeid() {
		return schemeid;
	}
	public void setSchemeid(int schemeid) {
		this.schemeid = schemeid;
	}
	public String getSchemename() {
		return schemename;
	}
	public void setSchemename(String schemename) {
		this.schemename = schemename;
	}
	public int getMinage() {
		return minage;
	}
	public void setMinage(int minage) {
		this.minage = minage;
	}
	public int getMaxage() {
		return maxage;
	}
	public void setMaxage(int maxage) {
		this.maxage = maxage;
	}
	public double getMinamount() {
		return minamount;
	}
	public void setMinamount(double minamount) {
		this.minamount = minamount;
	}
	public double getMaxamount() {
		return maxamount;
	}
	public void setMaxamount(double maxamount) {
		this.maxamount = maxamount;
	}
	public int getMininvesttime() {
		return mininvesttime;
	}
	public void setMininvesttime(int mininvesttime) {
		this.mininvesttime = mininvesttime;
	}
	public int getMaxinvesttime() {
		return maxinvesttime;
	}
	public void setMaxinvesttime(int maxinvesttime) {
		this.maxinvesttime = maxinvesttime;
	}
	public double getProfitratio() {
		return profitratio;
	}
	public void setProfitratio(double profitratio) {
		this.profitratio = profitratio;
	}
	public double getRegistrationcommission() {
		return registrationcommission;
	}
	public void setRegistrationcommission(double registrationcommission) {
		this.registrationcommission = registrationcommission;
	} 
	
	

}
