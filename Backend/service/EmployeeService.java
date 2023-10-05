package com.monocept.insurance.service;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllEmployeeDto;
import com.monocept.insurance.entities.Employee;

public interface EmployeeService {
	
	String saveEmployee(Employee employee);
	Page<AllEmployeeDto> getAllEmployees(int pageno, int pagesize);
	String deleteEmployee(int employeeid);
	String updateSalary(int employeeid,double salary);
	String updateEmployee(int employeeid, Employee employee);
	String updatePassword(int employeeid, String password);
	Employee getEmployee(String username);
	String replyQuery(String email,String text);
	long getTotalEmployeeCount();

}
