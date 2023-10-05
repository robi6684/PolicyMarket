package com.monocept.insurance.dto;

public class AllEmployeeDto {
	
	private int employeeid;
	private String username;
	private String firstname;
	private String lastname;
	private double salary;
	
	
	public AllEmployeeDto(int employeeid, String username, String firstname, String lastname, double salary) {
		super();
		this.employeeid = employeeid;
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.salary = salary;
	}
	
	public int getEmployeeid() {
		return employeeid;
	}
	public void setEmployeeid(int employeeid) {
		this.employeeid = employeeid;
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
	public double getSalary() {
		return salary;
	}
	public void setSalary(double salary) {
		this.salary = salary;
	}
	
	

}
